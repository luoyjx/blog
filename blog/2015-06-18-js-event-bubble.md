---
slug: js-event-bubble
title: js 中的事件冒泡
tags: [javascript , 事件冒泡 ,event]
---

# 什么是事件冒泡

JavaSciprt 事件中有两个很重要的特性：
* 事件冒泡
* 目标元素

在一个对象上触发某类事件（比如单击 onclick 事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，如果没有定义此事件处理程序或者事件返回 true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），或者它到达了对象层次的最顶层，即 document 对象（有些浏览器是 window）。

打个比方说：你在地方法院要上诉一件案子，如果地方没有处理此类案件的法院，地方相关部门会帮你继续往上级法院上诉，比如从市级到省级，直至到中央法院，最终使你的案件得以处理。

 ![事件冒泡](https://static.gaoqixhb.com/FqqX6hh8ttvRY1oUbvqAh70IP-MA)

## 事件冒泡允许多个操作被集中处理
事件冒泡允许多个操作被集中处理（把事件处理器添加到一个父级元素上，避免把事件处理器添加到多个子级元素上），它还可以让你在对象层的不同级别捕获事件
```html
<div onclick="eventHandle(event)" id="outSide" >
    <div id="inSide" ></div>
</div>
<script type="text/javascript">
//本例子只在外面盒子定义了处理方法，而这个方法一样可以捕获到子元素点击行为并处理它。假设有成千上万子元素要处理，难道我们要为每个元素加“onclick="eventHandle(event)"”？显然没有这种集中处理的方法来的简单，同时它的性能也是更高的。
function eventHandle(e)
{
    var e=e||window.event;
    var obj=e.target||e.srcElement;
    alert(obj.id+' was click')
}
</script>
```

## 让不同的对象同时捕获同一事件
让不同的对象同时捕获同一事件 , 并调用自己的专属处理程序做自己的事情，就像老板一下命令，各自员工做自己岗位上的工作去了
```html
<div onclick="outSideWork()" id="outSide" >
    <div onclick="inSideWork()" id="inSide" ></div>
</div>
<script type="text/javascript">
function outSideWork()
{
    alert('My name is outSide,I was working...');
}

function inSideWork()
{
    alert('My name is inSide,I was working...');
}

//因为下面程序自动激活单击事件，有些浏览器不允许，所以请单击灰色盒子，从这里开始下命令，这样因为冒泡的原因，黑色大盒子也会收到单击事件，并调用了自己的处理程序。如果还有更多盒子嵌套，一样道理。

/*
function bossOrder()
{
    document.getElmentById('inSide').click();
}
bossOrder();
*/
</script>
```

# 冒泡类型
冒泡型事件：事件按照从最特定的事件目标到最不特定的事件目标 (document 对象) 的顺序触发。
* IE 5.5: div -> body -> document
* IE 6.0: div -> body -> html -> document
* Mozilla 1.0: div -> body -> html -> document -> window

# 阻止冒泡
通常情况下我们都是一步到位，明确自己的事件触发源，并不希望浏览器自作聪明、漫无目的地去帮我们找合适的事件处理程序，即我们明确最精准目标，这种情况下我们不需要事件冒泡。另外通过对事件冒泡的理解，我们知道程序将做多较多额外的事情，这必然增大程序开销。还有一个重要的问题是：事件冒泡处理可能会激活我们本来不想激活的事件，导致程序错乱，甚至无从下手调试，这常成为对事件冒泡不熟悉程序员的棘手问题。所以必要时，我们要阻止事件冒泡。

## javascript 中兼容 IE 和 ff 的方式
```js
//阻止事件冒泡函数
function stopBubble(e)
{
    if (e && e.stopPropagation)
        e.stopPropagation()
    else
        window.event.cancelBubble=true
}
```

## 阻止 jQuery 事件冒泡
jQuery 对 DOM 的事件触发具有冒泡特性。有时利用这一特性可以减少重复代码，但有时候我们又不希望事件冒泡。这个时候就要阻止 jQuery.Event 冒泡。

jQuery.Event 提供了一个非常简单的方法来阻止事件冒泡：event.stopPropagation();
```js
$("p").click(function(event){
     event.stopPropagation();
     // do something
})

```
