---
title: "Anthropic：多智能体研究系统工程实践"
description: "Anthropic：多智能体研究系统工程实践"
---

## Summary
Anthropic Engineering Blog（2025-06-13），详述 Claude Research 功能的多智能体系统架构与工程经验。Orchestrator-Worker 模式：Lead Agent（Opus 4）+ 并行 Subagents（Sonnet 4）+ CitationAgent。核心发现：Token 用量解释80%性能方差；多智能体比单智能体性能提升90.2%；但消耗15倍Token，需高价值任务才经济。

## Key Concepts
- **Multi Agent System** — Orchestrator-Worker 模式，Claude Research 核心架构
- **Orchestrator Worker** — Lead Agent 统筹 + Subagents 并行执行
- **Token Scaling** — Token 用量解释80%性能方差
- **Parallel Subagents** — 独立上下文窗口并行探索，压缩后汇报

## Performance Data
| 指标 | 数据 |
|------|------|
| 多智能体 vs 单智能体 | +90.2% |
| Token用量解释方差 | 80% |
| Agent vs Chat Token消耗 | 4× |
| 多智能体 vs Chat Token消耗 | 15× |

## Architecture Flow
```
用户查询 → LeadResearcher（保存计划到Memory）
→ 派发N个Subagents并行搜索
→ 每个Subagent用interleaved thinking评估工具结果
→ LeadResearcher综合，决定是否继续
→ CitationAgent处理引用
→ 返回用户
```

## When NOT to Use Multi-Agent
- Agent 间强依赖难并行（如大多数编程任务）
- 所有 Agent 需共享同一上下文

## Related Topics
- **Anthropic：AI Agent 有效上下文工程**
- **Anthropic：为 Agent 编写高效工具（用 Agent 优化工具）**
- **All Agentic Architectures - 17种AI Agent架构完整实现**
- **为什么（资深）工程师难以构建AI Agent - 五大范式转变**
