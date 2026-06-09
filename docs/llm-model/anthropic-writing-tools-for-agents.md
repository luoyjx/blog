---
title: "Anthropic：为 Agent 编写高效工具（用 Agent 优化工具）"
description: "Anthropic：为 Agent 编写高效工具（用 Agent 优化工具）"
---

## Summary
Anthropic Engineering Blog（2025-09-11），系统讲解如何设计让 Agent 高效使用的工具：建立原型→评估→与 Claude Code 协作自动优化。核心原则：工具要合并语义相关操作、避免功能重叠、返回相关子集（非全量）、描述即 Prompt。

## Key Concepts
- **Tool Design** — 为 Agent 设计工具不同于为人类/API 设计
- **Tool Evaluation** — 用真实任务评估集测量 Agent 工具使用表现
- **MCP Tools** — MCP 服务器工具的设计与优化
- **Tool Namespacing** — 避免工具重叠导致 Agent 混淆

## Design Principles
| 原则 | 说明 |
|------|------|
| 精选工具集 | 不要包装 API，实现目标导向工具 |
| 合并操作 | `schedule_event` 替代3个独立工具 |
| 返回相关子集 | `search_contacts` 而非 `list_contacts` |
| Token 效率 | 避免全量返回浪费上下文 |
| 描述即 Prompt | 工具描述直接影响 Agent 行为 |

## Workflow
原型构建 → 评估任务集（真实复杂场景）→ 与 Claude Code 协作分析记录 → 自动重构工具

## Related Topics
- **Anthropic：AI Agent 有效上下文工程**
- **Anthropic工程博客：用代码执行+MCP构建更高效的Agent**
- **Anthropic官方：如何使用CLAUDE.md文件定制Claude Code**
