---
slug: session-store-with-connect-redis-in-sails
title: sails 使用 connect-redis 存储 session 的一个小坑
tags: [sails ,session]
---

我在`config/session`中添加session配置的时候，提示我需要安装`connect-redis`。

安装完后启动发现报错，如下信息：
```js
Could not load Connect session adapter :: connect-redis
A hook (`session`) failed to load!
```

后来搜到github上的issue发现，还只能使用v1.4.5版本的，于是我切换到1.4.5的，启动就没报错了。

https://github.com/balderdashy/sails/issues/2379
