---
slug: nodejs-module-regexp-build
title: RE-Build：用自然语言去编写正则表达式
tags: [node.js ,regex ,正则表达式]
---

# RE-Build

Build regular expressions with natural language.

# 由来

你是否遇到过这么复杂的正则表达式呢？

```js
var ipMatch = /(?:(?:1\d\d|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.){3}(?:1\d\d|2[0-4]\d|25[0-5]|[1-9]\d|\d)\b/;
```

# 怎么办

使用re-build

```js
var ipNumber = RE.group(
        RE  ("1").then.digit.then.digit
        .or ("2").then.oneOf.range("0", "4").then.digit
        .or ("25").then.oneOf.range("0", "5")
        .or .oneOf.range("1", "9").then.digit
        .or .digit
    ),

    ipMatch = RE.matching.exactly(3).group( ipNumber.then(".") )
                .then(ipNumber).then.wordBoundary.regex;
```

# 安装

通过`npm` ：
`
```shell
npm install re-build
```

通过`bower`

```shell
bower install re-build
```

## 文档

https://github.com/MaxArt2501/re-build
