---
id: max-min-value-of-integer-types-in-go
title: 各个整数类型的 Max Min 值
---

The germane part:

Since integer types use two's complement arithmetic, you can infer the min/max constant values for int and uint. For example,

```go
const MaxUint = ^uint(0) // 异或运算
const MinUint = 0
const MaxInt = int(MaxUint >> 1)  // 干掉符号位
const MinInt = -MaxInt - 1
```

```go
uint8  : 0 to 255
uint16 : 0 to 65535
uint32 : 0 to 4294967295
uint64 : 0 to 18446744073709551615
int8   : -128 to 127
int16  : -32768 to 32767
int32  : -2147483648 to 2147483647
int64  : -9223372036854775808 to 9223372036854775807
```

From: https://stackoverflow.com/a/6878625/4830933
