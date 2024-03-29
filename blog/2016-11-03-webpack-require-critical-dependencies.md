---
slug: webpack-require-critical-dependencies
title: webpack 再使用变量作为 require 路径时，打包 Critical dependencies 警告
tags: [webpack ,critical dependencies]
---

有的小伙伴可能在开发时需要动态加载模块

常规思路，如果模块有固定的父级路径，比较好办：
```js
var foo = require("./dir/"+somevaribale+".js");
```

这样即可，进行根据条件不同进行加载。

但是也有情况下，路径是完全不可预测的。

比如我们需要加载一个任意的绝对路径，我们可能会这样写。

```js
var module_path= "/dir/"+somevariable+".js";
var foo= require(module_path);
```

在 node 后端环境，这样是没有问题的。

但是在 **webpack** 打包的时候，这样就会有警告了：
![Critical dependencies ](https://static.gaoqixhb.com/FkVA8GgrviPE_RQ22lgbwlzxOJ02)

这个问题，是源自 webpack 中的[require context](http://webpack.github.io/docs/context.html)问题。

在 github 上也有相关的讨论：

* [Warning: Critical dependencies.](https://github.com/webpack/webpack/issues/196)
* [Optionally disable dynamic requires](https://github.com/webpack/webpack/issues/198)

我试了这种方式，发现可以，所以分享一下，但是我没有在 `electron` 环境下尝试。

```js
// webpack.config.js

{
  module: {
    // require
    unknownContextRegExp: /$^/,
    unknownContextCritical: false,

    // require(expr)
    exprContextRegExp: /$^/,
    exprContextCritical: false,

    // require("prefix" + expr + "surfix")
    wrappedContextRegExp: /$^/,
    wrappedContextCritical: false
  }
}
```
