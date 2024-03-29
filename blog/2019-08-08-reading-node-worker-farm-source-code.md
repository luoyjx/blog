---
slug: reading-node-worker-farm-source-code
title: node-worker-farm 多进程函数执行库源码解读和应用
tags: [node.js ,多进程]
---

# node-worker-farm 源码解读

node-worker-farm 主要是用来将特定的逻辑，作为子进程的方式执行，由 worker-farm 来统一调度，分发调用任务。

## 模块构造函数

[https://github.com/rvagg/node-worker-farm/blob/master/lib/index.js](https://github.com/rvagg/node-worker-farm/blob/master/lib/index.js)

可以看到构造函数主要是初始化 farm 容器，将给定的脚本文件路径加载进来等待调用的动作的分发。

可以看到入口有一个 farms 数组，用于存放 farm 容器，当你初始化多个 farm 实例的时候，都会将实例存储在这里，当你需要结束进程时，直接调用 node-worker-farm 暴露的 end 方法，即会销毁所有的 farm 实例。

不过这个特性也许是个坑吧，有人可能会不小心销毁掉不需要销毁的实例。

## Farm

Farm 即是整个模块的核心了，它负责的功能有：

1. 控制子进程的创建/销毁

2. 新进来的函数执行任务的分发

3. 控制调用的并发

各个参数的作用：

| 参数名                         | 说明                       | 默认值      |
| --------------------------- | ------------------------ | -------- |
| maxCallsPerWorker           | 每个子进程最多可以处理多少调用          | Infinity |
| maxConcurrentWorkers        | 最大并发子进程数                 | CPU 核数   |
| maxConcurrentCallsPerWorker | 每个子进程最大的并发处理数            | 10       |
| maxConcurrentCalls          | 全局最大并发处理数                | Infinity |
| maxCallTime                 | 单个 worker 最大处理时间         | Infinity |
| maxRetries                  | 最大重试次数                   | Infinity |
| forcedKillTime              | 在进程退出时，如果子进程未正常退出，则会强制退出 | 100ms    |
| autoStart                   | 初始化时，就自动最大数量的子进程         | false    |
| onChild                     | 创建子进程时触发的函数              | 空函数      |

### 函数调用

每次函数的执行是，构造了一个方法、参数的对象，发送给子进程排队处理。如果有限制最大全局并发数时，达到并发会抛出错误。

[https://github.com/rvagg/node-worker-farm/blob/master/lib/farm.js#L312](https://github.com/rvagg/node-worker-farm/blob/master/lib/farm.js#L312)

每次调用函数在内部会执行 `addCall` 方法，这时就是构造了一个调用的对象信息。将调用信息存入全局队列中，执行 `processQueue` ，进行分发。

当前活跃的子进程个数小于最大并发子进程数时，创建一个子进程。这时，检查所有子进程正在处理的调用是否小于子进程的并发处理数。小于则将任务分配给这些子进程。

当发送任务时，如果有配置超时时间，则会注册一个超时回调，若超时，则整个子进程会被杀死，*如果你的子进程中有多个调用正在执行，那么都会被干掉*。

处理完之后，通过 `receive` 方法进行后续的处理。

## 应用

现在默认的情况下，是最调用效率最优的方案，因为子进程被创建后，有调用的情况下，一直不会被销毁，省去了冷启动的时间。

但是，如果你需要在超时的情况下，cancel 掉正在处理的逻辑，`maxCallTime` 可以实现这个需求，但有个问题是，子进程被杀死时，所有其他的调用都会被终止，这不符合我们的期望，因此我们需要将 `maxCallsPerWorker`设为 1 ，让每个子进程同时只处理一个任务，处理完就退出，这样如果任务超时，不会对其他的任务造成影响。

## 思考

这样做的执行时间将会大幅增加，还有什么办法能够保证任务互不影响的情况，尽可能不降低执行效率呢。

目前想到的思路是，每次虽然只执行一个，但是每次执行完后不将子进程销毁，知道超时的时候才销毁一次，这样的话也可以减少每次创建子进程带来的开销。

你还有更好的方案吗？欢迎在下面留言讨论。
