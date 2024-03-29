---
slug: promise-deffered-mode
title: Promise/Deffered 模式
tags: [promise/deffered]
---

# Promise/A
包含两个部分：
* Promise
* Deffered

## Promise 抽象定义
Promise/A 对单个异步作出了这样的抽象定义：
* Promise 操作只会处在 3 中状态：`未完成`、`完成`和`失败`。
* Promise 的状态只会出现从未完成状态转化为完成态或失败态，不能逆反。完成态和失败态不能互相转化。
* Promise 的状态一旦转化，将不能被更改。

 ![Promise 状态转化示意图](https://static.gaoqixhb.com/FgyykrQbiNJlO44j-nl9sUcB4Y6m)

 ## API 定义
 一个 Promise 对象只要具备 `then` 方法即可。
 但是 then 方法也有要求：
 * 接受`完成态`、`错误态`的回调函数。在操作完成或出错时，将会调用对应方法。
 * 可选的支持 `progress` 事件回调作为第三个方法。
 * `then()` 方法只接受 `function` 对象，其余对象将被忽略。（可使用 `typeof  func === 'function' ` 来判断）
 * `then()` 方法继续返回 Promise 对象，以实现链式调用。

 代码可参考这里的例子 https://github.com/luoyjx/promise-impl
