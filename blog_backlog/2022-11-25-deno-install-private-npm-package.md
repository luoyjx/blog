---
slug: deno-install-private-npm-package
title: How to import private npm package in Deno
tags: [deno ,npm, registry]
---

如果还不了解 deno 背景的童鞋可以先到官网 ( https://deno.land/ ) 了解一下。也可以通过这篇讲 [deno 是什么？](./2022-11-24-what-is-deno.md) 的文章了解一下一下 deno 出现的背景。

### Deno Modules

deno 在 1.28 版本支持了通过 `npm:express@^4.18.2` 这种方式引用 npm 模块，但是仅支持通过 npm 官方的 registry 引入。
而在国内环境下，很多朋友开发 Node.js 程序都是使用的国内源甚至是私有仓库，那么怎么引入私有仓库的模块呢？
<!--truncate-->




https://github.com/ije/esm.sh/blob/main/HOSTING.md

http://localhost/@shimo/modoc@1.4.0

https://deno.land/manual@v1.28.2/node/npm_specifiers

https://deno.land/manual@v1.28.2/node/cdns#esmsh