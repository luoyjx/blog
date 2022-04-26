---
id: something-about-mongoose-usage
title: 关于踩到 mongoose 的一个小坑
---

大家都知道 mongodb 是 schemaless，他的好处是可以随便定义字段进行存储。而 mongoose 恰恰和它不同，是有 Schema 的，而这里就会在潜意识中踩到坑了。

mongodb 是文档型的数据库，一条记录是以文档为最小单位，而不像传统的关系型数据库需要预先定义表结构。

而 mongoose 让 mongodb 在存储时加入了 schema 的概念，而其中有一些不起眼的规则恰恰有时候遇到就万万妹想到~
今天碰到的就是这个问题，我在查询一篇文章时，顺便把他的文章作者的实体也查询出来并复制给文章实体时，这时我想要将这个文章对象连带作者缓存起来，而缓存时，他在内部是调用了 toJSON 方法的，默认将 schema 之外的属性给去掉了。

于是今天调了半天都是作者信息 undefined 问题，首先以为缓存出了问题，后来以为查询有问题，最后想到可能由于 `mongoose` 的 `schema` 引起的，查了下 API 果然是。

> option: toObject
	Documents have a toObject method which converts the mongoose document into a plain javascript object. This method accepts a few options. Instead of applying these options on a per-document basis we may declare the options here and have it applied to all of this schemas documents by default.
	To have all virtuals show up in your console.log output, set the toObject option to { getters: true }:

我的解决方案是：

先将 mongoose 的模型对象调用 toObject 方法转换成 javascript 对象，然后再进行属性添加，这时再放入缓存中就可以了。
