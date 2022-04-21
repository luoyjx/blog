---
slug: get-tcp-random-port-in-nodejs
title: node.js 通过 tcp 方式获取随机端口与使用场景
tags: [port ,端口 ,node.js]
---

某些场景可能需要动态的获取端口来启动服务，可能服务化场景，不直接硬配置端口。

哈哈，这看来是要为分布式、服务注册、服务发现做准备呢。

```js
/**
 * auto port
 * @authors luoyjx (yjk99@qq.com)
 * @date    2016-10-16 20:42:57
 */
var net = require('net');

var server = net.createServer();
    server.on('error', console.log);
    server.on('listening', function () {
      var port = server.address().port;

      server.close(function () {
        console.log('auto port: %s', port);
      });
    }.bind(this));
// tcp 使用端口 0 表示系统分配端口
server.listen(0);
```

# 预想的场景

服务在启动的时候，首先去获取一个可用端口，将自己使用此端口启动，再注册到配置管理中，这样即可实现服务注册了。
配合 etcd 即可实现服务发现，不过还木有实践。
