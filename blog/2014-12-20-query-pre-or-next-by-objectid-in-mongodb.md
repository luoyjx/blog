---
slug: query-pre-or-next-by-objectid-in-mongodb
title: 根据 mongodb 的 ObjectId 查询上一条下一条 (单实例)
tags: [mongodb]
---

   譬如做文章类内容页的时候可能需要用到上一篇下一篇，这个在 mongodb 怎么实现呢？

  但是 mongodb 的主键并不是有自增数字类型，但是它的策略也是有规律，按 id 的大小排序是可以的。

  给出具体查询的语句：

```js
    //next record:
    db.posts.find({_id: {$gt: curObjectId}}).sort({_id: 1 }).limit(1);

    //previous record:
    db.posts.find({_id: {$lt: curObjectId}}).sort({_id: -1 }).limit(1)
```

  测试过，确实可以实现，但是有个问题就是，如果在多实例的情况下，可能这个就不一定能显示正确结果了。

  有待测试。

  感觉好一点的实现方案是直接将上一条及下一条的 id 存为字段。
