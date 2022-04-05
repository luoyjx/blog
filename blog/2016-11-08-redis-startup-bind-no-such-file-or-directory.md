---
slug: redis-startup-bind-no-such-file-or-directory
title: 启动 redis 出现 Creating Server TCP listening socket *:6379 bind No such file or directory
tags: [redis]
---

平时直接启动没问题，今天出了这个问题，启动失败，加上配置文件也不行。

```
D:\redis2.8>redis-server.exe
[8264] 08 Nov 09:28:43.943 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server.exe /path/to/redis.conf
[8264] 08 Nov 09:28:43.948 # Creating Server TCP listening socket *:6379: bind: No such file or directory
```

Redis 报错：

```
[6644] 02 Apr 23:11:58.976 # Creating Server TCP listening socket *:6379: bind: No such file or directory
```

的解决方案如下按顺序输入如下命令就可以连接成功
```
1. redis-cli.exe
2. shutdown
3. exit
4. redis-server.exe redis.windows.conf
```
