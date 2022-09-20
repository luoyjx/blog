---
slug: golang-generics
title: 学习 Golang 的泛型
tags: [go ,generics]
---

## 前置依赖

### 升级 go 1.18
  - 1. 通过命令行下载
    - `go install golang.org/dl/go1.18@latest`
    - `go1.18 download`
    - `go1.18 version`
  - 2. 直接下载安装包
    - https://go.dev/doc/install
### 支持的代码编辑器

## 语法

### 泛型函数

#### 可对比
- 定义 `func A[K comparable](m, n K) K {}`
- 使用 `A[string]("abc", "def")`

#### 枚举
- 定义 `func B[V int64 | float64](m, n V) V {}`
- 使用 `B[int64](123, 456)`
<!--truncate-->
``` go
func bar[K comparable, V int64 | float64](m map[K]V) V {
  // do something...
}
```
#### 类型推断

- 输入参数已有明确类型时，支持类型推断
- 调用函数时，可省略类型声明
``` go
ints := []int64{123,456}
B(ints[0], ints[1])
```
### 泛型类型

#### 枚举

``` go
type Number interface {
  int64 | float64
}
```

在函数泛型参数中使用自定义泛型类型

``` go
func B[V Number](m, n V) V {
  // ...
}
```