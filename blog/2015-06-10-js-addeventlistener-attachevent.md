---
slug: js-addeventlistener-attachevent
title: Javascript 的 addEventListener() 及 attachEvent() 区别分析
tags: [javascript ,event ,addeventlistener ,attachevent]
---

大家都知道事件的用法就是当某个事件 (状况) 被触发了之后就会去执行某个 Function, 尤其是 Javascript, 在当红 AJAX 的催化下 , 了解 Javascript 的 Event 用法更加重要 , 在这里就大概介绍一下 avascript 的 Event 用法。

# 添加事件

## Mozilla 中

addEventListener 的使用方式：

`target.addEventListener(type, listener, useCapture);`

* `target`： 文档节点、document、window 或 XMLHttpRequest。
* `type`： 字符串，事件名称，不含“on”，比如“click”、“mouseover”、“keydown”等。
* `listener` ：实现了 EventListener 接口或者是 JavaScript 中的函数。
* `useCapture` ：是否使用捕捉，一般用 false 。例如：document.getElementById("testText").addEventListener("keydown", function (event) { alert(event.keyCode); }, false);

### 栗子

```js
document.getElementById("testText").addEventListener("keydown", function (event) { alert(event.keyCode); }, false);
```

## IE中

`target.attachEvent(type, listener); `
* `target`： 文档节点、document、window 或 XMLHttpRequest。
* `type`： 字符串，事件名称，含“on”，比如“onclick”、“onmouseover”、“onkeydown”等。
* `listener `：实现了 EventListener 接口或者是 JavaScript 中的函数。 例如：`document.getElementById("txt").attachEvent("onclick",function(event){alert(event.keyCode);});`

# 移除事件
W3C 及 IE 同时支持移除指定的事件 , 用途是移除设定的事件 , 格式分别如下 :

## W3C 格式
`removeEventListener(event,function,capture/bubble); `

## Windows IE的格式如下
`detachEvent(event,function); `

# 浏览器兼容

适应的浏览器版本不同，同时在使用的过程中要注意
* `attachEvent 方法` 按钮 `onclick `IE 中使用
* `addEventListener` 方法 按钮 `click` fox 中使用

两者使用的原理：可对执行的优先级不一样：

* attachEvent 方法，为某一事件附加其它的处理事件。（不支持 Mozilla 系列）
* addEventListener 方法 用于 Mozilla 系列

### 栗子
```js
document.getElementById("btn").onclick = method1;
document.getElementById("btn").onclick = method2;
document.getElementById("btn").onclick = method3;
```
**如果这样写 , 那么将会只有 medhot3 被执行 **

写成这样：
```js
var btn1Obj = document.getElementById("btn1"); //object.attachEvent(event,function);
btn1Obj.attachEvent("onclick",method1);
btn1Obj.attachEvent("onclick",method2);
btn1Obj.attachEvent("onclick",method3);
```
**执行顺序为 method3->method2->method1 **

如果是 Mozilla 系列，并不支持该方法，需要用到 addEventListener
```js
var btn1Obj = document.getElementById("btn1");
//element.addEventListener(type,listener,useCapture);
btn1Obj.addEventListener("click",method1,false);
btn1Obj.addEventListener("click",method2,false);
btn1Obj.addEventListener("click",method3,false);
```
**执行顺序为 method1->method2->method3**

# 兼容 IE 和 firefox 的事件处理

## 封装
```js
function addListener(element, eventName, handler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, handler, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + eventName, handler);
    }
    else {
        element['on' + eventName] = handler;
    }
}

function removeListener(element, eventName, handler) {
    if (element.addEventListener) {
        element.removeEventListener(eventName, handler, false);
    }
    else if (element.detachEvent) {
        element.detachEvent('on' + eventName, handler);
    }
    else {
        element['on' + eventName] = null;
    }
}
```

上面函数有两处需要注意一下就是 :

1. 第一个分支最好先测定 w3c 标准 . 因为 IE 也渐渐向标准靠近 . 第二个分支监测 IE.
1. 第三个分支是留给既不支持 (add/remove)EventListener 也不支持 (attach/detach)Event 的浏览器 .

## 优化

对于上面的函数我们是运用 " 运行时 " 监测的 . 也就是每次绑定事件都需要进行分支监测 . 我们可以将其改为 " 运行前 " 就确定兼容函数 . 而不需要每次监测 .

这样我们就需要用一个 DOM 元素提前进行探测 . 这里我们选用了 document.documentElement.
为什么不用 document.body 呢 ?
**因为 document.documentElement 在 document 没有 ready 的时候就已经存在**. 而 document.body 没 ready 前是不存在的 .

这样函数就优化成

```js
var addListener, removeListener,
    /* test element */
    docEl = document.documentElement;

// addListener
if (docEl.addEventListener) {
    /* if `addEventListener` exists on test element, define function to use `addEventListener` */
    addListener = function (element, eventName, handler) {
        element.addEventListener(eventName, handler, false);
    };
} else if (docEl.attachEvent) {
    /* if `attachEvent` exists on test element, define function to use `attachEvent` */
    addListener = function (element, eventName, handler) {
        element.attachEvent('on' + eventName, handler);
    };
} else {
    /* if neither methods exists on test element, define function to fallback strategy */
    addListener = function (element, eventName, handler) {
        element['on' + eventName] = handler;
    };
}

// removeListener
if (docEl.removeEventListener) {
    removeListener = function (element, eventName, handler) {
        element.removeEventListener(eventName, handler, false);
    };
} else if (docEl.detachEvent) {
    removeListener = function (element, eventName, handler) {
        element.detachEvent('on' + eventName, handler);
    };
} else {
    removeListener = function (element, eventName, handler) {
        element['on' + eventName] = null;
    };
}
```
