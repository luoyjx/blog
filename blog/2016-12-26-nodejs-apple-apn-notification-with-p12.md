---
slug: nodejs-apple-apn-notification-with-p12
title: node.js 苹果 apn 推送 p12 证书使用方式
tags: [node.js ,apns]
---

```js
// "apn": "^2.1.2",
var apn = require('apn');

var service = new apn.Connection(
  "passphrase":"secret",
  "pfx":"/path/to/cert.p12",
  "production":false
});

var apnVoipProvider = new apn.Provider(voipOptions);

apnNotification = new apn.Notification();
apnNotification.badge = 1;
apnNotification.sound = 'msg.mp3';
apnNotification.alert = 'hello';
apnNotification.payload = {
  title: notification.title, id: notificationID, path: notification.path,
};

apnVoipProvider.send(apnNotification, token);
```
