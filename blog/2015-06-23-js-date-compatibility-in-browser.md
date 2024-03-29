---
slug: js-date-compatibility-in-browser
title: new Date 在浏览器中兼容的问题
tags: [js date , 浏览器兼容 ,javascript]
---

# 起因
在开发时，只在 chrome 下开发，所以，在其他浏览器上的效果并未发现。
结果在 ff 和 IE 下的 `new Date(str)` 时，出现了 NaN。

比如如下代码：
```
var timestart = '2010-05-04';
var timeend = '2015-06-23';
var time1 = (timestart+' 00:00:00').toString();
var time2 = (timeend+' 23:59:59').toString();
timestart = new Date(time1);
timeend = new Date(time2);
```

# 尝试
* 在 `IE` 下的执行情况：

	结果：`Invalid Date`

* 在 `firefox` 下的执行情况：

	结果：`Invalid Date`

* 在 `chrome` 下的执行情况：

	结果：`正常`

# 正确的姿势
主要的变化是对默认的日期格式进行了转换， 基于 '/' 格式的日期字符串，才是被各个浏览器所广泛支持的，‘-’连接的日期字符串，则是只在 chrome 下可以正常工作。

```
var time1 = (timestart+' 00:00:00').toString();
var time2 = (timeend+' 23:59:59').toString();
timestart = new Date(Date.parse(str.replace(/-/g,"/"))).getTime();
timeend = new Date(Date.parse(str.replace(/-/g,"/"))).getTime();
```

# 结论
`2015-06-23` 是无法被各个浏览器中，使用 `new Date(str)` 来正确生成日期对象的。 正确的用法是 `2015/06/23`.
