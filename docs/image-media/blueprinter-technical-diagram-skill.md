---
title: "Blueprinter：扁平工程蓝图风格技术图表 Claude Code Skill"
description: "Blueprinter：扁平工程蓝图风格技术图表 Claude Code Skill"
---

## Summary
@yofine 开源的 Claude Code skill，用 HTML/CSS 生成"扁平工程蓝图"风格技术图表。设计哲学：Precise, Objective, High Data-Ink Ratio。无阴影/渐变/毛玻璃，单色基调，严格对齐，输出像技术规格书而非营销页面。

## Key Concepts
- **Technical Diagram Skill** — 用 HTML/CSS 生成技术架构图
- **Flat Engineering Blueprint** — 扁平工程蓝图美学：无装饰、高信息密度
- **Data Ink Ratio** — Edward Tufte 理念：最大化数据墨水比

## Install
```bash
npx skills add https://github.com/yofine/skills --skill blueprinter
```

## Visual Rules
| 规则 | 说明 |
|------|------|
| 无装饰 | 无阴影/渐变/毛玻璃 |
| 扁平描边 | 1-2px 实线边框 |
| 单色 | 灰白黑为主，最多一个语义色 |
| 字体 | 标题 Sans-serif / 代码 Monospace |
| 对齐 | Grid/Flexbox 强制对齐 |

## Related Topics
- **Excalidraw Diagram Skill视觉论证图表生成**
- **ai-drawio - 自然语言生成draw.io图表**
- **UI Skills - Agent 构建界面的 UI 打磨技能集**
