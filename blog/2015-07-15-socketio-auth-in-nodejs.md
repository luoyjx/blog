---
slug: socketio-auth-in-nodejs
title: 简要分析socketio-auth
tags: [socket.io ,socketio-auth ,权限控制]
---

# 为什么写这篇
看到不少noder在问socket.io如何控制权限这类问题，想到去年在echojs还是HackerNews上看到的socketio-auth模块，还是一定程度上解决这类问题的，尽管它的实现相当简单，但至少提供了一个思路。

# socketio-auth是啥
也不详细介绍了，原文在这里[《socket.io认证模块socketio-auth》](http://blog.gaoqixhb.com/p/5441fc233ca0d27a07391949)

# 大致验证过程

## 1.为socket.io挂上模块
```js
var io = require('socket.io').listen(app);

require('socketio-auth')(io, {
	authenticate: authenticate,
	postAuthenticate: postAuthenticate,
	timeout: 1000
});
```
**参数**
* `authenticate`  验证用户身份，比如在这里查询数据库，对比用户信息，成功后标记，然后调用下面的`postAuthenticate`函数
* `postAuthenticate` 在验证成功后的处理，你可以做一些你爱做的事，比如买衣服什么的:)
* `timeout`  超时时间，等待用户验证的时间毫秒数，超过这个时间就会强制断开了

在这个过程干了这么几件事：
* 将所有namespace的连接全部清除一遍
https://github.com/invisiblejs/socketio-auth/blob/master/lib%2Fsocketio-auth.js#L23
* 给socket.io绑定`connection`事件处理
* 在`connection`事件内部监听`authentication`事件，这个事件是需要客户端来触发的。
* 从`connection`事件触发时开始，使用计时经过timeout时间后如果还没有标记为已验证，就主动断开连接。

这里主要是注册事件做准备工作。

## 2.客户端连接并进行验证
客户端在连接后，emit一个`authentication`事件并附带验证信息。
这时就会进入到验证流程里了，首先将信息传入`authenticate`方法里进行诸如查DB的验证过程。
```js
// 验证
config.authenticate(data, function(err, success) {
	if (success) {
	  debug('Authenticated socket %s', socket.id);
	  socket.auth = true;

	  ...
	} else if (err) {
	  ...
	} else {
	  ...
	}

});

// 验证的实现
function authenticate(data, callback) {
  var username = data.username;
  var password = data.password;

  db.findUser('User', {username:username}, function(err, user) {
  if (err || !user) return callback(new Error("User not found"));
  	return callback(null, user.password == password);
  }
}
```
回调时看是否成功，成功就可以对连接进程标记了（稍后就不会被强制断开）。

成功时会调用`postAuthenticate`函数，比如将user信息绑定到连接或者其他的什么，总之，这个不是必须的。

## 3.返回状态给客户端
成功
```js
socket.emit('authenticated', success);
```

失败
```js
//error
socket.emit('unauthorized', {message: err.message}, function() {
	socket.disconnect();
});

//fail
socket.emit('unauthorized', {message: 'Authentication failure'}, function() {
	socket.disconnect();
});

```
后续任由客户端发挥了。

## 4.服务端还有一件小事要完成
那就是在timeout时间过后判断是否已验证，否则强制断开连接。
```js
setTimeout(function() {
  // If the socket didn't authenticate after connection, disconnect it
  if (!socket.auth) {
	debug('Disconnecting socket %s', socket.id);
	socket.disconnect('unauthorized');
  }
}, timeout);
```

# 完....
https://github.com/invisiblejs/socketio-auth

# 追加
[@Pana](https://cnodejs.org/user/Pana) 分享了另外两个也一并列出，有待研究
[socketio-jwt](https://github.com/auth0/socketio-jwt)
[session.socket.io](https://github.com/wcamarao/session.socket.io)
