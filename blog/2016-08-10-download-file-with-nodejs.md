---
slug: download-file-with-nodejs
title: node.js 实现文件下载
tags: [node.js ,文件下载]
---

文件下载实际上是二进制流的发送，所以在服务端是就向客户端写流。

而在node.js中，读流和写流又可以通过pipe连接起来，那么思路清晰之后，就是`Content-type`类型的问题了。

代码如下

```js
var fs = require('fs');
var pdf = fs.createReadStream(path);

    res.writeHead(200, {
      'Content-Type': 'application/force-download',
      'Content-Disposition': 'attachment; filename=test.rar'
      });

    pdf.pipe(res);

```
