---
slug: check-var-is-object-in-js
title: js 判断一个变量是否为对象
tags: [javascript ,object]
---

## 问题
js 中判断一个变量是否为对象，通常都是使用 typeof 来判断，那么还有其他办法么？

答案是当然的！

我们利用 Object 对象来实现这个功能。

## 原理
如果 Object 函数的参数是一个对象，它总是返回原对象。利用这一点，可以写一个判断变量是否为对象的函数。

## 方案

```js
function isObject(value) {
    return value === Object(value);
}
```
