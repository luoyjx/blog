---
title: "Anthropic：AI Agent 有效上下文工程"
description: "Anthropic：AI Agent 有效上下文工程"
---

## Summary
Anthropic 工程博客（2025-09-29），系统阐述 **Context Engineering** 概念——从 Prompt Engineering 演进到管理整个上下文状态的艺术与科学。核心洞察：**Context Rot**（token 增多导致性能下降）、注意力预算有限，需用最小高信号 token 集合驱动 Agent。涵盖系统提示、工具设计、Just-in-Time 检索、**Compaction** 压缩等长程任务技术。

## Key Concepts
- **Context Engineering** — 管理 LLM 推理时全部 token 的策略，Prompt Engineering 的演进
- **Context Rot** — token 增多时模型信息回忆能力下降的现象
- **Compaction** — 上下文压缩技术：总结重要信息，重新初始化窗口
- **Just in Time Retrieval** — Agent 按需动态加载数据，而非预加载全量
- **Attention Budget** — Transformer n² 注意力机制导致上下文是有限资源

## Key Principles
1. **最小高信号原则** — 找最小 token 集合最大化期望输出
2. **正确高度** — 系统提示不过于具体（脆弱）也不过于模糊（无效）
3. **工具精简** — 避免功能重叠，人能判断的工具才能让 Agent 用好
4. **Just-in-Time** — 维护轻量标识符，运行时按需拉取（Claude Code 实践）
5. **混合策略** — 部分预加载 + 部分自主探索

## Long-Horizon Techniques
| 技术 | 作用 |
|------|------|
| Compaction | 总结压缩，重新初始化上下文 |
| Structured Note-taking | 主动记录关键信息到外部存储 |
| Multi-agent | 任务分解到多 Agent，各自维护独立上下文 |

## Related Topics
- **Anthropic官方：如何使用CLAUDE.md文件定制Claude Code**
- **Anthropic工程博客：用代码执行+MCP构建更高效的Agent**
- **为什么（资深）工程师难以构建AI Agent - 五大范式转变**
- **Context Engineering 实用指南 - 优化 AI 编码的上下文策略**
- **All Agentic Architectures - 17种AI Agent架构完整实现**
