---
title: "Anthropic Claude Managed Agents：企业级 AI Agent 云托管服务"
description: "Anthropic Claude Managed Agents：企业级 AI Agent 云托管服务"
---

## Summary
Anthropic 新产品：你告诉 Anthropic 要什么 Agent，它在云端跑起来基础设施全包按用量收费。与 Claude Code（本地/个人）的核心区别：云端/企业/24小时不间断/API 嵌入产品。核心架构：大脑（Claude+调度）和手（沙盒+工具）分离，中位延迟降 60%，安全隔离凭证。ARR 突破 300 亿美元，Notion/Sentry/Atlassian/Rakuten 等已采用。被视为 AI Agent 基础设施的"AWS 时刻"。

## Key Concepts
- **Claude Managed Agents** — Anthropic 云端 AI Agent 托管服务，基础设施全包
- **Agent Infrastructure** — Agent 运行所需：沙盒/凭证/状态恢复/权限/追踪
- **Brain Hands Separation** — 大脑（推理）与手（执行）解耦架构
- **Enterprise AI** — 企业级 AI Agent 部署和集成
- **MCP Security** — 通过 MCP 代理层隔离凭证，AI 不直接接触 Token

## Claude Code vs Managed Agents
| 维度 | Claude Code | Managed Agents |
|------|-------------|----------------|
| 运行位置 | 本地 | Anthropic 云端 |
| 目标 | 开发者个人 | 企业 API |
| 持续性 | 关机即停 | 24/7 |
| 进度 | 不保存 | 断线不丢 |

## Architecture: 三层分离
```
大脑 Brain：Claude + 调度框架（思考决策）
手   Hands：沙盒 + 工具（执行操作）
记忆 Memory：独立会话日志（持久化）
```

## Enterprise Adoption
- Notion：多任务并行，用户不离开产品
- Sentry：bug 发现→修复→PR 全自动，无人介入
- General Legal：开发时间缩短 10 倍
- Rakuten：各部门 Agent，每个一周上线

## Pricing
- 运行时：$0.08/会话小时（空闲不计费）
- Token：Anthropic API 标准价
- 网页搜索：$10/千次
- SDK：Python/TS/Java/Go/Ruby/PHP

## Related Topics
- **Anthropic官方：构建有效AI Agent的设计模式与实践指南**
- **Anthropic: Harness Design for Long-Running Application Development**
- **agent-infra/sandbox - AI Agent 一体化沙盒环境**
- **OpenAI Symphony自主工作管理框架**
- **ByteDance DeerFlow 2.0超级Agent编排框架**
