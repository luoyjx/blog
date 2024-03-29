---
slug: revert-multi-commits-by-one-command
title: git revert 一次 revert 多个 commit
tags: [git]
---

# 场景
假如git commit 链是
```
A -> B -> C -> D
```

如果想把B，C，D都给revert，除了一个一个revert之外，还可以使用range revert
```
git revert B^..D 
```

这样就把B,C,D都给revert了，变成：
```
A-> B ->C -> D -> D'-> C' -> B'
```

# 用法

`git revert OLDER_COMMIT^..NEWER_COMMIT`

如果我们想把这三个revert不自动生成三个新的commit，而是用一个commit完成，可以这样：
```
git revert -n OLDER_COMMIT^..NEWER_COMMIT
git commit -m "revert OLDER_COMMIT to NEWER_COMMIT"
```
