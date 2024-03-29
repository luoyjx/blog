---
slug: mongodb-migration-from-2_6-to_3_0
title: mongodb从2.6迁移到3.0过程
tags: [mongodb ,升级]
---

总共有这么几个问题需要解决：
1. mongodb3.0版本的二进制包
1. wiredTiger引擎的配置
1. 数据的迁移
1. 权限

## mongodb3.0的二进制包
这个就不用多说了，直接去官网选择对应的系统下载就好
https://www.mongodb.org/downloads
我是centos 6.3，对应的发行版貌似是redhat6.x，所以选择的redhat6 64bit

## wiredTiger引擎的配置
官方给的例子是以yaml形式写的配置，我还是以conf文件形式，所以就在后面追加了一个选项就可以了。当然我是重建的库路径，如果原有的数据路径的话，启用wiredTiger是会报错的。这就是下面要说的一个部分。

```
dbpath=/your/data/path
logpath=/your/log/path
logappend=true
bind_ip = 127.0.0.1
auth = true
port = 27017
journal = true
#fork=true
storageEngine=wiredTiger
```

## 数据的迁移
由于需要换引擎，所以原来的数据不能直接使用了，必须使用`monogodump` 和`mongorestore`两个工具来迁移数据。
具体操作可以参见这篇文章
[通过mongodump和mongorestore实现Mongodb备份和恢复](http://chenzhou123520.iteye.com/blog/1630993)

## 权限
那么将数据导入之后，如果需要设置权限的话，首先是需要admin库中创建一个user的，还是先把`auth=true`给注释掉了，创建个用户，到这里懵逼了一下，提示addUser方法错误，查了一下发现，3.0的用户及权限有些改变。

### 定义
创建一个数据库新用户用db.createUser()方法，如果用户存在则返回一个用户重复错误。


### 语法
db.createUser(user, writeConcern)
* user这个文档创建关于用户的身份认证和访问信息；
* writeConcern这个文档描述保证MongoDB提供写操作的成功报告。

· user文档，定义了用户的以下形式：
```
{ user: "<name>",
  pwd: "<cleartext password>",
  customData: { <any information> },
  roles: [
    { role: "<role>", db: "<database>" } | "<role>",
    ...
  ]
}
```

### user文档字段介绍：
* user字段，为新用户的名字；
* pwd字段，用户的密码；
* cusomData字段，为任意内容，例如可以为用户全名介绍；
* roles字段，指定用户的角色，可以用一个空数组给新用户设定空角色；
   在roles字段,可以指定内置角色和用户定义的角色。

### Built-In Roles[内置角色](http://docs.mongodb.org/manual/reference/built-in-roles/#built-in-roles)：
    1. 数据库用户角色：read、readWrite;
    2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；
    3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
    4. 备份恢复角色：backup、restore；
    5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
    6. 超级用户角色：root
    // 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
    7. 内部角色：__system
    PS：关于每个角色所拥有的操作权限可以点击上面的内置角色链接查看详情。

### writeConcern文档 [官方说明](http://docs.mongodb.org/manual/reference/write-concern/)
* w选项：允许的值分别是 1、0、大于1的值、"majority"、`<tag set>`；
* j选项：确保mongod实例写数据到磁盘上的journal（日志），这可以确保mongd以外关闭不会丢失数据。设置true启用。
* wtimeout：指定一个时间限制,以毫秒为单位。wtimeout只适用于w值大于1。

例如：在products数据库创建用户accountAdmin01，并给该用户admin数据库上clusterAdmin和readAnyDatabase的角色，products数据库上readWrite角色。
```
use products
db.createUser( { "user" : "accountAdmin01",
                 "pwd": "cleartext password",
                 "customData" : { employeeId: 12345 },
                 "roles" : [ { role: "clusterAdmin", db: "admin" },
                             { role: "readAnyDatabase", db: "admin" },
                             "readWrite"
                             ] },
               { w: "majority" , wtimeout: 5000 } )
```
以上是新版本用户、角色、权限的一些说明。

看看我们现在要做的：
先创建个管理员
```
use admin
db.createUser(
  {
    user: "adminuser",
    pwd: "12345678",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```

再创建我们应用库的用户
```
use appdb
db.createUser(
 {
   user: "luoyjx",
   pwd: "12345678",
   roles: [
      { role: "readWrite", db: "appdb" }
   ]
 }
)
```

使用`db.auth(username,pwd)`可以验证一下


创建用户大概到这里了，创建完admin，再创建一个普通用户就基本OK了。

到这里，单实例的mongodb从2.6迁移到3.0就基本完成了。

## TODO
副本集（没有折腾）
