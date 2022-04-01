---
slug: nodejs-mongodb-auth
title: nodejs 连接 mongodb 使用认证配置
tags: [node.js ,mongodb]
---

nodejs中使用默认方式连接mongodb时，很多例子包括github上给出的demo示例，都只是简单的给出了在mongodb非认证情况下的连接配置。

但是我在给mongodb加入了auth参数启动之后要怎么来在nodejs中配置才行呢？

这个问题真是折腾了几个钟头，因为我是用的是generic-pool的，好似有点绕了一个弯。

我再查资料无果的情况下，把mongodb的源代码打开来看了看，发现确实是有认证的方法的。
```js
    /**
     * Authenticate a user against the server.
     * authMechanism
     * Options
     *  - **authMechanism** {String, default:MONGODB-CR}, The authentication mechanism to use, GSSAPI or MONGODB-CR
     *
     * @param {String} username username.
     * @param {String} password password.
     * @param {Object} [options] the options
     * @param {Function} callback this will be called after executing this method. The first parameter will contain the Error object if an error occurred, or null otherwise. While the second parameter will contain the results from authentication or null if an error occurred.
     * @return {null}
     * @api public
     */
    Db.prototype.authenticate = function(username, password, options, callback) {
      var self = this;

      if(typeof options == 'function') {
        callback = options;
        options = {};
      }

      // Set default mechanism
      if(!options.authMechanism) {
        options.authMechanism = 'MONGODB-CR';
      } else if(options.authMechanism != 'GSSAPI'
        &amp;&amp; options.authMechanism != 'MONGODB-CR'
        &amp;&amp; options.authMechanism != 'MONGODB-X509'
        &amp;&amp; options.authMechanism != 'PLAIN') {
          return callback(new Error("only GSSAPI, PLAIN, MONGODB-X509 or MONGODB-CR is supported by authMechanism"));
      }

      // the default db to authenticate against is 'this'
      // if authententicate is called from a retry context, it may be another one, like admin
      var authdb = options.authdb ? options.authdb : self.databaseName;
      authdb = options.authSource ? options.authSource : authdb;

      // Callback
      var _callback = function(err, result) {
        if(self.listeners("authenticated").length &gt; 9) {
          self.emit("authenticated", err, result);
        }

        // Return to caller
        callback(err, result);
      }

      // If classic auth delegate to auth command
      if(options.authMechanism == 'MONGODB-CR') {
        mongodb_cr_authenticate(self, username, password, authdb, options, _callback);
      } else if(options.authMechanism == 'PLAIN') {
        mongodb_plain_authenticate(self, username, password, options, _callback);
      } else if(options.authMechanism == 'MONGODB-X509') {
        mongodb_x509_authenticate(self, username, password, options, _callback);
      } else if(options.authMechanism == 'GSSAPI') {
        //
        // Kerberos library is not installed, throw and error
        if(hasKerberos == false) {
          console.log("========================================================================================");
          console.log("=  Please make sure that you install the Kerberos library to use GSSAPI                =");
          console.log("=                                                                                      =");
          console.log("=  npm install -g kerberos                                                             =");
          console.log("=                                                                                      =");
          console.log("=  The Kerberos package is not installed by default for simplicities sake              =");
          console.log("=  and needs to be global install                                                      =");
          console.log("========================================================================================");
          throw new Error("Kerberos library not installed");
        }

        if(process.platform == 'win32') {
          mongodb_sspi_authenticate(self, username, password, authdb, options, _callback);
        } else {
          // We have the kerberos library, execute auth process
          mongodb_gssapi_authenticate(self, username, password, authdb, options, _callback);
        }
      }
    };
```

这是认证部分的源码，于是我在new了一个Db对象之后接着就调用了认证方法，结果在使用查询还是提示没有认证，这就奇怪了，又找了半天，在CNODE上有个帖子的一个评论里看到了答案，应该是在open之后返回db实例之后再去调用authenticate方法来进行认证，看来是我加错了位置。

由于我使用的是generic-pool，所以这个就是需要在create方法里加上，附上代码：
```js
    global.pool = poolModule.Pool({
        name     : 'mongoPool',
        create   : function(callback) {
            var mongodb = Db();
            mongodb.open(function (err, db) {
                db.authenticate(settings.username,settings.password ,function(){
                    callback(err, db);
                });
            });
        },
        destroy  : function(mongodb) {
            mongodb.close();
        },
        max      : 20,
        min      : 5,
        idleTimeoutMillis : 30000,
        log      : false
    });
```

记住，千万是在open之后返回的db实例再进行认证，别问我是谁，我叫雷锋。

参考地址：

https://cnodejs.org/topic/519e01c563e9f8a542fa68f9#51c2bd8773c638f3703eac1a


