---
title: "RAG 检索质量评估：Precision@K、Recall@K 与 F1@K"
description: "RAG 检索质量评估：Precision@K、Recall@K 与 F1@K"
---

## Summary
Towards Data Science 文章，系统讲解 RAG 检索层质量评估的三大指标：**Precision@K**（检索精度）、**Recall@K**（召回率）、**F1@K**（调和均值）。帮助定位 RAG 失败是排序问题还是覆盖问题，在生成层之前优先优化检索。

## Key Concepts
- **RAG Evaluation** — 检索增强生成系统的评估方法
- **Precision@K** — 前K条结果中相关文档比例：`相关数 / K`
- **Recall@K** — 前K条结果覆盖全部相关文档的比例：`相关数 / 总相关数`
- **F1@K** — P@K 与 R@K 的调和平均：`2×P×R / (P+R)`
- **Retrieval Quality** — 检索质量是 RAG 成败的关键基础

## Formulas
```
Precision@K = 前K条中相关文档数 / K
Recall@K    = 前K条中相关文档数 / 全部相关文档总数
F1@K        = 2 × (P@K × R@K) / (P@K + R@K)
```

## Key Insights
- RAG 失败往往在检索层，不在生成层
- Precision 高 → 排序质量好；Recall 高 → 文档覆盖全
- K 值选择应匹配实际用户行为

## Related Topics
- **cognee - AI Agent记忆知识引擎（6行代码）**
- **All Agentic Architectures - 17种AI Agent架构完整实现**
- **为什么（资深）工程师难以构建AI Agent - 五大范式转变**
- **Context Engineering 实用指南 - 优化 AI 编码的上下文策略**
