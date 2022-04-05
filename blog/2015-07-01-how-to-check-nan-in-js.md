---
slug: how-to-check-nan-in-js
title: javascript 中怎样以可靠的方式判断 NaN
tags: [javascript]
---

# NaN

## 定义
NaN 是 JavaScript 的特殊值，表示“非数字”（Not a Number），主要出现在将字符串解析成数字出错的场合。

## 注意
NaN 不是一种独立的数据类型，而是一种特殊数值，它的数据类型依然属于 Number，使用 typeof 运算符可以看得很清楚。

```javascript
typeof NaN // 'number'
```

## 运算规则
### NaN 不等于任何值，包括他本身
```javascript
NaN === NaN // false

[NaN].indexOf(NaN) // -1

Boolean(NaN) // false

isNaN(NaN) // true
isNaN(123) // false
```

### 可靠的方式判断
利用它的特点，NaN 是 JavaScript 之中唯一不等于自身的值

```js
function myIsNaN(value) {
    return value !== value;
}
```
