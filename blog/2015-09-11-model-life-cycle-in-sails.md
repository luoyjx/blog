---
slug: model-life-cycle-in-sails
title: sails model 生命周期回调
tags: [node.js ,sails]
---

1、创建时的回调
```
beforeValidate: fn(values, cb)
afterValidate: fn(values, cb)
beforeCreate: fn(values, cb)
afterCreate: fn(newlyInsertedRecord, cb)
```

2、修改的时候回调
```
beforeValidate: fn(valuesToUpdate, cb)
afterValidate: fn(valuesToUpdate, cb)
beforeUpdate: fn(valuesToUpdate, cb)
afterUpdate: fn(updatedRecord, cb)
```

3、销毁的时候回调
```
beforeDestroy: fn(criteria, cb)
afterDestroy: fn(destroyedRecords, cb)
```

如在创建用户的时候对密码机密操作：
```
var bcrypt = require('bcrypt');

module.exports = {
    attributes: {
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true,
            columnName: 'encrypted_password'
        }
    },
    beforeCreate: function (values, cb) {
        bcrypt.hash(values.password, 10, function(err, hash) {
            if(err) return cb(err);
            values.password = hash;
            cb();
        });
    }
};
```
