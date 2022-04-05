---
slug: how-to-resolve-ssh-github-connection-reset-by-peer
title: 通过 ssh 方式访问 github 仓库出现 ssh_exchange_identification read Connection reset by peer 的问题
tags: [git ,github ,ssh]
---

今天在 `git clone` 一个 github 仓库的时候出现了以下错误

```shell
ssh_exchange_identification: read: Connection reset by peer
```

怀疑是代理的原因，试了全局、直连、规则都不行，查找了一些文章有说可以使用以下命令查看详细调试信息

```shell
ssh -vvv -T git@github.com
```

还是不行，在 v2ex 上看到一个楼主说需要加个配置，所以就试了下

在 `~/.ssh/config` 中添加以下配置

```
Host github.com
  Hostname ssh.github.com
  Port 443
```

再试下就可以了
