---
slug: mongodb-time-condition-query
title: mongodb 查询时比较时间
tags: [mongodb]
---

mongodb查询时比较时间的写法

![mongodb查询比较时间](https://static.gaoqixhb.com/Fr9XN_wmHNPm_Ku9LgQGTd_uJX_z)

代码：
```js
db.name.find({'time' : {$gte : new Date("2015-04-15T16:00:00Z")}});
```
