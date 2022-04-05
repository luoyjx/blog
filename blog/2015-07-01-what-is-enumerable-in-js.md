---
slug: what-is-enumerable-in-js
title: js 对象中什么是可枚举性 (enumerable)？
tags: [javascript ,enumerable , 枚举]
---

# 引言
说到枚举，可能很多人都会想到枚举类型，但在 javascript 对象中有一个属性为可枚举性，他是什么呢？

# 概念
可枚举性（enumerable）用来控制所描述的属性，是否将被包括在 for...in 循环之中。具体来说，如果一个属性的 enumerable 为 false，下面三个操作不会取到该属性。
* for..in 循环
* Object.keys 方法
* JSON.stringify 方法

# enumerable “隐身术”
```javascript
var o = {a:1, b:2};

o.c = 3;
Object.defineProperty(o, 'd', {
  value: 4,
  enumerable: false
});

o.d
// 4

for( var key in o ) console.log( o[key] );
// 1
// 2
// 3

Object.keys(o)  // ["a", "b", "c"]

JSON.stringify(o // => "{a:1,b:2,c:3}"
```

上面代码中，d 属性的 `enumerable` 为 `false`，所以一般的遍历操作都无法获取该属性，使得它有点像“秘密”属性，但还是可以直接获取它的值。

至于 `for...in` 循环和 `Object.keys` 方法的区别，在于前者包括对象继承自`原型对象的`属性，而后者只包括对象`本身的`属性。如果需要获取对象自身的所有属性，不管 enumerable 的值，可以使用 `Object.getOwnPropertyNames` 方法
