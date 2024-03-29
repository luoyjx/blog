---
slug: dom-api-in-js
title: js 中的 dom 操作回顾
tags: [javascript ,dom]
---

## 创建节点
* document.body 指向的是 body 元素
* document.documentElement 则指向 html 元素

```js
    //创建节点
    var createNode = document.createElement("div");
    var createTextNode = document.createTextNode("hello world");
    createNode.appendChild(createTextNode);
    document.body.appendChild(createNode);
    document.documentElement.appendChild(createNode);
```

## 插入节点
可以使用
* appendChild
* insertBefore
insertBefore 接收两个参数，第一个是插入的节点，第二个是参照节点，如 insertBefore(a,b)，则 a 会插入在 b 的前面

```js
    //插入节点
    var createNode = document.createElement("div");
    var createTextNode = document.createTextNode("hello world");
    createNode.appendChild(createTextNode);
    var div1 = document.getElementById("div1");
    document.body.insertBefore(createNode,div1);
```

## 替换和删除元素
从 replaceChild 和 removeChild 的字面意思看，就是删除子节点，因此调用者，需要包含子节点 div1，不然调用会报错。返回的节点是替换的或删除的元素，被替换 / 删除的元素仍然存在，但 document 中已经没有他们的位置了。

```js
//替换元素
   var replaceChild = document.body.replaceChild(createNode,div1);
```

```js
//删除元素
    var removeChild = document.body.removeChild(div1);
```

## 节点的属性

* firstChild: 第一个子节点
* lastChild: 最后一个子节点
* childNodes: 子节点集合，获取其中子节点可以 `someNode.childNodes[index]` 或者 `someNode.childNodes.item(index)`
* nextSibling: 下一个兄弟节点
* previousSibling：上一个兄弟节点
* parentNode：父节点

## 文档片段
好处在于**减少 dom 的渲染次数**，可以优化性能。

```js
//文本片段
    var fragment = document.createDocumentFragment();
    var ul = document.getElementById("ul");
    var li = null;
    for (var i = 4; i >= 0; i--) {
        li = document.createElement("li");
        li.appendChild(document.createTextNode("item "+i));
        fragment.appendChild(li);
    }
    ul.appendChild(fragment);
```

## 克隆元素
* someNode.cloneNode(true): 深度克隆，会复制节点及整个子节点
* someNode.cloneNode(false): 浅克隆，会复制节点，但不复制子节点

```js
//克隆
    var clone = ul.cloneNode(true);
    document.body.appendChild(clone);
```

### 注意

**childNodes.length 存在跨浏览器的问题**

可以看到有关列表的 html 片段没有用
```html
<ul id="ul">
    <li>sdsssssss</li>
    <li>qqqq</li>
    <li>wwww</li>
    <li>eeee</li>
</ul>
```
 这种书写格式而是使用没有换行的格式书写，是因为在不同的浏览器中，获取 ul.childNodes.length 的结果有差异：
在 ie 中，ul.childNodes.length 不会计算 li 之间的换行空格，从而得到数值为 4
在 ff、chrome,safari 中，会有包含 li 之间的空白符的 5 个文本节点，因此 ul.childNodes.length 为 9
若要解决跨浏览器问题，可以将 li 之间的换行去掉，改成一行书写格式。

**cloneNode 存在跨浏览器的问题**

在 IE 中，通过 cloneNode 方法复制的元素，会复制事件处理程序，比如，var b = a.cloneNode(true). 若 a 存在 click,mouseover 等事件监听，则 b 也会拥有这些事件监听。
在 ff,chrome,safari 中，通过 cloneNode 方法复制的元素，只会复制特性，其他一切都不会复制
因此，若要解决跨浏览器问题，在复制前，最好先移除事件处理程序。
