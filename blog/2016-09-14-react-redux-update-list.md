---
slug: react-redux-update-list
title: react redux 更新列表中的某个属性时需要注意
tags: [react ,redux]
---

常常会碰到这种需求，对列表中的某个元素进行操作，然后改变这个对象的一个属性值。

今天就在这里踩到了坑。也算是对react渲染机制加深的理解。

是这样的，我有一个好友列表，需要点击`添加`操作来加好友，而这个用户的对象中有一个属性值是`isFriend`，再添加成功后需要对其进行改变。

当然，通常的思路就是，把这个列表中的这行记录的那个属性值设为true即可，添加按钮就隐藏掉。
![untitled1.png](https://static.gaoqixhb.com/Fq2qQviK9Okapffy1b9LCBS4bFWt)

我在`reducer`中循环匹配，匹配成功的话就`isFriend`设置为true，但是呢，奇怪的事情发生了，界面并没有像预想的一样隐藏掉添加按钮。

代码片段如下：
```js
	newArr = oldState.contactsList.map(function mapFunc(contact) {
		var result = contact;

		if (result.id === action.data) {
        	result.isFriend = true;
    	}
    	return result;
    });

    return Object.assign({}, oldState, {
      contactsList: newArr,
    });
```

看起来确实没有什么不对劲的呀，我打开react-dev-tool看组件的值，也确实改变过来了。什么鬼呢？！

后来找了找，给了我启发，于是动手试了试，果然是因为数组中的对象的引用未改变导致未重新渲染。

修正后的代码如下：

```js
	if (result.id === action.data) {
        // 不能直接赋值，此处直接赋值，引用不变，被认为对象为改变，则不重新渲染
        result = Object.assign({}, result, {isFriend: true});
	}
```
