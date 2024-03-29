---
slug: forbidden-iframe-saving-access-history
title: 禁止 iframe 记录浏览器历史
tags: [iframe , 浏览器]
---

NTS 框架中采用了新的方式记录浏览器的操作历史，因此在某些带 IFRAME 载入内容的项目中不希望这个 IFRAME 的变化影响到整个系统的操作历史，下面给出两种禁止 IFRAME 记录操作历史的解决方案，各有利弊视具体情况选取。

## 方案一
原理：利用 location 的 replace 方法载入新页面，关于 replace 方法的描述：
When a document is replaced, it is also removed from the history object. Moreover, the user interface navigation methods, such as the Back and Forward buttons, will no longer access the URL.
分析：此方案有个前提条件就是父窗体需要有对 iframe 窗体的访问权限，因此此方案一般用于 iframe 载入的内容和父窗体是同域或者同父域的情形。
范例：
 ![case 1](https://static.gaoqixhb.com/Fj9Axzh6Md6a9gEcrBbP4BFW0tr9)

第一种方案主要是通过 `replace` 来将 `url` 替换而不是 `push` 到浏览器历史中
```
document.getElementById('abc').contentWindow.location.replace(url);
```

## 方案二
原理：先销毁已有 iframe 再创建一个新的，然后通过新的 iframe 载入新的页面内容
分析：不存在跨域问题，但是会有 iframe 不断创建销毁的额外开销
范例：
![untitled2.png](https://static.gaoqixhb.com/FpQLZUKI9tU9RgJrSQtkLvaHZGyF)

第二种方式主要是删除 iframe 节点之后重新创建一个 iframe 元素。
```
iframe = document.createElement('iframe');
document.body.appendChild(iframe);
iframe.src = url;
```

11
