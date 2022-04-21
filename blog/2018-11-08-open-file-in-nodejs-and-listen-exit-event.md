---
slug: open-file-in-nodejs-and-listen-exit-event
title: 小技巧，Node.js 怎么在程序中打开一个文件，并监听文件退出
tags: [node.js]
---

```js
var vim = require('child_process').spawn('vim', ['test.txt'], {stdio: 'inherit'});

vim.on('exit', () => {
  console.log('saved txt')
  process.exit(0)
});
```
