---
slug: check-if-the-module-is-entrypoint-in-nodejs
title: node.js 判断当前模块是否是程序的入口
tags: [node.js ,模块]
---

看别人写的node.js代码的时候，看到有很多地方会有这么一个写法。

```js
// start the server if `$ node server.js`
if (require.main === module) {
  //to do something
}
```

其实这就是判断当前模块是否是程序的入口。
