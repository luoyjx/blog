---
id: cli-connect-with-charset
title: MySQL cli 连接时使用 utf8mb4 之类的 charset 参数
sidebar_position: 1
---

# 使用 MySQL cli 工具时，如果你的 db 中包含 utf8mb4 才支持的字符

```shell
mysql --default-character-set=utf8 -hyourhost -uyourusername -p
```