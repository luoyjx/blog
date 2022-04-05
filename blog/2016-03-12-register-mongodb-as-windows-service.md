---
slug: register-mongodb-as-windows-service
title: 将 mongodb 安装为 windows 服务
tags: [mongodb]
---

将mongodb安装为windows服务。

在`cmd`中cd到mongodb的`bin`目录下，执行以下指令

```
mongod
  --install
  --serviceName MongoDB
  --serviceDisplayName MongoDB
  --logpath D:\MongoDB\logs\MongoDB.log
  --dbpath D:\MongoDB\data
  --directoryperdb
  --journal
  --storageEngine=mmapv1
```
