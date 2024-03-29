---
slug: js-event-bubble-event-catch
title: 事件冒泡和事件捕获
tags: [事件冒泡 , 事件捕获 ,event]
---

事件——怎样使用事件以及 IE 和 DOM 事件模型之间存在哪些主要差别

# 类型
## 冒泡型事件

事件按照从最特定的事件目标到最不特定的事件目标 (document 对象) 的顺序触发。

* IE 5.5: div -> body -> document
* IE 6.0: div -> body -> html -> document
* Mozilla 1.0: div -> body -> html -> document -> window

## 捕获型事件 (event capturing)

事件从最不精确的对象 (document 对象) 开始触发，然后到最精确 (也可以在窗口级别捕获事件，不过必须由开发人员特别指定)。

## DOM 事件流

同时支持两种事件模型：捕获型事件和冒泡型事件，但是，捕获型事件先发生。两种事件流会触及 DOM 中的所有对象，从 document 对象开始，也在 document 对象结束。

支持 W3C 标准的浏览器在添加事件时用 `addEventListener(event,fn,useCapture)` 方法，基中第 3 个参数 `useCapture` 是一个 Boolean 值，用来设置事件是在`事件捕获`时执行，还是`事件冒泡`时执行。而不兼容 W3C 的浏览器 (IE) 用 `attachEvent()` 方法，此方法没有相关设置，不过 IE 的事件模型默认是在事件冒泡时执行的，也就是在 useCapture 等于 false 的时候执行，所以把在处理事件时把 `useCapture` 设置为 false 是比较安全，也实现兼容浏览器的效果。

 ![事件冒泡](https://static.gaoqixhb.com/FqqX6hh8ttvRY1oUbvqAh70IP-MA)

* 事件捕获阶段：事件从最上一级标签开始往下查找，直到捕获到事件目标 (target)。
* 事件冒泡阶段：事件从事件目标 (target) 开始，往上冒泡直到页面的最上一级标签。

# 举例

假设一个元素 div，它有一个下级元素 p。

```html
<div>
　　<p>元素</p>
</div>
```

这两个元素都绑定了 click 事件，如果用户点击了 p，它在 div 和 p 上都触发了 click 事件，那这两个事件处理程序哪个先执行呢？事件顺序是什么？

## 两种模型

以前，Netscape 和 Microsoft 是不同的实现方式。
* Netscape 中，div 先触发，这就叫做事件捕获。
* Microsoft 中，p 先触发，这就叫做事件冒泡。

两种事件处理顺序刚好相反。IE 只支持事件冒泡，Mozilla, Opera 7 和 Konqueror 两种都支持，旧版本的 Opera's 和 iCab 两种都不支持 。

## 事件捕获

当你使用事件捕获时，父级元素先触发，子级元素后触发，即 div 先触发，p 后触发。

## 事件冒泡

当你使用事件冒泡时，子级元素先触发，父级元素后触发，即 p 先触发，div 后触发。

## W3C 模型

W3C 模型是将两者进行中和，在 W3C 模型中，任何事件发生时，先从顶层开始进行事件捕获，直到事件触发到达了事件源元素。然后，再从事件源往上进行事件冒泡，直到到达 document。

程序员可以自己选择绑定事件时采用事件捕获还是事件冒泡，方法就是绑定事件时通过 `addEventListener` 函数，它有三个参数，第三个参数若是 `true`，则表示采用`事件捕获`，若是 `false`，则表示采用`事件冒泡`。
```js
ele.addEventListener('click',doSomething2,true)
//true=捕获
//false=冒泡
```

## 传统绑定事件方式

在一个支持 W3C DOM 的浏览器中，像这样一般的绑定事件方式，是采用的事件`冒泡方式`。
```js
ele.onclick = doSomething2
```

## IE 浏览器
如上面所说，IE 只支持`事件冒泡`，不支持事件捕获，它也不支持 `addEventListener` 函数，不会用第三个参数来表示是冒泡还是捕获，它提供了另一个函数 `attachEvent`。
```js
ele.attachEvent("onclick", doSomething2);
```
附：事件冒泡（的过程）：事件从发生的目标（event.srcElement||event.target）开始，沿着文档逐层向上冒泡，到 document 为止。

# 事件的传播是可以阻止的

具体可参见另一篇博文[《js 中的事件冒泡》](http://blog.gaoqixhb.com/p/5582c4254f1043fa3601790f)
