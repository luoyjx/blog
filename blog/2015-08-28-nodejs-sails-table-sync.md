---
slug: nodejs-sails-table-sync
title: node.js sails框架同步表的坑
tags: [sails ,node.js ,model]
---

## 错误信息
以下是报的错误
```js
error: Error: The hook `orm` is taking too long to load.
Make sure it is triggering its `initialize()` callback, or else set       `sails.config.orm._hookTimeout to a higher value (currently 20000)
at tooLong [as _onTimeout]   (C:\Users\KAMI\AppData\Roaming\npm\node_modules\sails\lib\app\private\loadHooks.js:92:21)
at Timer.listOnTimeout [as ontimeout] (timers.js:110:15
```

## 解决方案
在config目录下创建两个文件，orm和pubsub，不过据回答的作者说是名字并不重要。

```js
// config/orm.js
module.exports.orm = {
  _hookTimeout: 60000 // I used 60 seconds as my new timeout
};
```

```js
// config/pubsub.js
module.exports.pubsub = {
  _hookTimeout: 60000 // I used 60 seconds as my new timeout
};
```

不建议直接在 node_modules 中修改

原问题地址：http://stackoverflow.com/questions/28524926/the-hook-orm-taking-too-long-to-load
