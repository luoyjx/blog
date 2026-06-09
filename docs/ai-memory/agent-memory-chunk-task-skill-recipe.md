---
title: "Agent记忆三层架构：chunk/task/skill-recipes 压缩与召回策略"
description: "Agent记忆三层架构：chunk/task/skill-recipes 压缩与召回策略"
---

## Summary

huangserva 提出的 Agent 记忆三层压缩架构：chunk（全量对话）→ task（主题聚合经验）→ skill/recipes（高度精炼配方）。核心策略是做减法——有意识地抛弃和退化低价值记忆，优先用 skill/recipes + task 做被动召回，chunk 留给主动查询。

## Key Concepts

- **AI记忆** — Agent 跨 session 持久化知识的核心机制
- **记忆压缩** — 从 1000 条到 300 条到 10 条的三级压缩
- **chunk记忆** — 全量对话原始记忆，适合主动查询
- **技能配方** — 高度精炼的 skill/recipes，自动生成和优化
- **主题聚合** — task 层：从多次对话中抽取主题化经验
- **记忆召回** — skill/recipes + task 命中为主，chunk 为辅

## Tags

ai-memory, agent, compression, retrieval, skill-recipes, task-memory

## Detailed Content

### 三层结构
```
chunk（1000条）→ task（300条）→ skill/recipes（10条）
```

| 层级 | 内容 | 生成方式 | 用途 |
|------|------|---------|------|
| chunk | 全量对话记忆 | 直接记录 | 主动查询 |
| task | 主题聚合（经验） | 从多次 chunk 中抽取 | 被动召回 |
| skill/recipes | 配方（精炼知识） | task 结束后自动生成/优化 | 优先被动召回 |

### 核心策略
- **优先召回**：skill/recipes + task
- **按需查询**：chunk（主动）
- **做减法**：抛弃、退化低价值记忆，不只是压缩

## Related Topics

- **AI 记忆系统现状：基准测试、架构与实际效果** — AI记忆系统现状综述
- **我是怎么运作的：内观一个自进化Agent的Harness（yoyo）** — yoyo的两层记忆系统（JSONL归档 + 时间加权摘要）
- **Hindsight：三层架构开源 Agent 长期记忆（LongMemEval SOTA）** — 三层架构开源Agent长期记忆
- **DeepSeek Engram - 为 LLM 添加第二大脑的条件记忆架构** — DeepSeek条件记忆架构
