---
slug: golang-slice-index
title: golang 切片初始化时下标的行为
tags: [go ,golang ,slice]
---

使用另外一个数组来初始化切片时，使用到的下标是一个半开区间的玩意儿，比如

```go
package main

import "fmt"

func main() {
	primes := [6]int{2, 3, 5, 7, 11, 13}

	var s []int = primes[1:4]
	fmt.Println(s)
}
```

得到的结果是

```
3,5,7
```
