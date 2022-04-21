---
id: remove-all-none-images
title: 一次删除所有 <none> 的镜像
---

## 一键删除所有 none 镜像

```shell
docker rmi $(docker images | grep "none" | awk '{print $3}')
```

## 停止 Exited 状态容器
```shell
docker stop $(docker ps -a | grep "Exited" | awk '{print $1 }')
```

## 删除 Exited 状态容器
```shell
docker rm $(docker ps -a | grep "Exited" | awk '{print $1 }')
```