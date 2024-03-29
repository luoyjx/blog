---
id: concurrency-using-waitgroup-in-go
title: 使用 WaitGroup 控制并发
---

```go
package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

func main() {
	// 创建一个 100 个空匿名结构的数组
	var times [100]struct{}
	// 创建一个缓冲长度为 3 的 channel
	conccuryChan := make(chan struct{}, 3)
	// wait group
	var wg sync.WaitGroup
	// 循环 times
	for k := range times {
		// push 一个空数组到 channel 中，当
		conccuryChan <- struct{}{}
		// wait group add 1
		wg.Add(1)

		go func(index int) {
			defer func() {
				// 完成后从 channel 取出一个，下一个可以添加 channel
				<-conccuryChan
			}()
			fmt.Println("=>>>>>>>>>> ", index)
			// 模拟随机时长的逻辑
      		time.Sleep(time.Duration((rand.Intn(3) + 1)) * time.Second)
      		// 标记完成一次
			wg.Done()
		}(k)
	}

	close(conccuryChan)
	wg.Wait()
}

```
