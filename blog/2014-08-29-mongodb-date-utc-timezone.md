---
slug: mongodb-date-utc-timezone
title: mongodb 中 Date 类型数据入库时以 0 时区存储问题
tags: [mongodb]
---

```js
var date = new Date();//入库时间
var localTime = date.getTime();
var localOffset=date.getTimezoneOffset()*60000; //获得当地时间偏移的毫秒数
var utc = localTime + localOffset; //utc即GMT时间
var offset = 16; //以北京时间为例，东8区
var beijing = utc + (3600000 * offset);
date = new Date(beijing);
data.time = date;
var receiveTime = new Date(
    parseInt(data.DataTime.substring(0,4)),//年
    parseInt(data.DataTime.substring(4,6)) - 1,//月,从零开始，需要减一
    parseInt(data.DataTime.substring(6,8)),//日
    parseInt(data.DataTime.substring(8,10)),//时
    parseInt(data.DataTime.substring(10,12)),//分
    parseInt(data.DataTime.substring(12,14))//秒
);
localTime = receiveTime.getTime();
localOffset = receiveTime.getTimezoneOffset() * 60000;
utc = localTime + localOffset;
beijing = utc + (3600000*offset);
data.DataTime = new Date(beijing);
```

将时区再加 8 个之后入库就正常了
