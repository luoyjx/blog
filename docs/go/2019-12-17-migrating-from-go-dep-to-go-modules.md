---
id: migrating-from-go-dep-to-go-modules
title: golang 依赖管理从 dep 迁移到 go modules
---

从 `Dep` 迁移到 `Go Modules` 还挺方便的。

# 步骤
按照如下步骤：

1. 执行 `go version` 确保你的 go 版本在 11 或更高
1. 将你的代码移动到  `GOPATH` 之外 并设置 ` export GO111MODULE=on`
1. `go mod init [module path]` 这个会从你的 Gopkg.lock 文件中读取依赖
1. `go mod tidy` 这个会移除一些你不需要的依赖
1. `rm -rf vendor/` 你可以选择性的删除掉 vendor 目录
1. `go build` 测试有一下是否成功
1. `rm -f Gopkg.lock Gopkg.toml` 最后你可以删除掉你的 dep 依赖文件了

go 读取了 Dep 的依赖文件 `Gopkg.lock` 然后创建了一个 `go.mod` 文件

你如果需要保留 vendor 目录，你可以执行以下命令

1. 执行 `go mod vendor` 拷贝你的依赖到 vendor 目录
1. 执行 `go build -mod=vendor` 确保编译时使用 vendor 目录
