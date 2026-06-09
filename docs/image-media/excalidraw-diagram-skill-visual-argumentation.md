---
title: "Excalidraw Diagram Skill视觉论证图表生成"
description: "Excalidraw Diagram Skill视觉论证图表生成"
---

## Summary
Excalidraw Diagram Skill是一个Claude Code扩展技能，让编码Agent从自然语言提示生成"视觉论证图"——不同于普通流程图，其视觉结构直接强化概念含义。技能支持扇出模式（一对多关系）、时间线（顺序流程）、聚合模式（数据汇总）等视觉论证模式。通过Playwright驱动的渲染管道实现自动视觉验证，Agent能看到生成输出并迭代修正布局问题。所有视觉样式集中在单一配置文件中管理。

## Key Concepts
- **Visual Argumentation** - 视觉结构强化概念含义的图表方法
- **Claude Code Skills** - 编码Agent的扩展技能模块
- **Excalidraw** - 开源绘图工具
- **Playwright** - 浏览器自动化框架，用于视觉验证
- **Diagram Generation** - 从自然语言自动生成图表

## Detailed Content

### 视觉论证模式

不同于传统流程图的抽象表示，**Visual Argumentation**将概念语义映射到视觉形状：
- 扇出模式表示一对多关系
- 时间线表示顺序流程
- 聚合模式表示数据汇总
- 每个形状/形状组都映射其代表的概念

### 证据性元素

技术图表包含具体元素（真实代码片段、JSON载荷），而非抽象占位文本，增强图表的实用价值。

### 自动视觉验证

**Playwright**驱动的渲染管道实现闭环验证：概念映射 -> 空间布局 -> **Excalidraw** JSON生成 -> 视觉渲染 -> 验证循环。Agent能检测并修正重叠文字、箭头错位、间距问题。

### 品牌定制

所有视觉样式集中在`references/color-palette.md`一个文件中，便于统一管理。

### 安装方式

```bash
git clone https://github.com/coleam00/excalidraw-diagram-skill
cp -r excalidraw-diagram-skill ~/.claude/skills/
```

需要Python环境 + Playwright依赖。

## Related Topics
- **Claude Code Skills**
- **Hackathon Claude Code Setup**
- **Self Improving Agent**
- **AI Assisted Visualization**
