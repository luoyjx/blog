---
slug: speed-up-installation-electron-by-npm
title: npm 安装 Electron 缓慢网络超时导致失败
tags: [npm ,electron]
---

1. npm源过慢的话，可以把源切到国内的淘宝的镜像上。

```shell
npm config set registry https://registry.npm.taobao.org
```

2. 到electron的国内镜像下载最新的安装包，主要看好自己系统对应的版本

`https://npm.taobao.org/mirrors/electron`

3. 将下载好的包放到当前用户的根目录下的.electron文件夹下，windows一般是C:\Users\YourUserName\.electron

4. 执行安装命令 `npm install electron-prebuilt -g`
