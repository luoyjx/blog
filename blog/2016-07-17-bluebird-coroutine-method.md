---
slug: bluebird-coroutine-method
title: bluebird 的 coroutine 方法 (类似 co )
tags: [node.js]
---

# Promise.coroutine

可以像`co`一样包裹generator函数，进行使用yeild的异步操作。

# 使用

```js
Promise.coroutine(GeneratorFunction(...arguments) generatorFunction) -> function
```

# 示例

```js
var Promise = require("bluebird");

function PingPong() {

}

PingPong.prototype.ping = Promise.coroutine(function* (val) {
    console.log("Ping?", val)
    yield Promise.delay(500)
    this.pong(val+1)
});

PingPong.prototype.pong = Promise.coroutine(function* (val) {
    console.log("Pong!", val)
    yield Promise.delay(500);
    this.ping(val+1)
});

var a = new PingPong();
a.ping(0);
Running the example:

$ node test.js
Ping? 0
Pong! 1
Ping? 2
Pong! 3
Ping? 4
Pong! 5
Ping? 6
Pong! 7
Ping? 8
...
```
