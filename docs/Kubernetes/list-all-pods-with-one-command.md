---
id: list-all-pods-with-one-command
title: k8s kubectl 如何一次查看所有 pod 的日志输出
---

## 查询需要看日志的 pod 列表

```shell
kubectl get pod | grep api

// output
api-55f5d8d49d-kzmcj                                              1/1     Running     3          5d
api-55f5d8d49d-r59k8                                              1/1     Running     3          5d
api-55f5d8d49d-xzf9z                                              1/1     Running     3          5d
api-55f5d8d49d-zk472                                              1/1     Running     3          5d
```

## 查询 Pod 描述信息 （如果你知道它有某些标识性的 Label 也可以忽略这步）

```shell
kubectl describe pod api-55f5d8d49d-kzmcj

// output

Name:         api-55f5d8d49d-kzmcj
Namespace:    default
Priority:     0
Node:         172.16.6.7/172.16.6.7
Start Time:   Wed, 07 Apr 2021 15:16:36 +0800
Labels:       app=api
              configAppliedTime=20210407070043
              enable=true
              pod-template-hash=55f5d8d49d
              version=pro

... 后面省略
```

可以看到 label 有 `app=api`

## 查询多个 pod 日志

```shell
kubectl logs -f -l app=api --all-containers
```
