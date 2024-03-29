---
slug: git-commands
title: git 命令速查表！
tags: [git ,git教程]
---

# 基本

`git add` 添加
`git commit -m "xxx"`   注释提交
`git log`  提交日志
`git log --pretty=oneline`  提交日志在一行显示
`git reset --hard HEAD~1` 回退到上一个提交
`git reset --hard 467dcab` 回到某个commit
`git reflog` 查看命令历史
`git checkout -- file` 丢弃工作区修改
`git rm` 删除一个文件


# 暂存工作区
`git stash` 当前工作现场“储藏”起来
`git stash pop` 恢复并删除stash内容
`git stash apply` 恢复
`git stash drop` 删除stash内容
`git stash list` 列出stash列表

# 分支管理

```shell
git branch 查看分支
git branch `<name>` 创建分支
git checkout `<name>` 切换分支
git checkout -b `<name>` 创建+切换分支
git merge `<name>` 合并某分支到当前分支
git branch -d `<name>` 删除分支
git branch -D name 强行删除分之
git checkout -b dev origin/dev 创建远程分之到本地
git pull 从远程分之拉取
git branch --set-upstream dev origin/dev 指定本地dev分支与远程origin/dev分支的链接
```

# 创建分支，修改代码，合并并删除分支过程
```shell
git checkout master          切换到主分支
git checkout -b bug-001    创建bug-001分之
git add file                         添加文件
git commit -m "fix bug 001"   提交文件并注释
git checkout master               切换到主分支
git merge --no-ff -m "merge bug fix 001" bug-001   bug-001分之合并到当前分支
git branch -d bug-001            删除bug分支
```

# 标签管理
```shell
git tag 列出标签
git tag v1 打一个新标签
git tag v1 6224937 给某次提交打tag
git tag -a v1 -m "tag desc"  6224937  指定某一标签打tag并注释
git show v1 看到文字说明
git tag -d v1 删除标签
git push origin tagname 推送标签到远程仓库
git push origin --tags 一次推送所有本地未推送标签
git push origin :refs/tags/tagname 删除远程标签
```