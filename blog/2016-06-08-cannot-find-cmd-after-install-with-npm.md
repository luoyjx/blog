---
slug: cannot-find-cmd-after-install-with-npm
title: node.js 全局安装了却找不到这个命令
tags: [node.js ,npm]
---

# 全局安装了无法找到命令

大家都知道，FIS 是要求全局安装的，是因为避免由于 FIS 多版本不同项目目录下而导致编译时有差异，而导致不必要的麻烦。

有些同学可能遇到了

```shell
npm install -g fis
```

命令行执行 `fis` 说找不到这个命令。这时候一般都开始抓瞎了。

解决办法：
* 执行 `npm prefix -g` 会输出全局安装路径
* Windows 用户把输出的路径添加到环境变量 `%PATH%` 里面，环境变量的设置请参考 百度
* 类 Unix 用户把 $(npm prefix -g)/bin 目录设置到 PATH 中。
	* 用 `bash echo -e "export PATH=$(npm prefix -g)/bin:$PATH" >> ~/.bashrc && source ~/.bashrc`
	* 用 `zsh echo -e "export PATH=$(npm prefix -g)/bin:$PATH" >> ~/.zshrc && source ~/.zshrc`
