---
slug: create-user-and-grant-sql-in-mysql
title: mysql 创建用户及授权命令操作
tags: [mysql ,命令行]
---

# 创建用户

命令: `CREATE USER 'username'@'host' IDENTIFIED BY 'password'; `

说明:
`username` - 你将创建的用户名,
`host` - 指定该用户在哪个主机上可以登陆,如果是本地用户可用localhost, 如果想让该用户可以从任意远程主机登陆,可以使用通配符%.
`password` - 该用户的登陆密码,密码可以为空,如果为空则该用户可以不需要密码登陆服务器.

例子:
```sql
CREATE USER 'dog'@'localhost' IDENTIFIED BY '123456';
CREATE USER 'pig'@'192.168.1.101_' IDENDIFIED BY '123456';
CREATE USER 'pig'@'%' IDENTIFIED BY '123456';
CREATE USER 'pig'@'%' IDENTIFIED BY '';
CREATE USER 'pig'@'%';
```

# 授权

命令: `GRANT privileges ON databasename.tablename TO 'username'@'host' `

说明:
`privileges` - 用户的操作权限,如SELECT , INSERT , UPDATE 等(详细列表见该文最后面).如果要授予所的权限则使用ALL.;
`databasename` - 数据库名,tablename-表名,如果要授予该用户对所有数据库和表的相应操作权限则可用*表示, 如*.*.

例子:
```sql
GRANT SELECT, INSERT ON test.user TO 'pig'@'%';
GRANT ALL ON *.* TO 'pig'@'%';
```

注意:用以上命令授权的用户不能给其它用户授权,如果想让该用户可以授权,用以下命令:
```sql
GRANT privileges ON databasename.tablename TO 'username'@'host' WITH GRANT OPTION;
```
