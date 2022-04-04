---
slug: nodejs-rabbitmq-reconnection
title: node.js rabbitmq(amqplib) 断线重连
tags: [node.js ,rabbitmq ,amqp ,amqplib]
---

# rabbitmq
我用的是[**amqplib**](https://www.npmjs.com/package/amqplib) 这个包，github上的项目名是[**amqp.node**](https://github.com/squaremo/amqp.node)

这个包貌似是没有实现断线自动重连的，看了看issues，也和我自己实现的版本差不多。

# 思路

思路主要是两个地方：
1. connection实例的`error`事件.
2. 初始化的promise链报错.

针对这两种情况都去尝试重新连接，因为可能不能立即恢复，所以得隔一段事件重连一次，直到恢复为止。

# 封装实现

```js
/**
 * Mq Factory
 * @authors yanjixiong
 * @date    2016-07-22 09:56:19
 */

var Connection = require('./Connection');
var Channel = require('./Channel');
var Exchange = require('./Exchange');
var Queue = require('./Queue');
var Consume = require('./Consume');
var ExchangeTypes = require('../constant').ExchangeTypes;
var RouteKey = require('../constant').RouteKey;

var config = require('../../config');
var log = require('../../common/logger').getLogger('Core:mq:index');

var ROUTE_KEY = RouteKey.RECEIVE_PA;
var QUEUE_NAME = RouteKey.RECEIVE_PA; // 队列名称

function MQ() {
	this.connection = null;
	this.init();
}

/**
 * 初始化消息队列
 * @return {[type]} [description]
 */
MQ.prototype.init = function init() {
	var self = this;

	// 创建连接
	Connection
		.createConnection(config.rabbitMQ_url)
		.then(function (conn) {

			// 实例中存储当前连接
			self.connection = conn;

			// 监听连接错误
			conn.on('error', function(err) {
				log.error('[mq] connection error ', err);
				self.reconnect();
			});

			log.info('[mq] create connection success');

			// 创建通道
			return Channel
				.createChannel(conn);
		})
		.then(function (ch) {

			// 进程被杀死关闭连接
			process.once('SIGINT', function() {
				log.info('kill by signal SIGINT');
				ch.close();
				self.connection.close();
				self.connection = null;
				process.exit(0);
			});

			ch.on('error', function(error) {
				// ch.close();
				log.error('[mq] channel error: ', error);
			});

			log.info('[mq] create channel success');

			// 创建交换机
			return Exchange
				.assertExchange(ch, config.exchange_name, ExchangeTypes.DIRECT, {durable: false})
				.then(function () {
					log.info('[mq] assert exchange [%s] [%s]', config.exchange_name, ExchangeTypes.DIRECT);

					// 创建队列
					return Queue
						.assertQueue(ch, QUEUE_NAME, {exclusive: false, durable: false}); // exclusive 是否排它 durable : 是否持久化
				})
				.then(function (queue) {
					log.info('[mq] assert queue [%s] success', QUEUE_NAME);

					log.debug(queue);

					// 绑定队列到交换机
					return Queue.
						bindQueue(ch, QUEUE_NAME, config.exchange_name, ROUTE_KEY);
				})
				.then(function() {
					log.info('[mq] bind queue [%s] to exchange [%s]', QUEUE_NAME, config.exchange_name);

					// 消费
					return Consume
						.consume(self.connection, ch, QUEUE_NAME);
				})
		})
		.catch(function (err) {
			log.error('[mq] Init failed , error: ', err);
			self.reconnect();
		});
};

/**
 * 重新连接
 * @return {[type]} [description]
 */
MQ.prototype.reconnect = function() {
	var self = this;

	log.info('[mq] try reconnect 3 seconds later');

	setTimeout(function () {
		self.init();
		self.reconnectCount++;
	}, 3000);
}

/**
 * 获取连接
 * @return {[type]} [description]
 */
MQ.prototype.getConnection = function getConnection() {
	var self = this;

	if (this.connection) {
		return Promise.resolve(self.connection);
	} else {
		return Connection
			.createConnection(config.rabbitMQ_url)
			.then(function (conn) {
				// 实例中存储当前连接
				self.connection = conn;

				// 进程被杀死关闭连接
				process.once('SIGINT', function() {
					log.info('kill by signal SIGINT');
					conn.close();
					self.connection = null;
					process.exit(0);
				});

				log.info('[mq] create connection success');

				return Promise.resolve(conn);
			});
	}
}

module.exports = MQ;
```
