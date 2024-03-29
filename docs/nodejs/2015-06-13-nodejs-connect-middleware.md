---
id: nodejs-connect-middleware
title: node.js 中的 connect 中间件
---

Connect 被定义为 Node 平台的中间件框架，从定位上看 Connect 一定是出众的，广泛兼容的，稳定的，基础的平台性框架。如果攻克 Connect，会有助于我们更了解 Node 的世界。Express 就是基于 Connect 开发的。

# Connect 介绍
如果把一个 http 处理过程比作是污水处理，中间件就像是一层层的过滤网。每个中间件在 http 处理过程中通过改写 request 或（和）response 的数据、状态，实现了特定的功能。

下图列出了 connect 所有内置中间件和部分第三方中间件。完整的中间件列表请进[传送门](https://github.com/senchalabs/connect/wiki)。
 ![connect 中间件](https://static.gaoqixhb.com/FvgDfH2Q-KxL4BTv5HfMn7dAbi3k)

图中根据中间件在整个 http 处理流程的位置，将中间件大致分为 3 类：

* Pre-Request 通常用来改写 request 的原始数据
* Request/Response 大部分中间件都在这里，功能各异
* Post-Response 全局异常处理，改写 response 数据等

# connect 安装

我的环境
* win7 64bit
* Nodejs v0.12.3
* Npm 2.9.1

通过 npm 安装 connect
```
E:\code\nodejs\connect-learning>npm install connect --save
connect@3.3.5 node_modules\connect
├── parseurl@1.3.0
├── utils-merge@1.0.0
├── debug@2.1.3 (ms@0.7.0)
└── finalhandler@0.3.4 (escape-html@1.0.1, on-finished@2.2.1)
```

**Tip**: 如果你是在项目中，并且已经有 `package.json` 这个文件那么你可以加上`--save` 选项让他在安装了这个模块之后就将它添加并保存到你的 `package.json` 文件中。

那么接下来，创建一个 app.js，尝试做一个简单的 http server。

```js
var connect = require('connect');
var http = require('http');

var app = connect();

app.use(function (req, res) {
  res.end('Hello from Connect!\n');
});
http.createServer(app).listen(3000);
```

启动后在 `localhost:3000` 访问即可看到
 ![最简单的 http server](https://static.gaoqixhb.com/Fh-MO02-04maFNdXYIZDQJiUeJhI)

**Tip**: 由于在之前的版本中加入了太多的中间件，而使 connect 变得相当臃肿，所以，在之后的版本中，很多东西都被拿出来单独当初一个模块了，在需要的时候可以自行通过 `app.use()` 来添加模块。

# connect 中间件介绍

* body-parser - 以前是 `bodyParser`, `json`, 和 `urlencoded`. 你可能需要以下 :
  + body
  + co-body
  + raw-body
* compression - 压缩中间件，以前是 compress
* connect-timeout - 超时中间件，以前是 timeout
* cookie-parser - cookie 解析中间件，以前是 cookieParser
* cookie-session - cookieSession 中间件，以前是 cookieSession
* csurf - 跨源请求伪造中间件，以前是 csrf
* errorhandler - 错误处理中间件，以前是 error-handler
* express-session - session 中间件，以前是 session
* method-override - HTTP 伪造中间件，以前是 method-override
* morgan - 日志中间件，以前是 logger
* response-time - 相应时间中间件，以前 response-time
* serve-favicon - 网页 favicon 中间件，以前 favicon
* serve-index - previously directory
* serve-static - previously static
* vhost - previously vhost

当前版本是 v3.3.5
由于现在的版本中大部分中间件都被独立出来，所以知道他们的作用之后在需要时进行安装即可。

在此就不一一介绍了。大致的介绍和使用可以参照 github，https://github.com/senchalabs/connect#middleware
