---
title: "构建永不遗忘的Agent：记忆四层进化路径"
description: "构建永不遗忘的Agent：记忆四层进化路径"
---

## Summary

从第一性原理系统梳理Agent记忆架构的演化：LLM无状态，"记忆"是将完整对话历史重新发送的幻觉。无记忆的7种失效模式从上下文失忆到身份崩塌。记忆架构四层进化：Python列表（无持久化）→ Markdown文件（有存储无智能检索）→ 向量检索（语义搜索但看不见关系）→ 图向量混合（三存储统一）。Cognee作为开源实现提供关系存储+向量存储+图存储三合一，API仅四个调用。核心洞察：**存储不带智能检索，是没有目录的图书馆**；向量检索在多跳关系查询时会漏掉关键桥接事实。

## Key Concepts

- **Agent记忆** — 跨session持久化知识、让Agent不遗忘的核心机制
- **记忆失效模式** — 7种无记忆导致的失效：失忆/无个性化/任务中断/重复错误/不积累/幻觉/身份崩塌
- **向量检索** — 基于embedding cosine相似度检索，解决同义词问题，但无法做多跳关系推理
- **图向量混合** — 向量（语义）+ 图（关系）+ 关系型（溯源）三存储架构
- **记忆巩固** — 重复的情节记忆蒸馏为通用规则，从episodic到semantic的转化
- **Cognee** — 开源知识引擎，SQLite+LanceDB+Kuzu，四个API调用，无Docker
- **中间丢失效应** — 相关信息在长上下文中间时准确率下降30%+

## Tags

agent-memory, vector-search, knowledge-graph, cognee, memory-architecture, lilian-weng, stateless-llm

## Detailed Content

### 无记忆的7种失效模式

1. **上下文失忆**：Agent询问你已经告诉它的信息
2. **零个性化**：每次交互都像陌生人
3. **多步任务失败**：中间状态在任务中途静默丢失
4. **重复错误**：无情节记忆，同样的错误永远重演
5. **不积累知识**：每个session从零开始
6. **上下文溢出幻觉**：context满了，模型开始编造
7. **身份崩塌**：无连续性，无信任

### Lilian Weng认知科学框架（2023）

**Agent = LLM + Memory + Planning + Tool Use**（四个并列支柱）

记忆类型对应：

| 人类记忆 | Agent对应 | 特点 |
|---------|----------|------|
| 感觉记忆 | In-context（当前窗口） | 短暂，注意力过滤 |
| 工作记忆 | Active context | ~7±2项（Miller 1956）|
| 长期记忆 | 外部存储 | 无容量限制，检索是瓶颈 |

长期记忆细分：
- **情节记忆**：具体事件（"周二PostgreSQL集群宕机"）
- **语义记忆**：事实和概念（"PostgreSQL是关系型数据库"）
- **程序记忆**：技能和工作流（"退款请求先查购买日期"）

**记忆巩固**：重复的情节事件蒸馏为通用规则。Agent观察到"用户一贯喜欢执行摘要"应转化为可复用规则。

### 四层架构进化

**Layer 1：Python列表**
- ✓ 多轮对话正常
- ✗ 无界增长，context天花板时最早的消息静默丢弃
- ✗ 进程结束即失忆

**Layer 2：Markdown文件**
- ✓ 持久化解决了，重启后记忆仍在
- ✗ 2000个事实+200次对话历史 = 500K+ tokens，无法全部加载
- ✗ 关键字搜索太脆：无法处理同义词、改写或跨事实关联
- 案例：Claude Code使用CLAUDE.md和MEMORY.md正是这种模式

**Layer 3：向量检索**
- ✓ 语义搜索，"database"能匹配"PostgreSQL"
- ✗ 多跳关系查询的致命缺陷：

```
事实1：Alice拥有Project Atlas
事实2：周二的故障影响了PostgreSQL集群
事实3：Project Atlas使用PostgreSQL  ← 关键桥接，被向量检索漏掉

查询："Alice的项目受周二故障影响了吗？"
向量检索返回事实1和2，漏掉事实3，无法回答。
```

每个事实是embedding空间中的孤立点，连接它们的关系对向量不可见。

**Layer 4：图向量混合（Cognee）**

三存储架构：
- **关系型（SQLite）**：溯源——数据来源、入库时间、访问权限
- **向量（LanceDB）**：语义——内容含义、相似性
- **图（Kuzu）**：关系——实体如何连接、因果、报告关系

四个API：
```python
await cognee.add(data)       # 入库
await cognee.cognify()       # 实体提取+关系图谱构建
results = await cognee.search(query)  # 检索
await cognee.prune()         # 清理
```

默认栈：SQLite + LanceDB + Kuzu，全文件嵌入式，`pip install cognee`即可，无Docker。

### 能力矩阵

| 层级 | 持久化 | 语义搜索 | 关系推理 |
|------|--------|----------|----------|
| Python列表 | ✗ | ✗ | ✗ |
| Markdown文件 | ✓ | ✗ | ✗ |
| 向量DB | ✓ | ✓ | ✗ |
| 图向量混合 | ✓ | ✓ | ✓ |

## Related Topics

- **知识图谱查询优化：从索引到分布式** — 知识图谱查询优化技术（图遍历、索引、分布式）
- **Agent记忆三层架构：chunk/task/skill-recipes 压缩与召回策略** — chunk/task/skill-recipes三层压缩与召回策略
- **我是怎么运作的：内观一个自进化Agent的Harness（yoyo）** — yoyo的两层记忆系统（JSONL归档+时间加权摘要）
- **Hindsight：三层架构开源 Agent 长期记忆（LongMemEval SOTA）** — 三层架构开源Agent长期记忆
