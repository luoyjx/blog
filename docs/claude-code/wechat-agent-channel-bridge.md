---
title: "wechat-agent-channel - 微信接入AI编码助手的消息桥接"
description: "wechat-agent-channel - 微信接入AI编码助手的消息桥接"
---

## Summary
wechat-agent-channel 是一个消息桥接工具，通过微信 ClawBot 接口将消息路由到本地 AI 编码助手，支持 Codex、OpenCode 和 Claude Code 三种 Agent。系统提供文本和多媒体（图片、文件、语音、视频）消息路由，支持多会话管理，以及 Agent 文件返回至微信的功能。提供 Local CLI 模式和 MCP 插件模式两种工作方式。

## Key Concepts
- **Message Bridge** - 微信到 AI 编码助手的消息路由桥梁
- **ClawBot** - 微信消息接口
- **Multi Agent Support** - 支持 Codex / OpenCode / Claude Code 三种 Agent
- **Session Management** - 多会话创建、切换、删除管理

## Detailed Content

### 支持的 Agent
- **Codex**（本地 CLI 模式）
- **OpenCode**（本地 CLI 模式）
- ****Claude Code****（MCP 插件模式）

### 核心功能
- 文本消息路由到编码助手
- 媒体支持：图片、文件、语音、视频
- 多会话管理
- Agent 文件返回至微信
- 本地附件存储 `.wechat-agent/attachments/`

### 两种工作模式
1. **Local CLI 模式**（Codex/OpenCode）：本地直接执行
2. **MCP 插件模式**（**Claude Code**）：独立集成

### 会话命令
`/new` 新建 / `/list` 查看 / `/switch [id]` 切换 / `/delete [id]` 删除 / `/models` 列出模型 / `/model [name]` 选择模型

### 环境要求
Python 3.11+ / Node.js 18+ / 微信 + ClawBot / CLI 工具

## Related Topics
- **Claude Code**
- **AI Coding Assistant**
- **WeChat Automation**
- **MCP Protocol**
