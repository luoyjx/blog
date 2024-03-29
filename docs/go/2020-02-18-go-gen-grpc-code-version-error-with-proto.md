---
id: go-gen-grpc-code-version-error-with-proto
title: 如何解决 go build 时报了 undefined grpc.SupportPackageIsVersion6 错误
---

# 问题

再使用 `protoc` 文件生成代码前需要安装 `protoc-gen-go` 工具

```shell
go get -u github.com/golang/protobuf/protoc-gen-go
```

这样安装的时候，默认会去找最新的版本。

假如其他人之前写的代码中是用旧版本 `protoc-gen-go` 生成的，那么可能你的版本过高，而 grpc 库的版本过低，从而出现如下错误：

```
undefined: grpc.SupportPackageIsVersion6
```

# 解决方案

经过一些网络搜索和尝试，大致有这么两种方案：

## grpc lib 升级

升级 grpc 库的版本，并将之前的 pb.go 重新生成一遍。
参考 https://github.com/grpc/grpc-go/issues/3347#issuecomment-580922023

## protoc-gen-go 降级

使用如下命令去指定某个 tagged version 进行安装（竟然到处都找不到这种方案，也许是更推荐升级？）

`go get -u -v github.com/golang/protobuf/protoc-gen-go@v1.3.0`
