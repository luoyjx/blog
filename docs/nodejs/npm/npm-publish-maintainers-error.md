---
id: npm-publish-maintainers-error
title: npm publish 出现 400 maintainers error 时该怎么解决
---

可能遇到在 `npm publish` 时，出现以下错误，但是发现自己确实是登录了。

特别是在使用旧版本的  `cnpm 私有仓库` 的时候。

```
400 Bad Request - PUT https://registry-npm.xxx.com/@xxx-ui - maintainers error
```

可尝试使用 `nvm` 安装 `node 10.x` ，此时 npm 为 `6.x`

```
> nvm install 10.13.0
> nvm use 10
Now using node v10.13.0 (npm v6.9.0)
```

再尝试一下 `npm publish` ，应该可以了
