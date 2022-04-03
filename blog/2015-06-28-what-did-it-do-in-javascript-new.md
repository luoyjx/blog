---
slug: what-did-it-do-in-javascript-new
title: javascirpt 中的 new 到底干了什么
tags: [javascript ,new , 对象]
---

## new 操作符
加上 new 操作符，我们就能完成传统面向对象的 class + new 的方式创建对象，在 Javascript 中，我们将这类方式成为 Pseudoclassical。

我们执行如下代码：
```
var obj = new Base();
```
这样执行的结果是什么，javascript 引擎中看到的模型对象是：
 ![javascript 引擎中模型对象](https://static.gaoqixhb.com/FnDln48_tBoWc4flNdsSlbwOEmxz)

## new 操作符干了什么
new 操作符具体干了什么呢 ? 其实很简单，就干了三件事情。
```
var obj  = {};
obj.__proto__ = Base.prototype;
Base.call(obj);
```
第一行，我们创建了一个空对象 obj
第二行，我们将这个空对象的 \__proto\__ 成员指向了 Base 函数对象 prototype 成员对象
第三行，我们将 Base 函数对象的 this 指针替换成 obj，然后再调用 Base 函数，于是我们就给 obj 对象赋值了一个 id 成员变量，这个成员变量的值是”base”

----

2019-09-24 更新

最近看到一个专栏介绍 this 时，讲到为什么全局调用一个函数时，this 指向的是 window 对象呢？
因为全局调用时，并没有使用 call 方法绑定上下文，或是在一个对象中的方法调用 this ，而根据作用域链的规则，会从当前作用域范围向外找，找到全局作用域中的 window 对象。

而 new 操作时，实际上是调用了 call 方法将这个空对象设置为上下文指向的对象。

可以见 MDN 的解释  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new 。

**不过要注意是不是在严格模式下噢，行为不同**
