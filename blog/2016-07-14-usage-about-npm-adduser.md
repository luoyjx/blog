---
slug: usage-about-npm-adduser
title: npm adduser的坑
tags: [npm]
---

# 场景
使用正确的 npmjs.org 用户名和密码进行 npm adduser 操作，但是给出的结果都是不停报错。

而且报错的信息还很诡异，如下
 ![untitled1.png](https://static.gaoqixhb.com/FjyHd6MBbh2th-zZugOD7H8pdZUs)

提示我说用户名或者密码错误？！！我就惊了个呆了，我都已经登陆上 npmjs.org 了，怎么还说我用户名或者密码错误呢？

# 追根究底

一般人的，当提示你用户名或者密码错误时，肯定是首先怀疑自己输错了。

当然我的第一反应也是这样的。然后我连续试了好几次，确定我肯定没有手误输错。那么问题出在哪里呢？

于是开始在网上各种找答案。网上说啥的都有，不过就是没有专门说 npm adduser 出错的问题的。大部分的nodejs入门级教程中，对 npm adduser 都是一笔带过，让读者知道通过这个命令可以将自己的包发布上npm上。所以我并没有得到一些额外的帮助信息。

看到一篇文章 [《npm adduser的坑》](http://www.tuicool.com/articles/FZbYve)

想起来我确实用过[nrm](https://github.com/Pana/nrm) 这个库改到taobao源了，切换回来就好了
