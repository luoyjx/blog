---
title: "arxiv-to-prompt - 将arXiv论文转换为LLM可用的统一LaTeX文档"
description: "arxiv-to-prompt - 将arXiv论文转换为LLM可用的统一LaTeX文档"
---

## Summary
arxiv-to-prompt 是一个 CLI 工具，将 arXiv 学术论文转换为统一 LaTeX 文档，适合作为 LLM 提示输入。它能自动下载论文、识别主 TeX 文件、合并多文件项目（解析 `\input`/`\include`），并可选去除注释和附录。支持 token 计数、章节提取、宏展开等功能，还提供 MCP Server 集成。是学术研究与 LLM 结合的实用桥梁工具。

## Key Concepts
- **Paper to Prompt** - 将学术论文转换为 LLM 可处理的格式
- **LaTeX Flattening** - 多文件 LaTeX 项目自动检测和扁平化
- **Token Counting** - 计算转换后文档的 token 数量
- **MCP Server** - 提供 LaTeX 处理的 MCP 集成

## Detailed Content

### 核心功能
- 多文件 LaTeX 项目自动检测和扁平化
- 支持 arXiv ID 和完整 URL 输入
- 本地缓存已下载论文
- 剪贴板复制
- 章节提取（层级显示）
- 图片路径识别
- 仅提取摘要模式
- 宏展开
- **Token Counting**
- 本地文件夹处理

### 安装使用
```bash
pip install arxiv-to-prompt
arxiv-to-prompt 2301.12345 --no-comments --no-appendix --copy
```

### 生态集成
- **MCP Server**（LaTeX 处理）
- 演示文稿生成器
- iOS 剪贴板集成应用

## Related Topics
- **LLM Research Workflow**
- **Academic Paper Processing**
- **MCP Protocol**
- **Prompt Engineering**
