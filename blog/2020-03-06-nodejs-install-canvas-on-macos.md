---
slug: nodejs-install-canvas-on-macos
title: Mac 环境下 node 安装 canvas@2.6.1 出现错误
tags: [node.js ,macosx ,canvas]
---

Mac 环境下 node 安装 canvas@2.6.1 出现以下错误时

```shell
node: cairo-pattern.c:1127: cairo_pattern_destroy: Assertion failed. none - catched error
```

使用 brew 安装一下以下几个库

```shell
brew install pixman cairo pango
```

不过你可能会遇到 python2.x 升级失败的问题

可以试试

```shell
brew uninstall python@2
brew install python
brew upgrade python
```

升级到 python3.x

来源:
https://github.com/Automattic/node-canvas/issues/1065#issuecomment-373381272
