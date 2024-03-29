---
slug: mongoose-connection-timeout-option
title: mongoose 连接超时参数
tags: [mongodb ,mongoose]
---

最近在项目中经常发生登录卡死的状况，由于是使用的 passport 单点登录，所以只能一步步排查，加日志。

最后发现是卡在一个 mongodb 查询那里，后来去官网查询后，发现查询超时时间默认是无限大的，所以导致我们看到的现象是 http 无返回，导致 http 超时了 , 因此 nginx 报 502 错误。

找到了 mongoose 文件的[Connection](http://mongoosejs.com/docs/connections.html)部分，在下面可以看到有一些连接参数，其中就有 socketTimeoutMS 和 connectTimeoutMS，点击进入 mongodb 官方文档，可以看到[Server 的参数](http://mongodb.github.io/node-mongodb-native/2.1/api/Server.html)中，socketTimeoutMS 默认是无限大的，这在连接外网 mongodb 时可能导致一些问题，我们需要加上超时参数。

```js
var options = {
    server: {
      socketOptions: {
        autoReconnect: true,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 10000,
      },
    },
  }

// Good way to make sure mongoose never stops trying to reconnect
mongoose.connect(uri, options);
```

有待观察后补充

----

尝试后发现，这个 `socketTimeout` 和 `socket` 变成时的设置 `timeout` 是一个效果，闲置超时时间，但是在 linux 下似乎没有什么不正常，在 windwos 上就是启动后，过了这个时间就会抛出一个 timeout 错误。
