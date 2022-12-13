---
slug: cli-tool-tldr
title: 帮你记住终端命令的命令行工具 tldr
tags: [cli, tldr, tool]
---

在本地开发环境或者服务器上尝尝忘记了一些常见命令的参数用法，特别是参数比较多的时候，不经常用的话老容易忘记。

先让我们来看看效果

![tldr.png](/img/cli-tldr.png)

<!--truncate-->

以下是项目的地址：

https://github.com/tldr-pages/tldr

## 如何安装

### 通过 Node.js 的 npm 方式安装
```bash
npm install -g tldr
```

### 通过 Python 的 pip3 方式安装
```bash
pip3 install tldr
```

## 使用
我个人是通过 npm 安装的，所以我下面以 npm 命令的方式来介绍。

基本使用，比如我们想使用 `gzip` 这个命令又不记得参数是什么了，使用 `tldr gzip` 试试。

```bash
➜  ~ tldr gzip

  gzip

  Compress/uncompress files with gzip compression (LZ77).
  More information: https://www.gnu.org/software/gzip/manual/gzip.html.

  - Compress a file, replacing it with a gzipped compressed version:
    gzip file.ext

  - Decompress a file, replacing it with the original uncompressed version:
    gzip -d file.ext.gz

  - Compress a file, keeping the original file:
    gzip --keep file.ext

  - Compress a file specifying the output filename:
    gzip -c file.ext > compressed_file.ext.gz

  - Decompress a gzipped file specifying the output filename:
    gzip -c -d file.ext.gz > uncompressed_file.ext

  - Specify the compression level. 1=Fastest (Worst), 9=Slowest (Best), Default level is 6:
    gzip -9 -c file.ext > compressed_file.ext.gz
```

如果你想要查看更多的命令，可以使用 `tldr -l` 命令。

```bash
tldr -l
```

这基本够用了，但是我还想再懒一点，命令的解释我想要中文的，咋办？

### 语言设置

找到 `tldr` 官方的 npm 包的仓库，https://github.com/tldr-pages/tldr-node-client#usage 。

:::note 设置语言

It is suggested that the LANG environment variable be set system-wide if this isn't already the case. Users without sudo access can set it locally in their ~/.profile.

- LANG=zh tldr command

:::

```bash
➜  ~ LANG=zh tldr ping

  ping

  向网络主机发送 ICMP 回显请求数据包。
  更多信息：https://ss64.com/osx/ping.html.

  - Ping 指定的主机：
    ping 主机

  - 对主机执行指定定次数的 ping 操作：
    ping -c 次数 主机

  - ping 主机 , 指定请求之间的间隔（以秒为单位）（默认为 1 秒）：
    ping -i 秒 主机

  - Ping 主机, 但不尝试查找地址的符号名：
    ping -n 主机

  - ping 主机 并在收到数据包时响铃（如果您的终端支持）：
    ping -a 主机

  - ping 主机 并打印接收数据包的时间（此选项是 Apple 的附加项）：
    ping --apple-time 主机
```

### 设置别名

如果你觉得这个名字我记不住，`tldr` 第一眼看也不知道啥意思，我自己第一眼看到这个名字，以为是 `Too Long, Dont Read` 的缩写 😆 。

其实可以做一个别名，比如 `help ping` 这样，是不是好多了。

我使用的是 zsh，所以我是在 `~/.zshrc` 中添加了如下一行。

```bash
alias help='LANG=zh tldr'
```

然后执行 `source ~/.zshrc` 使其生效。

然后就可以使用 `help ping` 来查看命令的帮助了。

希望对你有帮助 😋