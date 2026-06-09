---
title: "Claude Code from Source：18 章逆向解析 Claude Code 内部架构与可迁移模式"
description: "Claude Code from Source：18 章逆向解析 Claude Code 内部架构与可迁移模式"
---

## Summary
通过 Claude Code npm 包的 source maps 逆向分析，提炼为 18 章在线书籍。涵盖 6 大核心抽象：Agent Loop（async generator 驱动，4 层上下文压缩）、Tool 执行（14 步管道，按安全分类并发）、Multi-Agent 编排（共享 prompt cache 前缀节省 95% 成本）、文件记忆（4 类型 + LLM 召回，无数据库）、两阶段 Skill 加载、27 个生命周期 Hooks。每章结尾有"Apply This"——5 个可迁移模式。

## Key Concepts
- **Agent Loop** — async generator 驱动：流式输出→工具执行→错误恢复→4 层上下文压缩
- **14 Step Tool Pipeline** — 模型请求→权限解析→推测执行→并发批处理→工具结果
- **Multi Agent Cache Sharing** — Sub-agents 共享字节相同的 prompt cache 前缀，成本降 95%
- **File Based Memory** — 4 种记忆类型，LLM 驱动召回，Sonnet 侧查询优于 embedding
- **Two Phase Skill Loading** — 启动时加载元数据，按需加载完整内容（progressive disclosure）
- **Prompt Cache Optimization** — Slot reservation 在 99% 请求中保存上下文

## Book Structure (18 Chapters)
| Part | 章节 | 主题 |
|------|------|------|
| 1 Foundations | Ch1-4 | 架构、启动(240ms)、状态、API 层 |
| 2 Core Loop | Ch5-7 | Agent Loop、Tool 管道、并发执行 |
| 3 Multi-Agent | Ch8-10 | Sub-Agent、Fork Cache、Swarm |
| 4 Persistence | Ch11-12 | Memory 系统、Skills+Hooks |
| 5 Interface | Ch13-14 | Terminal UI (Ink fork)、输入处理 |
| 6 Connectivity | Ch15-16 | MCP 协议、远程执行 |

## Key Numbers
- 启动时间：240ms（并行 I/O）
- Prompt Cache 节省：95%（sub-agent 共享前缀）
- Tool 管道步骤：14 步
- 生命周期 Hooks：27 个
- 记忆类型：4 种
- Skill 加载阶段：2 阶段

## Related Topics
- **你不知道的Claude Code：架构、治理与工程实践**
- **Everything Claude Code (ECC) - AI Agent 性能优化生态系统**
- **Claude Code Best Practices - 14 Key Practices**
- **Anthropic Agent Skills - 为真实世界任务装备AI Agent的技能框架**
- **少即是多：高效 Agent 构建方法——Skills 优于 agent.md，先干活再封装**
- **Claude Code Token 缓存深度解析：缓存命中节省 80% 成本**
