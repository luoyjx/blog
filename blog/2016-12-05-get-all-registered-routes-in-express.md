---
slug: get-all-registered-routes-in-express
title: 怎样获得 express 所有的注册路由呢？
tags: [node.js ,express ,router]
---

比如我们注册了如下的路由

```js
app.get('/', function (...) { ... });
app.get('/foo/:id', function (...) { ... });
app.post('/foo/:id', function (...) { ... });

```

然后想要获得的东东是这样的形式：

```js
{
  get: [ '/', '/foo/:id' ],
  post: [ '/foo/:id' ]
}
```

该肿么办呢？

## 在 express 3.x 中
只需要 `app.routes` 就可以啦

## 在 express 4.x 中

[Applications](http://expressjs.com/4x/api.html#express) - built with express()

```js
app._router.stack
```

[Routers](http://expressjs.com/4x/api.html#router) - built with express.Router()

```js
router.stack
```

更多的答案尽在 StackOverflow [how-to-get-all-registered-routes-in-express](http://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express#)
