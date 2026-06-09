---
title: "7 Principles for Agent-Friendly CLIs"
description: "7 Principles for Agent-Friendly CLIs"
---

## Summary

Trevin Chow 提出了面向 **AI Agent** 优化命令行界面设计的七大原则，核心思想是 CLI 工具需要从为人类用户设计转变为对 AI Agent 友好。这些原则涵盖了非交互式默认、**Structured Output**、可操作错误信息、安全重试、渐进式帮助发现、可组合结构和有界响应七个方面。作者特别指出彩色输出会浪费 token，无界响应会吞噬 **Context Window**，因此 Agent 友好的 CLI 需要在设计层面做出根本性改变。作者还开发了基于这些原则的自动化评估工具 CLI Agent Readiness Reviewer。

## Key Concepts

- **Agent Friendly CLI** — 为 AI Agent 而非人类操作者优化的命令行界面
- **ACI** — Agent-Computer Interface，Agent 与计算机的交互接口
- **Structured Output** — 结构化输出，如 JSON 格式的机器可读数据
- **Idempotency** — 幂等性，确保操作可安全重试
- **Context Window** — 上下文窗口，LLM 的有限输入容量
- **Non interactive Mode** — 非交互式模式，避免阻塞 Agent 执行

## Detailed Content

### 七大原则详解

1. **非交互式默认（Non-interactive defaults）** — 交互式提示会导致 **AI Agent** 卡住或失败，CLI 应默认以 **Non interactive Mode** 运行
2. **结构化输出（**Structured Output**）** — 提供 JSON 等机器可读格式，而非人类友好但难以解析的文本
3. **可操作的错误信息（Actionable error messages）** — 错误信息应包含足够上下文，使 **AI Agent** 能自我纠正
4. **安全重试机制（Safe retry mechanisms）** — 操作应具备 **Idempotency**，支持 Agent 安全重试
5. **渐进式帮助发现（Progressive help discovery）** — 支持 Agent 增量式探索 CLI 功能
6. **可组合结构（Composable structure）** — 支持命令的链式调用和管道组合
7. **有界响应（Bounded responses）** — 控制输出大小以避免消耗过多 **Context Window**

### 核心洞察

"Colored output wastes tokens. Unbounded responses eat context windows." 这一观点揭示了传统 CLI 设计与 **AI Agent** 需求之间的根本矛盾。

## Related Topics

- **AI Agent**
- **CLI Design**
- **Developer Tools**
- **Context Window**
- **ACI**
- **Compound Engineering**
