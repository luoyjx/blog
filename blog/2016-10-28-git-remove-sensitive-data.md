---
slug: git-remove-sensitive-data
title: git 提交了一些敏感信息，如何进行彻底删除
tags: [git]
---

如果自己一个不小心的提交了一些敏感的信息到 git 上面，

而自己的项目有可能被其他人看到，如果查看历史记录还是能看到自己提交那些文件。那么如果彻底从历史记录中的删除这些文件 操作是在 Linux 下面做的 :

```shell
git filter-branch --index-filter 'git rm --cached --ignore-unmatch db.properties*' --prune-empty --tag-name-filter cat -- --all
git push origin master --force
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now
git gc --aggressive --prune=now
```
