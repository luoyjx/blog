---
title: "agent-infra/sandbox - AI Agent 一体化沙盒环境"
description: "agent-infra/sandbox - AI Agent 一体化沙盒环境"
---

## Summary
4.1k stars 的 Agent 一体化沙盒：浏览器自动化、Shell、文件操作、MCP 服务器、VSCode 集成在单一 Docker 容器中，共享文件系统。零配置开箱即用，支持 PyPI/npm/Go 多语言接入，可集成 Browser Use、LangChain 等框架。

## Key Concepts
- **AIO Sandbox** — 浏览器+终端+文件+VSCode+MCP 一体化 Agent 环境
- **MCP Servers** — 预配置浏览器/文件/Shell/文档转换 MCP 服务
- **Browser Automation** — Chromium + CDP 协议程序化控制
- **Agent Infrastructure** — 专为 AI Agent 设计的执行环境

## Quick Start
```bash
# PyPI
pip install agent-sandbox

# npm
npm install @agent-infra/sandbox
```

## Related Topics
- **Anthropic工程博客：用代码执行+MCP构建更高效的Agent**
- **agent-browser - Vercel Rust原生浏览器自动化CLI**
- **All Agentic Architectures - 17种AI Agent架构完整实现**
