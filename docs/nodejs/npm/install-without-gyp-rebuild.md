---
id: npm-install-without-gyp-rebuild
title: npm install 时跳过 gyp rebuild 步骤
---

我们可能在某些情况下不希望在 `npm install` 时，自动 rebuild 已有包, 比如在 Mac M1 机器下，
可能有一些原因导致 `node-gyp rebuild` 失败，或者因为一些版本比较老的 Node.js 服务，因为 node-gyp rebuild 报错时，
我们无法添加某个依赖到 `package.json` 中并更新 `package-lock.json`，好在 npm 提供了这个选项, `--ignore-scripts`。

执行下面的命令就可以:

```shell
npm install --ignore-scripts
```

