---
slug: mongoose-plugin-usage
title: 利用 mongoose 的 plugin 减少额外的代码
tags: [mongoose ,plugin]
---

> API 的页面 [Mongoose Plugins](http://mongoosejs.com/docs/plugins.html)

首先来看个例子：

通常的处理办法
```js
// format date
topic.friendly_create_at = tools.formatDate(topic.create_at, true);
topic.friendly_update_at = tools.formatDate(topic.update_at, true);
```
还有
```js
user.friendly_create_at = tools.formatDate(user.create_at, true);
```

反正各种各样的，那么就需要写 N 多次的不同的实现。

那么 mongoose 中的 plugin 怎么帮助我们完成这些事呢？

首先，定义两个用于格式化时间的方法，并导出。

```js
/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */
var tools = require('../common/tools');

module.exports = function(schema) {
  schema.methods.create_at_ago = function() {
    return tools.formatDate(this.create_at, true);
  }

  schema.methods.updated_at_ago = function() {
    return tools.formatDate(this.create_at, true);
  };
}
```

然后将这个 plugin 引入到某个 schema 中。

```js
var mongoose = require('mongoose');
var BaseModel = require("./base_model");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

 var MessageSchema = new Schema({
   has_read: { type: Boolean, default: false },
   create_at: { type: Date, default: Date.now }
 });

 MessageSchema.plugin(BaseModel);
 MessageSchema.index({master_id: 1, has_read: -1, create_at: -1});

 mongoose.model('Message', MessageSchema);
```

再将使用的地方改成如下方式，就可以在业务代码中省去转换的过程。

```js
<a class="reply_time" href="#<%= reply._id %>"><%= indexInCollection + 1 %>楼•<%= reply.friendly_create_at
<a class="reply_time" href="#<%= reply._id %>"><%= indexInCollection + 1 %>楼•<%= reply.create_at_ago()
```
