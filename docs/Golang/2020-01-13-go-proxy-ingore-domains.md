---
id: go-proxy-ingore-domains
title: go proxy 跳过某些域名
---

If your Go version >= 1.13, the GOPRIVATE environment variable controls which modules the go command considers to be private (not available publicly) and should therefore not use the proxy or checksum database. For example:

```shell
go env -w GOPROXY=https://goproxy.io,direct
# Set environment variable allow bypassing the proxy for selected modules
go env -w GOPRIVATE=*.corp.example.com
```
