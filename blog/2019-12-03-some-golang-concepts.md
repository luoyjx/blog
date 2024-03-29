---
slug: some-golang-concepts
title: 在学习 golang 了解到的一些概念的细节
tags: [go]
---

知识一些之前只知道这些名词，但是并不知道这个名词的细节，以下内容仅是个人理解，也可能理解的不到位。

# epoll

这个词之前只是尝尝看到对比

* 同步 IO
* 异步 IO
* 阻塞 IO
* 非阻塞 IO

这几个概念时，会提到的 IO 模型，<del>比如：select、poll、epoll </del> 这里之前描述的有问题，IO 模型中有一种是 IO multiplexing，常译为 IO 多路复用，几种实现是 select、poll、epoll。

而我之前一直不太理解这几个都有啥区别，最近看到知乎的一篇文章，也算大概理解了，可以参考这篇[一个EOF引发的探索之路之四（理解golang的NetFD之I/O多路复用篇）](https://zhuanlan.zhihu.com/p/53687302) 。

真正从代码层面了解到的是，看到的两个关于优化 golang WebSocket 内存占用的文章，使用 epoll 的方式来接收百万级别的长连接。问题出现的原因是，在通常情况下，我们都会为每个连接分配一个 goroutine ，这在一般情况下是没有什么问题的，而且比其他语言的线程级别的实现要轻量高效的多。但是 goroutine 是没有开销的吗？当然不是！根绝不同的平台，每个 groutine 需要 2K ~ 8K 左右的内存开销（在不做任何事情的情况下，参考 https://github.com/golang/go/blob/release-branch.go1.8/src/runtime/stack.go#L64-L82  ），那么这时候，有什么办法优化么？是有的。

## 通过 epoll 是如何优化的
通过文章中的代码优化示例（https://github.com/eranyanay/1m-go-websockets/blob/master/4_optimize_gobwas/epoll.go  ），我们可以了解到，epoll 方式的是通过接收请求时获取 net.Conn 连接的 fd (File descriptor，具体的值其实是个 int 的值) 文件描述符，然后将文件描述符注册到 epoll 中，每当这个文件描述符所对应的连接有新的数据发送过来时，则会触发我们注册 epoll 时，选择监听的事件，这时，我们再通过这些触发事件的列表信息中的 fd 获取对应的连接，获取到这些连接之后，就可以去获取连接中接收到的数据了。这样只在连接没有任何数据时，并不需要一个固定的 goroutine 的开销。

## 引申的一些东西
由于涉及到了 net.Conn ，想到了 http 长连接怎么去处理 net.Conn，这时查到了一篇关于请求拦截的文章，参看 https://colobu.com/2016/07/01/the-complete-guide-to-golang-net-http-timeouts/。

还有另外的一些：
* [Accessing the underlying socket of a net/http response](https://stackoverflow.com/questions/29531993/accessing-the-underlying-socket-of-a-net-http-response)


# zero-copy
意思是**零拷贝**，这个概念我一开始怎么也猜不到是怎么样实现的，直到看了内存优化的这篇文章 [A Million WebSockets and Go](https://www.freecodecamp.org/news/million-websockets-and-go-cc58418460bb/) 的 3.4 节，发现也不是说完全不用内存，内存还是要的，只是说开辟一块很小的空间，重复利用，但是不对 http 中的原始内容复制到一块新的内存上去再处理，只是每次写入这一块小空间，处理完之后就直接重置这块内存空间，从而达到零拷贝的目的。

# fd - File descriptor - 文件描述符
维基百科的解释可参考 https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E6%8F%8F%E8%BF%B0%E7%AC%A6，
另外一篇讲的还算是具体一点的是这篇 http://c.biancheng.net/view/3066.html


# 相关链接
* WebSocket Frame https://tools.ietf.org/html/rfc6455#section-5.2
* https://github.com/mailru/easygo
