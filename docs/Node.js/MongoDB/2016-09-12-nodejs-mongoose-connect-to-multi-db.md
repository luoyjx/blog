---
id: nodejs-mongoose-connect-to-multi-db
title: mongoose 连接多个 db，而不是多个host的写法
---

连接副本集的方式很好写，在url写多个host和port即可。

连接多个db呢？

只能创建多个连接了，以mongoose为例，使用不同的模型绑定不同的连接，再统一导出模型对象

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema1 = new Schema({ name: String });
var schema2 = new Schema({ num: Number});
var conn1 = mongoose.createConnection("mongodb://localhost/A 表 ");
var conn2 = mongoose.createConnection("mongodb://localhost/B 表 ");
var model1 = conn1.model('model1',schema1);
var model2 = conn2.model('model2',schema2);

var assert = require('assert');
var doc1=new model1({name:'doc1'});
doc1.save(function(err){
  assert.equal(null,err);
});
var doc2=new model2({num:2});
doc2.save(function(err){
  assert.equal(null,err);
});
```
