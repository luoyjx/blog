---
slug: resolve-install-grpc-timeout-in-nodejs-docker-image
title: nodejs 在 build docker 镜像时 grpc 库安装超时的解决办法
tags: [node.js ,grpc]
---

在 Dockerfile 执行命令时，添加以下选项

```dockerfile
FROM node

COPY . .
RUN npm install --grpc_node_binary_host_mirror=https://npm.taobao.org/mirrors/

CMD   ['npm', 'start']
```
