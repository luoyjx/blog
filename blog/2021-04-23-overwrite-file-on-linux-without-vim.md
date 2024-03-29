---
slug: overwrite-file-on-linux-without-vim
title: linux 技巧如何在没有 vim 的情况下覆盖 debain 源配置文件
tags: [linux ,debain]
---

## apt-get update 很慢
比如现在遇到情况是我通过以下命令想装个 `curl` 或者 `telnet` 之类的工具

```shell
apt-get update && apt-get install -y curl
```

这时，如果你的默认源是官方的，在国内可能是比较慢的，比如我的服务器在阿里云上的话，那么阿里云的源肯定是比较快的。

<!--truncate-->

## 没有 vi(m) 怎么办，使用 EOF
但是问题来了，我这系统镜像里也没有 vim 或者 vi ，怎么办？

解决办法就是使用 EOF 来操作。假设当前是 `debain 10 `

简单讲讲怎么知道现在系统是啥版本

```shell
$ cat /etc/issue
```

可以看到输出

```shell
Debian GNU/Linux 10 \n \l
```

来替换源

```shell
$ cat << EOF > /etc/apt/sources.list // 回车后粘贴源列表
> deb http://mirrors.cloud.tencent.com/debian/ buster main non-free contrib
> deb http://mirrors.cloud.tencent.com/debian-security buster/updates main
> deb http://mirrors.cloud.tencent.com/debian/ buster-updates main non-free contrib
> deb http://mirrors.cloud.tencent.com/debian/ buster-backports main non-free contrib

> deb-src http://mirrors.cloud.tencent.com/debian-security buster/updates main
> deb-src http://mirrors.cloud.tencent.com/debian/ buster main non-free contrib
> deb-src http://mirrors.cloud.tencent.com/debian/ buster-updates main non-free contrib
> deb-src http://mirrors.cloud.tencent.com/debian/ buster-backports main non-free contrib
> EOF // 粘贴完再回车后输入 EOF 再按回车
```

这时候再执行下面的命令就比较快了

```shell
apt-get update && apt-get install -y curl
```

## 最后
希望有帮到你
