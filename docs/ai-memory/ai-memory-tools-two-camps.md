---
title: "AI记忆工具两大阵营：Memory Backends vs Context Substrates"
description: "AI记忆工具两大阵营：Memory Backends vs Context Substrates"
---

## Summary

witcheer 梳理了450+个 agent-memory 仓库后发现两个根本不同的范式：**Camp 1（Memory Backends）**从对话中提取事实存入向量数据库并检索——问的是"AI应该记住什么"；**Camp 2（Context Substrates）**维护跨session积累的结构化可读上下文文件——问的是"AI应该在什么上下文里工作"。大部分star在Camp 1，但能支撑连续多session、多项目工作的架构在Camp 2中涌现。Zep的品牌重塑（从"memory"改为"context engineering"）是最强市场信号。

## Key Concepts

- **AI记忆工具** — 让Agent跨session持久化知识的技术生态（450+开源仓库）
- **Memory Backends** — Camp 1：提取→存储→检索循环，工具包括Mem0/MemPalace/Supermemory/Honcho
- **Context Substrates** — Camp 2：结构化文件作为上下文底层，工具包括OpenClaw/Zep/MEMORY.md
- **Mem0** — 53.1k star，四操作（add/search/update/delete），flat记忆无关系，主流采用
- **OpenClaw** — 358k star，Markdown文件+Dreaming机制（六权重信号促进长期记忆）
- **Zep** — 4.4k star，时序知识图谱，valid_at/invalid_at，从"memory"改名"context engineering"
- **记忆固结** — OpenClaw的Dreaming：三阶段（浅睡→REM→深睡）将每日笔记促进为MEMORY.md

## Tags

ai-memory, memory-backends, context-substrates, mem0, openclaw, zep, dreaming, recall-promotion

## Detailed Content

### 两大阵营核心区别

| 维度 | Camp 1: Memory Backends | Camp 2: Context Substrates |
|------|------------------------|---------------------------|
| 核心问题 | AI应该记住什么？ | AI应该在什么上下文里工作？ |
| 存储方式 | 提取的事实→向量数据库 | 结构化可读文件（Markdown） |
| 操作模式 | 自动提取+检索 | Agent读取+修改+写回 |
| 用户接触 | 不直接接触记忆 | 文件是记忆本身 |
| 适用场景 | 事实召回（"X说了什么"）| 持续多session积累状态 |

### Camp 1 工具对比

| 工具 | Stars | 特点 | 局限 |
|------|-------|------|------|
| Mem0 | 53.1k | 四操作，用户/会话/Agent三级存储 | 扁平记忆，无关系，每次提取耗LLM |
| MemPalace | 46.2k | 逐字存储，最高检索召回率(99%+) | 线性增长，无压缩，不适合跨项目状态 |
| Supermemory | 21.8k | 时序感知（过期事实自动遗忘），50ms检索 | 连接器丰富，最接近状态管理的Camp 1 |
| Honcho | 2.4k | 人类和Agent都是"同伴"，心理洞察 | PostgreSQL+pgvector，AGPL-3.0 |
| Cognee | 15.4k | 向量+图谱混合 | 见 agent-memory-never-forget |
| Memori | 13.3k | 拦截LLM API，81.95% on LoCoMo，仅用4.97%上下文 | — |

### OpenClaw Dreaming 机制（Camp 2典型）

六权重信号评分体系：
- 相关性（0.30）、频率（0.24）、查询多样性（0.15）、近期性（0.15）、固结（0.10）、概念丰富度（0.06）

促进门槛：最低分0.8 + 最低召回次数3 + 最低独特查询数3。三关全过才促进到MEMORY.md。

三阶段：
1. 浅睡（轻量筛选）→ 2. REM（加权召回促进）→ 3. 深睡（协调写入MEMORY.md，不重复）

### 市场信号：语言正在转变

Zep将定位从"memory"改为"context engineering"——这是整个赛道最强的市场信号。Zep是有融资的公司（4.4k star），这个决定意味着"memory"已经不是正确的描述语言。

### 作者观点

Camp 1是必要的（事实召回），但不足以支撑连续多session多项目工作。Camp 2正在涌现真正能规模化的架构。两个camp对应的是不同的问题，而不是竞争关系。

## Related Topics

- **构建永不遗忘的Agent：记忆四层进化路径** — Agent记忆四层进化（含Cognee三存储架构）
- **Agent记忆三层架构：chunk/task/skill-recipes 压缩与召回策略** — chunk/task/skill-recipes三层压缩架构
- **我是怎么运作的：内观一个自进化Agent的Harness（yoyo）** — yoyo的两层记忆（JSONL归档+时间加权摘要）
- **Hermes Agent万字系统提示词深度解析** — Hermes的MEMORY.md快照系统（Camp 2的实践）
