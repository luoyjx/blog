---
title: "ConvertX - 自托管文件格式转换平台（1000+格式）"
description: "ConvertX - 自托管文件格式转换平台（1000+格式）"
---

## Summary
16.4k stars 的自托管开源文件转换平台，支持 1000+ 格式互转。集成 FFmpeg、LibreOffice、ImageMagick、Pandoc 等 20+ 转换工具，基于 TypeScript + Bun + Elysia 构建，Docker 一键部署。支持批量处理、密码保护、多账户。

## Key Concepts
- **ConvertX** — 自托管 1000+ 格式文件转换工具（16.4k stars）
- **Self Hosted Tools** — Docker 部署，数据自主掌控
- **File Conversion** — 图像/视频/文档/矢量/3D 全格式支持
- **FFmpeg** — 视频转换核心（~472 输入/~199 输出格式）

## Supported Converters
| 工具 | 用途 | 格式数 |
|------|------|--------|
| FFmpeg | 视频/音频 | ~671种 |
| ImageMagick | 图像 | 428种 |
| LibreOffice | 文档/表格/演示 | 多种 |
| Pandoc | 文档格式转换 | 多种 |
| Calibre | 电子书 | 多种 |
| Inkscape/Potrace | 矢量图 | 多种 |
| Assimp | 3D 资产 | 多种 |

## Deployment
```bash
docker run -p 3000:3000 ghcr.io/c4illin/convertx
```

## Related Topics
- **Self Hosted Tools**
- **Docker**
- **Engineering Blogs**
