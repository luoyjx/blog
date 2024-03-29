---
slug: js-bind-method
title: 没图说个锤子之 js bind 方法
tags: [javascript ,bind]
---

bind 方法，写 javascript 的肯定都见过，我也是，但是，不是经常用的话，基本上过一段时间就会模糊了，所以，决定把它转化成图像，估计比较容易记忆。

# 概念
我们来看看 MSDN 上关于 javascript bind 函数的解释：
> 对于给定函数，创建具有与原始函数相同的主体的绑定函数。 在绑定函数中，this 对象将解析为传入的对象。 绑定函数具有指定的初始参数。

哈哈哈哈，是不是懵逼了？

莫慌，我们慢慢来看，看看用法先：

# 用法
`function.bind(thisArg[,arg1[,arg2[,argN]]])`
## 参数
* function
必选。 一个函数对象。
* thisArg
必选。 this 关键字可在新函数中引用的对象。
* arg1[,arg2[,argN]]]
可选。 要传递到新函数的参数的列表。

## 返回值
与 function 函数相同的`新函数`(**注意是新函数！**)，`thisArg 对象`和`初始参数`除外。

## 异常
如果指定的 function 不是函数，则将引发 `TypeError` 异常。

看到这里我们基本对 bind 方法的使用有个初步认识了，那先来看看具体示例再分析分析。

# 示例
## this 绑定
```
/**
 * 定义初始的函数
 * 这个函数的功能很简单，就是判断数字是否在某个范围
 */
var checkNumericRange = function (value) {
    if (typeof value !== 'number')
        return false;
    else
        return value >= this.minimum && value <= this.maximum;
}

// 这里的范围将会被绑定到函数中的this值去
var range = { minimum: 10, maximum: 20 };

// 开始绑定！
var boundCheckNumericRange = checkNumericRange.bind(range);

// 使用一个数字来验证下这个函数
var result = boundCheckNumericRange (12);
document.write(result);

// 输出: true
```

好了，这个简单的示例看完了，我们知道了，使用 bind 将一个对象绑定到某个函数中，这个函数中所使用的 this 就会指向绑上去的函数了，不罗嗦了，画个图理解。
![function 调用 bind 方法](https://static.gaoqixhb.com/Fjb93vay1fsLDYkAGch4TtpaSbFP)

再看个稍微有点不同的例子，其实也差不多：
```
// 创建一个带有刚才那个方法的对象，
// 并且方法调用当前这个对象中的最大值和最小值
var originalObject = {
    minimum: 50,
    maximum: 100,
    checkNumericRange: function (value) {
        if (typeof value !== 'number')
            return false;
        else
            return value >= this.minimum && value <= this.maximum;
    }
}

// 检查10是否在范围内
var result = originalObject.checkNumericRange(10);
document.write(result + " ");
// 输出: false

// 还是同样的配方，还是熟悉的味道
var range = { minimum: 10, maximum: 20 };

// bind技能要正在引导...
var boundObjectWithRange = originalObject.checkNumericRange.bind(range);

// 看看这次的效果
var result = boundObjectWithRange(10);
document.write(result);
// 输出: true， 有效了！
```

## 参数绑定
在参数中还可以有几个参数带进来
`arg1[,arg2[,argN]]] `

```
// 又是定义一个函数，这次是4个参数
var displayArgs = function (val1, val2, val3, val4) {
    document.write(val1 + " " + val2 + " " + val3 + " " + val4);
}

var emptyObject = {};

// 使用bind，产生一个新函数
// 这个新函数的第一第二个参数已经定死了为这两个，再有参数往后排
var displayArgs2 = displayArgs.bind(emptyObject, 12, "a");

// 这里就是两个排队的参数了
displayArgs2("b", "c");
// 输出: 12 a b c
```

恩，知道，上图再说对吧
 ![bind 函数绑定参数](https://static.gaoqixhb.com/FmXqI82NVFL-yaAMw-rS_AfBIFD9)

上图可以看出 bind 时传入的参数，在新函数中作为最先使用的参数，但是它并`没有改变原函数参数的个数`。

不知道看了两幅图，记住了 bind 方法没？
