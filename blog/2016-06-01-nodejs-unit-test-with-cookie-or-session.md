---
slug: nodejs-unit-test-with-cookie-or-session
title: node.js单元测试之带session和cookie的案例
tags: [node.js ,单元测试 ,mocha]
---

## 需要cookie和session的测试案例

在web开发中，Cookie有着非常重要的作用。因为HTTP是无状态的，所以需要用cookie来辅助实现用户认证。我们先来简单介绍一下cookie的工作机制。

 ![untitled1.png](https://static.gaoqixhb.com/Fi6_lmeCZp8ajtBAjW6Ic7dfdALE)

如果所示，如果通过cookie和session协同识别一个用户需要两次请求，第一次请求的时候，服务器并不认识你，但是他给你标记了一个他独有的id，等到第二次请求的时候，浏览器自动给你带上了之前的标签，这样服务器就知道你之前请求过了。

那么问题来了，如果我们写测试案例的时候，需要两次请求来实现的话，会非常麻烦，测试案例也会很冗长。怎么才能一次请求就能使用cookie和session呢？

这时候express的中间件的好处就体现了。
首先，我们在用`supertest`进行HTTP请求的时候，可以通过下面的形式设置cookie：

```js
set('Cookie', cookieValue)
```

然后，我们写一个非常简单的中间件：

```js
app.use(function(req, res, next) {
    if (config.debug && req.cookies['mock_user']) {
        var mockUser = JSON.parse(req.cookies['mock_user']);
        req.session.user = new UserModel(mockUser);
        return next();
    }
    next();
});
```

原理就是先判断当前是否为开发环境，通过config来设置，通常在开发阶段这个值设置为true。其次判断是否具有键为mock_user的cookie键值对，如果存在，设置session里面的user值，这样，只要一次请求我们就能实现用户标识。
最后要解决的问题就是怎么设置字段键为mock_user的cookie了，具体的用法可参照test目录里面的support/support.js,这里不多说。

----

## 补充

测试时加上
```js
.set('Cookie', cookie)
```

那么这个cookie是什么形式呢？

`Cookie: mock_user=xxxxxxxxxx`

```js
var cookie = [ 'mock_user', encodeURIComponent(JSON.stringify(support.user))].join('=');
```
