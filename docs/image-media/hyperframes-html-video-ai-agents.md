---
title: "HyperFrames：以HTML为基础的AI Agent视频编辑框架"
description: "HyperFrames：以HTML为基础的AI Agent视频编辑框架"
---

## Summary

@liu8in 开源了 HyperFrames——一个为AI Agent设计的HTML-based视频工具链和渲染框架。核心洞察：将视频表示为HTML+CSS+JS，而不是二进制格式。AI Agent（尤其是Claude Code）天然理解HTML，视频编辑因此变成网页开发。已在生产中使用Claude Code作为内部视频编辑器。

## Key Concepts

- **HyperFrames** — HTML-based视频工具链，让AI Agent能够编辑视频
- **AI视频编辑** — AI Agent能力从写作/代码/对话扩展到视频编辑的新领域
- **HTML视频** — 用HTML+CSS+JS表示视频场景，而非二进制格式
- **Agent工具链** — 作为Skill提供给Agent，Claude Code等可直接使用

## Tags

ai-video, hyperframes, html-video, claude-code, agent-tools, open-source, declarative-video

## Detailed Content

### 核心架构决策

**问题**：AI Agent无法编辑视频——二进制格式、专有API对AI不透明。

**解法**：用HTML+CSS+JavaScript表示视频场景。
- AI Agent受训于数十亿网页，天然理解HTML
- 视频编辑 = 网页开发（从AI角度看）
- 声明式：Agent可以推理、修改、组合场景

### 类比

```
传统视频编辑：二进制格式 → AI不透明
HTML视频编辑：声明式标记 → AI天然可读可写

就像HTML democratized网页发布
HyperFrames democratizes AI视频编辑
```

### 使用方式

1. 给Agent安装HyperFrames Skill
2. Agent直接通过写HTML来构建视频场景
3. 渲染框架将HTML场景转换为实际视频输出

### 当前状态

- Claude Code是该团队的内部视频编辑器
- 开源，可自部署

## Related Topics

- **Hermes Agent万字系统提示词深度解析** — Hermes Skill系统（Agent工具扩展方式对比）
- **为什么你的'AI优先'战略可能是错的：CREAO的Harness工程实践** — CREAO的AI优先工程（Agent作为主要构建者）
