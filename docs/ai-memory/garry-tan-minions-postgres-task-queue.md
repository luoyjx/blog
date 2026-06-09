---
title: "Minions：基于 Postgres 的多 Agent 任务队列，把多 Agent 系统从玩具级拉到生产级"
description: "'这些后端开发搞了三十年的老东西' —— 多 Agent 系统当下需要的不是新发明，而是把 30 年来后端工程的成熟范式接到 AI Agent 上。"
---

## Summary

Garry Tan 在 OpenClaw / GBrain 中内置了 **Minions**——一个基于 Postgres 的原生任务队列，零额外运维零额外成本。生产数据：拉一月社交帖子任务从"超时 0% 成功"提升到"753 ms 100% 成功"，内存从 80MB 降到 2MB，token 成本归零。19 个定时任务并发处理 36,000 月历史数据 15 分钟完成零失败。容错：网关被杀、容器崩溃任务不丢，自动断点续跑，运行中可发消息改参数。**核心命题**：多 Agent 系统最大瓶颈不在模型，在队列/状态/重试/持久化这些后端做了 30 年的老东西。"一个没有队列的子代理，只是一个带超时的愿望而已"。这是从玩具级到生产级的底层基础设施升级。

## Key Concepts

- **Minions** — 基于 Postgres 的原生任务队列，内置在 OpenClaw / GBrain
- **Postgres 原生队列** — 不依赖 Redis/RabbitMQ/Celery，复用 Postgres 实现，零运维成本
- **断点续跑** — 网关被杀、容器崩溃，任务不丢失，重启后自动从断点继续
- **运行中改参数** — 任务运行过程中通过消息接口修改参数（动态可控）
- **多 Agent 真瓶颈** — 队列、状态、重试、持久化（不在模型本身，不在 prompt 优化）
- **队列即生产力** — "没有队列的子 Agent 只是带超时的愿望" — 队列把不确定性转化为可观测可靠的执行流
- **玩具级 vs 生产级 Agent** — 区分线在基础设施成熟度，不在模型能力

## Tags

minions, openclaw, gbrain, garry-tan, postgres, task-queue, multi-agent, persistence, retry, production-grade, ai-infrastructure

## Detailed Content

### 痛点：OpenClaw 子 Agent 的现状

| 现象 | 后果 |
|------|------|
| 子 Agent 超时 | 任务跑一半挂掉 |
| 网关断开 | 进度全丢 |
| token 已花 | 没有产出 |
| 手动重来 | 工程师精力损耗 |

### 解法：Minions 的设计选择

**关键决策**：基于 Postgres 而非引入新组件（Redis/RabbitMQ/Celery）

| 选项 | 评估 |
|------|------|
| Redis + Celery | 多组件、需独立运维 |
| RabbitMQ | 重型、与 GBrain 现有 stack 不匹配 |
| **Postgres 原生** | **零额外运维、零额外成本、复用现有数据库** |

**架构内置**：直接长在 GBrain 里，不是外挂组件——这意味着所有子 Agent 默认就有持久化任务能力。

### 生产环境对比数据

#### 任务一：拉一个月社交帖子导入大脑

| 指标 | 旧办法 | Minions | 提升 |
|------|--------|---------|------|
| 耗时 | > 10s 超时 | 753 ms | ~13× 以上 |
| 成功率 | 0% | 100% | ∞ |
| 内存占用 | 80 MB | 2 MB | 40× |
| Token 成本 | — | 0 | 归零 |

#### 任务二：19 并发定时任务

| 指标 | 旧版 | Minions |
|------|------|---------|
| 状态 | 卡死 | 处理 36,000 月历史数据 |
| 总耗时 | — | 15 min |
| 失败数 | — | 0 |
| 报错数 | — | 0 |

### 容错三件套

```
1. 网关被杀 ──┐
2. 容器崩溃 ──┼─→ 任务不丢
3. 进程重启 ──┘
        ↓
   自动从断点继续跑
        ↓
   运行中可消息改参
        ↓
   完成后汇报结果
```

这把"祈祷任务别超时"的工作流转化为"扔出去就忘"的可信赖工作流。

### 核心论点：多 Agent 真瓶颈

| 错误认知 | 真实瓶颈 |
|---------|---------|
| 模型不够聪明 → 换更大模型 | 队列 |
| Prompt 不够好 → 优化 prompt | 状态 |
| 工具不够多 → 加更多工具 | 重试 |
| 推理框架不够 → 换框架 | 持久化 |

> "这些后端开发搞了三十年的老东西" —— 多 Agent 系统当下需要的不是新发明，而是**把 30 年来后端工程的成熟范式接到 AI Agent 上**。

> **"一个没有队列的子代理，只是一个带超时的愿望而已。"**

### 战略意义：玩具级 vs 生产级的分水岭

| 维度 | 玩具级 Agent | 生产级 Agent |
|------|-------------|-------------|
| 任务执行 | 同步阻塞 | 异步队列 |
| 状态管理 | 内存中 | 持久化（数据库）|
| 失败处理 | 退出 / 报错 | 重试 + 断点续跑 |
| 运行时控制 | 启动后无法干预 | 中途可发消息改参 |
| 并发能力 | 串行 / 协程 | 队列驱动多任务 |
| 可观测性 | 看 stdout | 任务状态可查询 |
| 容错 | 进程崩溃数据丢 | 自动恢复 |

### 与已有知识的关联

之前 wiki 中：
- **Resolvers：Agent系统的智能路由表** — Garry Tan 的 Resolver 路由模式（解决 Skills 路由问题）
- **Garry Tan GBrain：AI 原生个人知识库规格** — GBrain 知识库架构（Minions 的宿主）
- **GStack困惑协议：元认知让AI知道自己不知道** — Garry 的混乱协议、Fuzzy Gate（Skills 触发的另一面）
- **OpenClaw Agent System Prompt 架构详解（9层）** — OpenClaw 9 层系统提示
- **OpenClaw-RPA：AI 录制→编译为确定性 Playwright 脚本，回放零 Token** — OpenClaw 作为 RPA 编译器
- **Karpathy LLM Wiki vs Garry Tan GBrain：日文 PKM 社区对比分析** — GBrain vs 其他 PKM 系统

**Garry Tan 的工程方法论模式**：发现 Agent 系统的某个具体痛点 → 用经典后端工程范式造一个内置组件 → 证明效果 → 简化升级路径。Minions 正是这个模式在"任务队列"维度的体现。

### 启示

1. **AI Agent 工程的下一个浪潮在基础设施层**：不在模型，不在 prompt，在队列/状态/持久化
2. **复用而非新造**：Postgres、SQL、ACID 这些 30 年的老东西比新组件更靠谱
3. **基础设施内置 vs 外挂**：内置（如 Minions in GBrain）让默认体验就是生产级
4. **可观测可干预**：运行中改参 + 断点续跑 = 长任务可信赖

## Related Topics

- **Resolvers：Agent系统的智能路由表** — Garry 的 Resolver 路由模式
- **Garry Tan GBrain：AI 原生个人知识库规格** — GBrain 知识库（Minions 宿主）
- **GStack困惑协议：元认知让AI知道自己不知道** — Garry 的混乱协议
- **OpenClaw Agent System Prompt 架构详解（9层）** — OpenClaw 系统提示架构
- **OpenClaw-RPA：AI 录制→编译为确定性 Playwright 脚本，回放零 Token** — OpenClaw 作为 RPA 编译器
- **Anthropic: Effective Harnesses for Long-Running Agents** — 长任务 Harness 设计（理论框架）
- **Harness Engineering：7层架构让AI Agent不再崩溃** — 7 层 Harness 架构
- **ByteDance DeerFlow 2.0超级Agent编排框架** — 字节 DeerFlow Harness（对比参考）
- **Scaling Agent Systems - Google/MIT 多Agent扩展量化规律** — Google/MIT 多 Agent 系统扩展研究
