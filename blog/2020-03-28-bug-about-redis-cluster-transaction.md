---
slug: bug-about-redis-cluster-transaction
title: 记一次 redis cluster 事务 (transaction) 翻车及分析总结
tags: [redis ,cluster ,transation ,node.js]
---

# 问题背景

发现生产环境的业务报了好多错误, 涉及的 Node.js 代码是一个基于 Redis 的频率计数器，那部分逻辑大概是这样

```js
// 查询并增加一次计数
async incr (id) {
    const key = `${this.namespace}:${id}`
    const now = getMicrotime()
    const start = now - this.duration * 1000

    const operations = [
      ['zremrangebyscore', key, 0, start],
      ['zcard', key],
      ['zadd', key, now, now],
      ['pexpire', key, this.duration]
    ]

    const res = await this.redis.multi(operations).exec()
    const count = toNumber(res[1][1])
    return count
}
```

错误是：

```js
Cannot read property '1' of undefined
```
<!--truncate-->
# 问题分析、追踪

而错误栈的代码指向的是 `res[1][1]` 中的第二个 `[1]`
好，那么问题就出现在 redis.multi.exec 返回的结果了。第一个 `[1]` 没有出错，说明至少 res 不是一个空值，那么现在就是怀疑是返回的 res 可能是个 `[[null, 1], undefined]` 类似这样的结果了。

但是苦于之前为了紧急解决问题，就替换掉了这个有问题的版本。

在查看了下 Redis 节点的日志后，发现似乎是有重新选主的情况发生。

**原 Master 节点**
```shell
[1] 27 Mar 14:00:42.642 # Connection with slave 10.42.0.107:6379 lost.
[1] 27 Mar 14:00:42.642 # Connection with slave 10.42.2.103:6379 lost.
[1] 27 Mar 14:00:42.642 * SLAVE OF 10.42.0.107:6379 enabled (user request from 'id=1931835 addr=10.42.1.185:41012 fd=7 name=sentinel-92456d61-cmd age=10 idle=0 flags=x db=0 sub=0 psub=0 multi=3 qbuf=0 qbuf-free=32768 obl=36 oll=0 omem=0 events=rw cmd=exec')
[1] 27 Mar 14:00:42.644 # CONFIG REWRITE failed: Read-only file system
[1] 27 Mar 14:00:42.836 * Connecting to MASTER 10.42.0.107:6379
[1] 27 Mar 14:00:42.836 * MASTER <-> SLAVE sync started
[1] 27 Mar 14:00:42.836 * Non blocking connect for SYNC fired the event.
[1] 27 Mar 14:00:42.837 * Master replied to PING, replication can continue...
[1] 27 Mar 14:00:42.838 * Partial resynchronization not possible (no cached master)
[1] 27 Mar 14:00:42.848 * Full resync from master: 11b91499d7021301dda8e84f2968b52a71469cbc:2429305294
[1] 27 Mar 14:00:43.797 * MASTER <-> SLAVE sync: receiving 31945180 bytes from master
[1] 27 Mar 14:00:44.132 * MASTER <-> SLAVE sync: Flushing old data
[1] 27 Mar 14:00:44.195 * MASTER <-> SLAVE sync: Loading DB in memory
[1] 27 Mar 14:00:44.968 * MASTER <-> SLAVE sync: Finished with success
```

**其中一个始终为 Slave 的节点**
```shell
[1] 27 Mar 13:59:59.400 # Connection with master lost.
[1] 27 Mar 13:59:59.400 * Caching the disconnected master state.
[1] 27 Mar 13:59:59.401 * Discarding previously cached master state.
[1] 27 Mar 13:59:59.401 * SLAVE OF 10.42.0.107:6379 enabled (user request from 'id=1237126 addr=10.42.0.107:37280 fd=12 name=sentinel-0c17ee21-cmd age=722131 idle=0 flags=x db=0 sub=0 psub=0 multi=3 qbuf=157 qbuf-free=32611 obl=36 oll=0 omem=0 events=rw cmd=exec')
[1] 27 Mar 13:59:59.401 # CONFIG REWRITE failed: Read-only file system
[1] 27 Mar 14:00:00.166 * Connecting to MASTER 10.42.0.107:6379
[1] 27 Mar 14:00:00.166 * MASTER <-> SLAVE sync started
[1] 27 Mar 14:00:00.166 * Non blocking connect for SYNC fired the event.
[1] 27 Mar 14:00:00.167 * Master replied to PING, replication can continue...
[1] 27 Mar 14:00:00.167 * Partial resynchronization not possible (no cached master)
[1] 27 Mar 14:00:00.180 * Full resync from master: 11b91499d7021301dda8e84f2968b52a71469cbc:2429297099
[1] 27 Mar 14:00:01.121 * MASTER <-> SLAVE sync: receiving 31956353 bytes from master
[1] 27 Mar 14:00:01.472 * MASTER <-> SLAVE sync: Flushing old data
[1] 27 Mar 14:00:01.533 * MASTER <-> SLAVE sync: Loading DB in memory
[1] 27 Mar 14:00:02.283 * MASTER <-> SLAVE sync: Finished with success
```

可以看到，断开后脸上了另外一个成为 Master 的 Slave 节点，但是似乎也看不出什么怀疑方向。

只能**怀疑**
> 是不是因为重新选主引起的问题呢？

# 找出原因

没办法，只好在自己搜索了一番。看到这个问题，确定有没有啥关联，因为无法复现当时问题了。

https://stackoverflow.com/questions/12762016/redis-multi-transaction-randomly-returning-null-on-exec-callback-in-nodejs

在无果的情况下请教比较熟悉 Redis 的 [luin](https://github.com/luin) 大大，大概描述了问题之后，luin 发了一个 redis 的 issue 链接给我。

https://github.com/antirez/redis/issues/7014
https://github.com/luin/ioredis/pull/1010

读完了这个 issue 的内容后才明白，这应该是 Redis 本身的一个 bug ，如果你尝试向 slave 节点发送写操作的命令，是不会正常返回相应个数的结果的，而且并没有报错。

看来应该是这个引起的了，但是想验证一下到底当时返回的是：
```js
[[null, 1], undefined, undefined, undefined]
```
还是
```js
[[null, 1]]
```

# 验证
突然想到 Slave 这个细节后，我决定直接连接 Slave 那个节点的 ip 的 Redis ，然后确实复现了那个问题，大致上可以看出，可能是当时发生了重新选主，但是连接到之前的 Master 节点仍然没有断开，所以发送写指令时，触发了这个 bug 。

# 结论
使用 `redis.multi().exec()` 方法时，如果你连接了 Slave 节点或者说是只读节点，那么如果你有写操作的命令，是会引起这个 bug 。

返回的结果是个数不完整的结果
```js
[[null, 1]]
```

这种情况，看起来只能自己做一些判断使得程序更加健壮。

# 感谢
[luin](https://github.com/luin) 的耐心解答
