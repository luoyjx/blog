---
slug: alipay-usage-in-nodejs
title: nodejs 集成支付宝所遇到的坑
tags: [node.js ,alipay ,支付宝开发]
---

首先，使用express框架，能够接收到支付宝发来的POST notify请求，但是解析出来的body一直为空对象，然后将整个请求log出来查看，发现支付宝发来的Content-Type是一个奇葩的
```
application/x-www-form-urlencoded;text/html;charset=utf-8
```

这TM什么鬼玩意，到底是form还是html，于是bodyParser就扑街表示不认识了

解决方式也非常简单暴力，在bodyParser中间件之前添加一个中间件

```js
app.use(function (req, res, next) {
  if (req.url == '/alipay' || req.url == '/alipay/test'){
    req.headers['content-type'] = 'application/x-www-form-urlencoded';
  }
  next();
});
```

其次是校验notify的签名时，支付宝官方给的说明是这样的
![untitled1.png](https://static.gaoqixhb.com/FtCL1xcEJxb26NxOLMQ0B0RDEuqX)

如果没注意仔细看的话，就会以为是queryString的方式拼接，于是我用了nodejs自带的query-string库，做好了queryString.stringify()，一切完美。但是签名校验根本过不去

后来突然想到，难道不要urlencode，不是queryString，于是把代码替换成了手工拼接字符串而不要urlencode。校验就过去了……

原文 https://blog.bangbang93.com/2015/12/08/nodejs%E9%9B%86%E6%88%90%E6%94%AF%E4%BB%98%E5%AE%9D%E6%89%80%E9%81%87%E5%88%B0%E7%9A%84%E5%9D%91.moe?utm_source=tuicool&utm_medium=referral
