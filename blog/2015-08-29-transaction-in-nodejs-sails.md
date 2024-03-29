---
slug: transaction-in-nodejs-sails
title: sails 中使用事务
tags: [sails ,transation]
---

**解决的思路主要还是使用原生的方式打开一个事务。**

下面是在stackoverflow上的一个帖子的答案

http://stackoverflow.com/questions/25079408/how-to-handle-async-concurrent-requests-correctly/25100188#25100188

```js
buyItem: function(req, res) {
  try {
    // Start the transaction
    User.query("BEGIN", function(err) {
      if (err) {throw new Error(err);}
      // Find the user
      User.findOne(req.param("userId").exec(function(err, user) {
        if (err) {throw new Error(err);}
        // Update the user balance
        user.balance = user.balance - req.param("itemCost");
        // Save the user
        user.save(function(err) {
          if (err) {throw new Error(err);}
          // Commit the transaction
          User.query("COMMIT", function(err) {
            if (err) {throw new Error(err);}
            // Display the updated user
            res.json(user);
          });
        });
      });
    });
  }
  // If there are any problems, roll back the transaction
  catch(e) {
    User.query("ROLLBACK", function(err) {
      // The rollback failed--Catastrophic error!
      if (err) {return res.serverError(err);}
      // Return the error that resulted in the rollback
      return res.serverError(e);
    });
  }
}
```

**不过提个建议就是，这种写法的风格不好，建议改成promise方式**。

还有个npm模块是在sails-mysql基础上封装了事务
https://github.com/postmanlabs/sails-mysql-transactions
