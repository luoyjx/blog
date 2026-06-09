---
title: "Karpathy LLM Wiki - 个人知识库的自演化模式"
description: "'Wiki 是持久的、复合增长的产物。交叉引用已经存在，矛盾已经被标记。'"
---

## Summary
Andrej Karpathy 提出的 **LLM Wiki** 模式，核心理念是让 LLM 增量构建并维护持久化 Wiki，而非每次对原始文档做 RAG 检索。架构分三层：Raw Sources（不可变输入文档）、The Wiki（LLM 生成维护的 Markdown 文件）、The Schema（配置文件定义结构和工作流）。三大核心操作为 **Ingest Query Lint**：Ingest 处理新来源并更新 Wiki，Query 搜索并综合答案，Lint 进行健康检查（矛盾、过期内容、孤儿页面）。该模式将维护负担从人类转移到 LLM，社区已有研究、小说写作、企业服务等多种扩展实现。

## Key Concepts
- **LLM Wiki** - LLM 增量构建的持久化 Wiki
- **Knowledge Management** - 个人知识管理系统
- **Ingest Query Lint** - 三大核心操作
- **Self Evolving Wiki** - 自演化的知识库
- **RAG Alternative** - 替代传统 RAG 的持久化方案

## Detailed Content

### 核心理念
> "Wiki 是持久的、复合增长的产物。交叉引用已经存在，矛盾已经被标记。"

**LLM Wiki** 是 **RAG Alternative**，不做即时检索，而是持续构建结构化知识。

### 三层架构
| 层 | 说明 |
|---|------|
| **Raw Sources** | 不可变的输入文档（文章、论文、图片）|
| **The Wiki** | LLM 生成并维护的 Markdown 文件 |
| **The Schema** | 配置文件（CLAUDE.md / AGENTS.md），定义结构和工作流 |

### **Ingest Query Lint** 三大操作
1. **Ingest**：处理新来源，更新索引，修订相关 Wiki 页面
2. **Query**：搜索 Wiki 页面，综合答案，将有价值的结果归档为新页面
3. **Lint**：健康检查 -- 矛盾、过期内容、孤儿页面、缺失交叉引用

### 关键支撑文件
- **index.md**：按类别组织的内容目录 + 摘要
- **log.md**：仅追加的时间线活动记录

### 为什么有效
> "人类的工作是策划来源、指导分析、提出好问题......LLM 的工作是其他所有事情。"

### 社区扩展
已有实现涵盖：研究、小说写作、企业服务交付、半导体知识库，许多结合 Obsidian、SQLite 索引和专用验证层。

## Related Topics
- **Project Golem**
- **Personal Knowledge Management**
- **Obsidian**
- **Second Brain**
