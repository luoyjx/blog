---
slug: npm-versions-upgrade
title: npm 升级版本号技巧
tags: [npm]
---

较新的 npm 版本可以使用一个新特性来自动给你的 package.json 升级版本号。

## 为什么需要这个
有很多时候，我们都要去手动改这个版本号，然后再提交一个 commit ，感觉比较麻烦，而且可能有的开发者没有遵循语义化版本   [semver](https://semver.org/lang/zh-CN/) 的规则，倒是别人在引用的时候会出现奇奇怪怪的问题。

## 这个命令怎么用呢

```shell
// 升级一个小版本号    1.1.1 -> 1.1.2
npm version patch -m " 升级到 %s ，因为修复了 xxx bug "

// 升级一个中版本号    1.1.1 -> 1.2.0
npm version minor -m " 升级到 %s ，因为添加了 xxxx 特性 "

// 升级一个大版本号     1.1.1 -> 2.0.0
npm version major -m " 升级到 %s ，因为有 xxxx 不兼容的特性 "

```

会自动修改 package.json 中的版本号，并添加一个 commit 。
