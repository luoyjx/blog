---
title: "Garry Tan GBrain：AI 原生个人知识库规格"
description: "Garry Tan GBrain：AI 原生个人知识库规格"
---

## Summary
Garry Tan（YC CEO）发布的个人知识库规格说明（Gist ⭐365），从 7,471 个 Markdown 文件迁移到 SQLite+FTS5+向量嵌入的结构化方案。核心设计哲学：薄 CLI + 胖技能，MCP 兼容。与 Karpathy LLM Wiki 代表 AI 原生 KB 的两种主流路径（结构化 DB vs 文件系统）。

## Key Concepts
- **Personal Knowledge Base** — GBrain 是 Garry Tan 的 AI 原生 KB 实现
- **SQLite FTS5** — 统一持久化存储 + 全文搜索，替代纯文件系统
- **Vector Embeddings** — 语义搜索能力，嵌入到 SQLite 存储
- **MCP** — Model Context Protocol 兼容，与 AI 工具链集成
- **Thin CLI Fat Skills** — CLI 只做基础操作，复杂逻辑在 skills 层

## Architecture
| 组件 | 技术选择 | 作用 |
|------|---------|------|
| 存储层 | SQLite + FTS5 | 全文检索 |
| 语义层 | Vector Embeddings | 语义搜索 |
| 接口层 | Thin CLI | 基础操作 |
| 逻辑层 | Fat Skills | 复杂功能 |
| AI 接口 | MCP | AI 工具集成 |

## Related Topics
- **Karpathy LLM Wiki - 个人知识库的自演化模式**
- **Anthropic Knowledge Work Plugins - 11个领域专家插件**
- **DeepSeek Engram - 为 LLM 添加第二大脑的条件记忆架构**
