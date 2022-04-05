---
slug: import-from-sql-file-to-remote-mysql-server
title: mysql 远程导入表结构和数据 .sql 文件
tags: [mysql ,导入数据]
---

比较简单

形式： `mysql -h(...) - uroot -p(...) mydb < sql.sql`

**注意**：mydb库先要存在

```shell
> mysql -h172.16.13.31 -uroot -ppassword live < d:\database\live.sql
```
