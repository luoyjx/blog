---
slug: socketio-auth-module
title: socket.io 认证模块 socketio-auth
tags: [node.js ,socket.io]
---

该模块提供了钩子，实现了socket.io认证。无需使用查询字符串发送凭据，这不是一个良好的安全习惯。&nbsp;

默认情况下它通过标记客户的未认证的并监听的认证事件。如果客户端提供了错误的凭据或不验证它就会断开。当服务器等待连接的客户端进行身份验证，也不会发射任何事件。&nbsp;

用法

要为socket.io连接设置身份验证，只需将服务器套接字和一个配置对象传给socketio-auth：&nbsp;
```js
    var io = require('socket.io').listen(app);

    require('socketio-auth')(io, {
      authenticate: authenticate,
      postAuthenticate: postAuthenticate,
      timeout: 1000
    });
```


所支持的参数是：

authenticate：唯一需要的参数。这是一个函数，它接受客户端发送的数据，并调用一个回调表明，如果认证是成功的：
```js
    function authenticate(data, callback) {
      var username = data.username;
      var password = data.password;

      db.findUser('User', {username:username}, function(err, user) {
        if (err || !user) return callback(new Error("User not found"));
        return callback(null, user.password == password);
      }
    }
```

postAuthenticate：在客户端进行身份验证后才能调用的一个函数。对保持用户和客户端socket之间的联系是非常有用的：
```js
    function postAuthenticate(socket, data) {
      var username = data.username;

      db.findUser('User', {username:username}, function(err, user) {
        socket.client.user = user;
      }
    }
```

timeout：客户端断开连接之前进行身份验证等待的毫秒数。默认值是1000。&nbsp;
客户端只需要确保在连接后进行验证：&nbsp;
```js
    var socket = io.connect('http://localhost');
    socket.on('connect', function(){
      socket.emit('authentication', {client: "John", password: "secret"});
    });
```

该服务器将发射的已认证事件，以确认认证。

作者Github:&nbsp;[socketio-auth][0]

[0]: https://github.com/invisiblejs/socketio-auth
