---
id: how-to-compile-go-code-into-assembly
title: 如何将程序编译为汇编代码
---

https://colobu.com/2018/12/29/get-assembly-output-for-go-programs/


主要是三种方式：

## 方法一: go tool compile

```
go tool compile -N -l -S once.go
```

## 方法二: go tool objdump
首先先编译程序:

```
go tool compile -N -l once.go
```

使用

```
go tool objdump once.o
```

反汇编出代码 (或者使用 `go tool objdump -s Do once.o` 反汇编特定的函数：)：

## 方法三: go build -gcflags -S
使用
```
go build -gcflags -S once.go
```
也可以得到汇编代码
