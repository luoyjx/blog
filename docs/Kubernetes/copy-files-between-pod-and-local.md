---
id: copy-files-between-pod-and-local
title: 在 K8s Pod 和本地之间拷贝文件
---

# 语法

```shell
kubectl cp <文件源路径> <文件目标路径>
```

## 从本地拷贝到 Pod 中

源路径：本地文件
目标路径：Pod 中的路径

```shell
kubectl cp /tmp/test.txt some-service-pod:/tmp/test.txt
```

## 从 Pod 中拷贝到本地

源路径：Pod 中的路径
目标路径：本地文件

```shell
kubectl cp some-service-pod:/tmp/test.txt /tmp/test.txt
```