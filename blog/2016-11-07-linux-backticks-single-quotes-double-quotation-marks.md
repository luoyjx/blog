---
slug: linux-backticks-single-quotes-double-quotation-marks
title: Linux Shell 中的反引号，单引号，双引号
tags: [linux ,shell]
---

## 概念
反引号位 (\`) 位于键盘的 Tab 键的上方、1 键的左方。注意与单引号 (\') 位于 Enter 键的左方的区别。
在 Linux 中起着命令替换的作用。命令替换是指 shell 能够将一个命令的标准输出插在一个命令行中任何位置。

如下，shell 会执行反引号中的 date 命令，把结果插入到 echo 命令显示的内容中。

```shell
[root@localhost sh] $ echo The date is \`date\`
The date is 2011年 03月 14日 星期一 21:15:43 CST
```

单引号、双引号用于用户把带有空格的字符串赋值给变量事的分界符。
```shell
[root@localhost sh] $ str="Today is Monday"
[root@localhost sh] $ echo $str
Today is Monday
```

如果没有单引号或双引号，shell 会把空格后的字符串解释为命令。
```shell
[root@localhost sh] $ str=Today is Monday
bash: is: command not found
```

单引号和双引号的区别。单引号告诉 shell 忽略所有特殊字符，而双引号忽略大多数，但不包括 $、\、`。
```shell
[root@localhost sh] $ testvalue=100
[root@localhost sh] $ echo 'The testvalue is $testvalue'
The testvalue is $testvalue
[root@localhost sh] $ echo "The testvalue is $testvalue"
The testvalue is 100
```

## 场景
我在使用 gitlab 时，使用 shell runner 时，将对应的变量放在了一个单引号的命令中，但是其中的变量始终不替换，后来换成双引号就好了，所以查了一下 linux 下单引号双引号的区别。
