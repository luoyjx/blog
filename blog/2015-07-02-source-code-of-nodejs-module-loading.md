---
slug: source-code-of-nodejs-module-loading
title: Node.js 模块加载过程 module.js 源码阅读
tags: [node.js ,module ,require]
---

## 引言
nodejs 中以模块来组织代码，加载模块是怎样的一个过程呢？require 又是怎么在运作？

## 模块
nodejs 中以模块为最小单位来组织代码，类似于 Java 中的 package 概念，而在 nodejs 中要搞清楚模块，就要搞清楚模块是怎么样加载的。

## 源码分析
我们都知道加载一个模块是使用 require 函数来实现的，那么先从 require 函数下手。
### 1.Module.prototype.require
我们从 module.js 里找，发现有个 require 方法，`Module.prototype.require`。
```
Module.prototype.require = function(path) {
  assert(path, 'missing path');
  assert(util.isString(path), 'path must be a string');
  return Module._load(path, this);
};
```

### 2.Module._load
通过路径加载一个模块。
方法注释上给出如下解释：
> 从缓存中查找所要加载的模块
> 1. 如果一个模块已经存在于缓存中：直接返回它的 exports 对象
> 1. 如果模块是一个本地模块，调用 'NativeModule.require()' 方法，filename 作为参数，并返回结果
> 1. 否则，使用这个文件创建一个新模块并把它加入缓存中。在加载它只会返回 exports 对象。

### 3.Module._resolveFilename
而通常我们在某个模块中给出的路径都是一个模块的相对路径，那么会先调用 `Module._resolveFilename` 这个方法来查找下这个文件的真实路径的全路径文件名。

而在 `Module._resolveFilename` 这个方法中，首先会去检查，本地模块是否有这个模块，如果有，直接返回，如果没有，继续往下查找。

### 4.Module._resolveLookupPaths
接着就会碰到 `Module._resolveLookupPaths` 方法了，从代码来看，他返回了一个数组，数组的第一个元素是模块的 id，而第二个元素是模块的 paths。

这些 paths 接下来会用来查找是否存在需要 require 的这个模块了，存在就会返回一个文件名。

而接下来通过这个 filename 来到 `Module._cache` 中查找是否，有则返回 `module.exports` 对象，没有缓存则又会查找一次本地模块，不存在这个本地模块，就新创建一个模块，并在 cache 中缓存它。**这就是我们加载了一个模块之后，第二次在别处加载时也不会重新加载的原因。**

### 5.Module.load
而在创建模块之后，还有个装载的过程 `Module.load`, 装载的过程中会将几种扩展名的文件执行不同的操作：
* `.js`  Module._complie，运行这个 js 并包裹在适当的作用域中，并传入参数 require, module, exports
* `.json` 读文件之后，使用 JSON.parse 转成对象
* `.node` 使用 process.dlopen 加载扩展

如果 js 文件中包含模块引用，那么还会继续重复以上操作的。

这里会 try catch 一下，如果装载失败，就会从 cache 中将这个模块删除。

```
try {
    module.load(filename);
    hadException = false;
  } finally {
    if (hadException) {
      delete Module._cache[filename];
    }
  }
```
## 热部署
这里的细节给了我们一个思路，即当我们程序运行时，加载了某个模块，而我们可能在运行过程中修改了代码，或者是重新部署了代码，那么我们可以通过先删除 cache 中的内容，再加载一次，来实现动态加载，也可以说是热部署。
具体的做法可以参考这个文章 http://fex.baidu.com/blog/2015/05/nodejs-hot-swapping/

到这里一个模块基本上已经加载完成了。
