---
title: "为什么（资深）工程师难以构建AI Agent - 五大范式转变"
description: "为什么（资深）工程师难以构建AI Agent - 五大范式转变"
---

## Summary
Philipp Schmid 分析资深工程师构建 AI Agent 的五大挣扎点。核心：从确定性（deterministic）到概率性（probabilistic）的 **Paradigm Shift**。五点：**Text as State**（保留自然语言而非强制结构化）、控制流（信任 LLM 而非硬编码边界）、**Agent Error Handling**（错误作为输入反馈）、**Eval Testing**（Pass^k + LLM-as-judge 替代单元测试）、**API Design for Agents**（明确命名+描述性文档）。结论：管理方差而非消除它，信任 Agent 导航流程。

## Key Concepts
- **Deterministic vs Probabilistic** — 传统软件与 AI Agent 的根本范式差异
- **Text as State** — 保留自然语言状态而非强制结构化
- **Agent Error Handling** — 错误作为输入触发自我恢复
- **Eval Testing** — Pass^k + LLM-as-judge 的概率性测试方法
- **API Design for Agents** — Agent 友好的显式命名与文档
- **Paradigm Shift** — 工程范式从确定性到概率性的转变

## Related Topics
- **Agent Evaluation**
- **ACI**
- **Anthropic官方：构建有效AI Agent**
- **Agent Friendly CLI**
- **pass@k**
