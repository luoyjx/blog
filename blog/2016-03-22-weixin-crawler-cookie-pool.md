---
slug: weixin-crawler-cookie-pool
title: 微信爬虫的cookie池的node.js实现
tags: [node.js ,redis ,cookie]
---

之前的一篇文章说到了维护一个cookie池来降低500的概率。

[记搜狗微信号搜索反爬虫](http://blog.gaoqixhb.com/p/56e92e1e7b71cea107c700ba)

在知乎上看到有人说只需要SNUID替换，其他的不影响。
所以我就写了一个SNUID的池，存储在redis中。

思路：
1. 通过随机关键字不带cookie请求weixin.sogou.com
2. 从请求的header中抽取SNUID缓存在redis中。
3. 每6个小时将SNUID池更新一遍。

代码在这里：
https://github.com/luoyjx/weixin-crawler-es5
