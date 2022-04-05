---
slug: upgrade-openssl-on-linux
title: linux 上 openssl 升级
tags: [linux ,openssl]
---

# 查看版本
先查看下自己机器上的 OpenSSL 版本。
```shell
openssl version
```

```shell
cd /usr/local/src/
wget http://www.openssl.org/source/openssl-1.0.1g.tar.gz
tar -zxvf openssl-1.0.1g.tar.gz
cd  openssl-1.0.1g
./config shared zlib
make && make install
```

# 修改历史的OpenSSL文件设置备份

```shell
mv /usr/bin/openssl /usr/bin/openssl.old
mv /usr/include/openssl /usr/include/openssl.old
```

# 设置软连接使其使用新的OpenSSL版本 刚刚安装的OpenSSL默认安装在/usr/local/ssl
```shell
ln -s /usr/local/ssl/bin/openssl /usr/bin/openssl
ln -s /usr/local/ssl/include/openssl /usr/include/openssl
```

# 更新动态链接库数据
```shell
echo "/usr/local/ssl/lib" >> /etc/ld.so.conf
ldconfig -v
```

我们再来看看 OpenSSL 版本信息.

1
2
3

```shell
openssl version
```

# OpenSSL 1.0.1g 7 Apr 2014

如果是 1.0.1g，说明你安装正确了
