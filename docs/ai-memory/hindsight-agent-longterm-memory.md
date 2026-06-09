---
title: "Hindsight：三层架构开源 Agent 长期记忆（LongMemEval SOTA）"
description: "Hindsight：三层架构开源 Agent 长期记忆（LongMemEval SOTA）"
---

## Summary
开源 Agent 长期记忆系统，LongMemEval SOTA（83.6% vs GPT-4o 60.2%）。三层记忆架构：世界事实/个人经历/心智模型。多策略检索（语义+BM25+时间）。MIT 开源。

## Key Concepts
- **Agent Memory** — Agent 长期记忆，跨会话保留用户信息
- **Three Tier Memory** — 世界事实 / 个人经历 / 心智模型 三层
- **LongMemEval** — 长期记忆评估基准，Hindsight SOTA 83.6%
- **Multi Strategy Retrieval** — 语义+BM25+时间多策略检索

## Memory Layers
| 层级 | 内容 |
|------|------|
| World Facts | 通用知识和事实 |
| Personal Experience | 用户历史交互记录 |
| Mental Models | 推断的用户偏好和思维模式 |

## Related Topics
- **AI 记忆系统现状：基准测试、架构与实际效果**
- **Wax - Swift原生AI Agent高性能本地记忆引擎**
- **MemPalace：古希腊记忆宫殿启发的 AI 记忆系统**
