---
title: "Context Graph是下一代数据平台 - Glean创始人论企业流程理解"
description: "'You can't reliably capture the why; you can capture the how.'"
---

## Summary
Glean 创始人 Arvind Jain 提出 **Context Graph** 是企业 AI 的下一代数据平台。核心洞察："无法可靠捕获 why，但可以捕获 how"——通过跨工具的活动数据（文档编辑、消息、审批）推导出任务和流程模式。构建 Context Graph 需要四层技术栈：Connectors（可观测性）、Indexes（检索）、Graphs（关系建模）、Memory（**Enterprise Memory** 捕获 Agent 执行轨迹）。这构成了 **Agentic Automation** 的骨干，使 Agent 能理解企业实际运作方式并自动化 **Tribal Knowledge** 中的分布式工作。

## Key Concepts
- **Context Graph** — 捕获企业 how（流程）而非 why（意图），通过模式推断意图
- **Enterprise Memory** — Agent 执行轨迹的持久化，学习什么在实践中有效
- **Process Automation** — 从原子活动数据推导任务/项目/计划，准确率约80%
- **Activity Data** — 带时间戳的离散操作信号，是流程理解的原材料
- **Agentic Automation** — 以 Context 为基础的企业 Agent 自动化
- **Tribal Knowledge** — 大多数企业工作流程仅存在于个人经验中，Context Graph 将其数字化

## Detailed Content

### Context 演进三阶段
1. 内容理解（搜索）→ 2. 关系知识（谁/什么/哪个团队）→ 3. 流程理解（如何运作）

### 技术栈四层
Connectors（跨工具可观测性）→ Indexes（快速检索）→ Graphs（结构与关系）→ Memory（Agent 执行学习）

### 关键引用
> "You can't reliably capture the why; you can capture the how."
> "Process understanding emerges from the combination of structural understanding and learned behavior."

## Related Topics
- **Agent Architecture**
- **AI Memory Systems**
- **Knowledge Graph**
- **RAG**
- **Context Management**
