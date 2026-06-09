---
title: "Relace Fast Agentic Search - 速度4倍精度比肩Claude的代码检索"
description: "Relace Fast Agentic Search - 速度4倍精度比肩Claude的代码检索"
---

## Summary
Relace 的 **Fast Agentic Search** (FAS)，专门训练的代码检索小型 Agent。三大技术：**Parallel Tool Calls**（同时4-12个grep/view）、**On Policy RL**（奖励精度+惩罚轮数，涌现出先推理再并行搜索的策略）、**Subagent Architecture**（60% Token 消耗在搜索，剥离给专用小模型）。同等准确率下速度快4倍，SWE-bench 延迟降9.3%、Token降13.6%。代表趋势：从"全能大模型"向"专家子模型协作"转变。

## Key Concepts
- **Fast Agentic Search** — 结合 RAG 速度和 Agentic Search 精度的代码检索
- **Parallel Tool Calls** — 同时发出多个工具调用减少延迟
- **On Policy RL** — 专门的强化学习训练搜索策略
- **Subagent Architecture** — 将搜索任务剥离给专用小模型
- **Code Search** — 代码库搜索与检索优化

## Related Topics
- **SubAgent**
- **Agent Architecture**
- **Coding Agent**
- **Context Management**
