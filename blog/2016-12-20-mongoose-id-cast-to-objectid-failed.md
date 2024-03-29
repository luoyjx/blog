---
slug: mongoose-id-cast-to-objectid-failed
title: _id 为 String 类型时出现 Mongoose Cast to ObjectId failed 解决方案
tags: [mongoose]
---

```js
{
    "_id" : "Football",
    "ancestors" : [
        "Categories",
        "Sports and fitness"
     ],
     "parent" : "Sports and fitness"
}
```

模型定义如下
```js
var mongoose = require('mongoose');

var Category = mongoose.Schema({
    _id: String
});

var categorySchema = mongoose.Schema({
    ancestors: [Category],
    parent: [Category]
});


//  Initiate database connection
var db = mongoose.createConnection('mongodb://localhost/Categories');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("openDB categories");
});

module.exports.category = db.model('Category', categorySchema);
```

```js
var categoryModel = require('../models/Category');
var Category = categoryModel.category;

exports.getAncestors = function(req, res) {
    if (req.params.id == undefined){res.send("no id specified!"); return;}

    Category.findOne({_id: 'Football'}, 'ancestors', function(err, ancestors){
        if(err) console.log(err);

        res.send(ancestors);
    });
}
```

运行时发生错误
```js
{ message: 'Cast to ObjectId failed for value "Football" at path "_id"',
  name: 'CastError',
  type: 'ObjectId',
  value: 'Football',
  path: '_id' }
```

## 解决方案
mongoose 默认将 `_id` 设为 `ObjectId` 类型。
```js
var categorySchema = mongoose.Schema({
    _id: String,
    ancestors: [{type: String }],
    parent: {type: String}
},{ _id: false });

var Category = mongoose.model( "Category", categorySchema );
```
