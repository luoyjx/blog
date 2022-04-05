---
slug: mongodb-aggregation-query-group-by-time
title: MongoDB 聚合查询 - 按时间分组统计
tags: [mongodb ,morphia ,java]
---

DB search sql:
1. 筛选出拥有 openId 的用户，对这些用户进行按年月日分组，并统计每天新增的用户数

```js
db.user.aggregate(
   [
      {
        $match: { "openId": { $exists: true } }
      },
      {
        $group : {
           _id : { month: { $month: "$createDate" }, day: { $dayOfMonth: "$createDate" }, year: { $year: "$createDate" } },
           count: { $sum: 1 }
        }
      }
   ]
)
```
