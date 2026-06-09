---
title: "三分钟大白话：什么是SubAgent？"
description: "'会做事很重要。会分工，才是真正开始走向高级玩法。'"
---

## Summary

SubAgent 是一个专门处理特定任务的子 Agent，独立运行并返回结果。类比餐厅管理：主 Agent 是餐厅经理，SubAgent 是分工明确的厨师、服务员、采购员。SubAgent 的四大核心优势是上下文隔离、聚焦结果、并行处理和可复用性。与 **Skills** 相比，Skill 侧重能力增强（给 AI 加工具），而 SubAgent 侧重工作流复杂度（任务委派）。成熟的 AI 工作流优先考虑任务委派（delegation），而非让单个 Agent 承担所有工作。

## Key Concepts

- **SubAgent** - 专门处理特定任务的子 Agent
- **Task Delegation** - 任务委派，成熟 AI 工作流的核心策略
- **Context Isolation** - 每个 SubAgent 独立上下文窗口，互不干扰
- **Parallel Processing** - 多个 SubAgent 同时执行不同任务
- **Skills** - 能力增强工具，与 SubAgent 的任务委派形成互补

## Detailed Content

### 核心概念

**SubAgent** 是独立运行的子 Agent，专注处理特定任务并返回结果。类比管理餐厅：主 Agent 是餐厅经理，SubAgent 是分工明确的厨师、服务员、采购员。

### Skill vs SubAgent 对比

| 对比 | **Skills** | **SubAgent** |
|------|-------|----------|
| 本质 | 给 AI 加工具 | 让 AI 分工协作 |
| 解决的问题 | 能力增强 | 工作流复杂度 |
| 方式 | 添加新能力 | **Task Delegation** |

### SubAgent 核心优势

1. ****Context Isolation****：每个 SubAgent 有独立上下文窗口，不会互相干扰
2. **聚焦结果**：专注单一任务，输出更精准
3. ****Parallel Processing****：多个 SubAgent 可同时执行不同任务
4. **可复用性**：同一个 SubAgent 可被不同主 Agent 调用

### 在主流工具中的体现

- ****OpenClaw****：原生 SubAgent 架构支持
- ****Claude Code****：Agent 工具支持子 Agent 调用
- ****Codex****：SubAgent 概念的应用

### 核心观点

> "会做事很重要。会分工，才是真正开始走向高级玩法。"

## Related Topics

- **Agent Workflow**
- **Skills**
- **OpenClaw**
- **Claude Code**
- **Codex**
- **Context Window**
