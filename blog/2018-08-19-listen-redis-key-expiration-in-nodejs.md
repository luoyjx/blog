---
slug: listen-redis-key-expiration-in-nodejs
title: Node.js 中监听 redis key 过期事件
tags: [node.js ,redis]
---

It is in fact possible to listen to the "expired" type keyevent notification using a subscribed client to the specific channel ( and listening to its message event.

通过 `subscribe client` 可以监听 `__keyevent@{db}__:expired` ( `db` 是你传入的配置 ) 频道来接收过期的事件 ,

```js
const redis = require('redis')
const CONF = {db:3}

let pub, sub

// Activate "notify-keyspace-events" for expired type events
pub = redis.createClient(CONF)
pub.send_command('config', ['set','notify-keyspace-events','Ex'], subscribeExpired)

// Subscribe to the "notify-keyspace-events" channel used for expired type events
function subscribeExpired(e, r){
 sub = redis.createClient(CONF)
 const expired_subKey = `__keyevent@${CONF.db}__:expired`

 sub.subscribe(expired_subKey, function () {
  console.log(' [i] Subscribed to "'+expired_subKey+'" event channel : '+r)
  sub.on('message', function (chan, msg){
  	console.log('[expired]', msg)}
  )
  TestKey()
 })
}

//例如，设置一个 key 并设置 10s 超时
function TestKey(){
 pub.set('testing', 'redis notify-keyspace-events : expired')
 pub.expire('testing', 10)
}
```
