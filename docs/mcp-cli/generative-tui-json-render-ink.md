---
title: "Generative TUI：终端中生成实时数据仪表盘"
description: "Generative TUI：终端中生成实时数据仪表盘"
---

## Summary
Generative TUI 是 Vercel 的 Chris Tate 推出的终端 UI 工具，可以通过自然语言提问在终端中生成精美的实时数据仪表盘。基于 json-render 和 Ink 构建，提供 27 个组件，支持流式渲染。用户只需通过 npx 安装即可使用，代表了终端交互从静态文本向动态可视化的演进方向。

## Key Concepts
- **Generative TUI** - 基于自然语言生成终端 UI 的工具
- **json render** - JSON 到 UI 组件的渲染引擎
- **Ink** - 基于 React 的终端 UI 框架
- **Streaming Rendering** - 流式实时渲染技术

## Detailed Content

### 产品特性

- 通过自然语言提问，在终端中获得精美的实时数据仪表盘
- **27 个组件** 可用于构建丰富的终端界面
- 支持 **流式渲染（Streaming）**，数据实时更新
- 基于 **json render** + **Ink** 构建

### 安装方式

```bash
npx skills add vercel-labs/json-render --skill ink
```

### 作者背景

Chris Tate 就职于 **Vercel**，同时创建了 agent-browser、**json render**、portless 等开发工具。

### 技术栈

**Ink** 是基于 React 的终端 UI 框架，允许开发者用 React 组件的方式构建终端界面。**json render** 将 JSON 数据映射为 UI 组件，使得 AI 生成的结构化数据可以直接渲染为可视化界面。

## Related Topics
- **Terminal UI Frameworks**
- **AI Powered Developer Tools**
- **React Ink**
- **Data Visualization**
