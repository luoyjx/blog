---
title: "Claude Subagents vs Agent Teams：按上下文分而非按角色分的多 Agent 架构"
description: "Ask: what context does this subtask actually need?"
---

## Summary

Avi Chawla 厘清了 Claude 多 Agent 架构的两种范式——**Sub-Agents（隔离式并行）vs Agent Teams（通信式协作）**——它们看起来相似但解决完全不同的问题。**Sub-Agents 是 fire-and-forget**：每个 Agent 有独立上下文窗口、专属系统提示、特定工具集，做完一件事就消失，由 description 字段做路由。**Agent Teams 是 collaborative**：长期运行的 Agent 实例通过共享任务列表和直接 P2P 通信协调，teammate 间可以直接发现 blocker 并互相调整，不必所有事都通过 lead。**核心选择规则**：embarrassingly parallel 用 Sub-Agents，需要 ongoing negotiation 用 Agent Teams。**反直觉的设计原则**：**按上下文分解而非按角色分解**——按角色（planner/implementer/tester）分会变成"telephone game"，每次交接都丢信息；按上下文分则把需要重叠信息的子任务放一起。**多 Agent 系统并非默认更好**——Anthropic 内部经验：很多多 Agent pipeline 最后发现单 Agent + 更好提示就能匹配。三个失败模式：模糊任务描述（重复劳动）、验证 Agent 假装验证（false positive）、token 成本失控。

## Key Concepts

- **Sub Agents（隔离式并行）** — 独立上下文窗口 + 专属系统提示 + 特定工具集 + fire-and-forget；description 字段做路由
- **Agent Teams（通信式协作）** — Lead + Teammates + 共享任务列表；peer-to-peer 通信，blockedBy 等依赖字段做自动协调
- **按上下文分解原则** — 不要按角色（planner/implementer/tester）分，按"这个子任务真正需要什么上下文"分
- **telephone game 失效** — 按角色分会让信息在每次交接时降级，质量在每个边界下降
- **Description 路由信号** — Sub-Agent 的 description 是父 Agent 决定调用谁的关键，要具体
- **Embarrassingly Parallel 准则** — 独立研究流/代码探索/查询任务用 Sub-Agents
- **Ongoing Negotiation 准则** — 需要互相调和输出/一个发现改变另一个走向时用 Agent Teams
- **5 种编排模式** — Prompt Chaining / Routing / Parallelization / Orchestrator-Worker / Evaluator-Optimizer
- **多 Agent 三大失败模式** — 模糊任务描述、假装验证、token 失控
- **模型分层路由** — 简单工作走快/便宜模型，重要决定走最强模型
- **编码 Sub Agent 警告** — 并行写代码会产生不兼容假设；Sub-Agent for coding 应该回答问题/探索，而不是和主 Agent 同时写代码
- **起点：单 Agent** — 先用单 Agent 推到失败点，失败点告诉你下一步该加什么

## Tags

claude, multi-agent, subagents, agent-teams, orchestration, context-engineering, anthropic, patterns, design-principles

## Detailed Content

### 两种范式对比表

| 维度 | Sub-Agents | Agent Teams |
|------|-----------|-------------|
| 模式 | Fire-and-forget | Collaborative |
| 寿命 | 单 session 内 | 长期运行 |
| 上下文 | 隔离独立窗口 | 各自独立 + 共享任务列表 |
| 通信 | 不互相通信 | Peer-to-peer 直接通信 |
| 协调机制 | 父 Agent 路由 | Lead + 共享任务列表 + dependencies |
| 调用方式 | 不能直接调用 teammate | 可以直接和单个 teammate 对话 |
| 类比 | 雇外包做独立任务 | 组建同一房间内工作的团队 |
| 适用 | Embarrassingly parallel | Ongoing negotiation |

---

### Sub-Agents 的核心机制

```
[Parent Agent receives prompt]
  ↓
[Reads description field of each sub-agent]
  ↓
[Matches prompt keywords to descriptions]
  ↓
[Routes to one sub-agent]
  ↓
[Sub-agent runs in isolated context]
  ↓
[Returns distilled result]
  ↓
[Parent synthesizes]
```

**Description 字段的关键性**：
- 提到 "security vulnerabilities" → 路由到 `security-reviewer`
- 提到 "latency / bottlenecks" → 路由到 `performance-optimizer`
- **Description 模糊 = 路由失败**

**研究 Lead 类比**：你不读所有原始资料，而是把焦点问题委派给研究员，他们带回精炼发现，你综合输出。

---

### Agent Teams 的核心机制

```
[Team Lead] ← coordinates
  ├─ Teammate A (Frontend) ─┐
  ├─ Teammate B (Backend)  ─┼─ peer-to-peer messages
  └─ Teammate C (Tests)    ─┘
         ↑
[Shared Task List]
  - pending / in-progress / done
  - dependencies (e.g. blockedBy)
```

**关键差异**：
- **共享任务列表做协调**：测试 Agent 的 `blockedBy: backend` 字段会自动让它等后端完成
- **P2P 通信**：前端 Agent 发现 API 响应结构需要变 → 直接告诉后端 Agent → 后端调整，**不必通过 lead 中转**
- **直接 Teammate 访问**：用户可以直接和某个 teammate 对话，不必所有事都过 lead

---

### 选择决策树

```
任务进来
   ↓
能否拆成"独立的、互不干扰的"子任务？
   ├─ 能 → Sub-Agents（embarrassingly parallel）
   │       例：独立研究、代码库探索、批量查找
   │
   └─ 不能（子任务间需要持续协调）
       ↓
       是否需要"一个发现改变另一个走向"？
       ├─ 是 → Agent Teams（ongoing negotiation）
       │       例：前后端协同、需要中途同步状态
       │
       └─ 否 → 单 Agent + 更好提示（最常见的正确答案）
```

---

### 设计原则：按上下文分，不按角色分

#### 错误的"按角色分"

```
[Planner Agent] → 输出计划
   ↓ 交接（信息丢失）
[Implementer Agent] → 输出代码
   ↓ 交接（信息再丢）
[Tester Agent] → 输出测试

问题：每次交接都是 telephone game
- Implementer 没有 Planner 知道的全部上下文
- Tester 没有 Implementer 决定的细节
- 质量在每个边界下降
```

#### 正确的"按上下文分"

> **Ask: what context does this subtask actually need?**
>
> - 两个子任务需要深度重叠信息 → 同一 Agent
> - 两个子任务能用真正隔离的信息独立运作（且接口干净）→ 才能拆分

**实战示例**：实现一个 feature 的 Agent **应该同时写它的测试**——它已经有上下文了。把这两件事拆给两个 Agent 创造的交接成本远超并行收益。

> **Only separate when context can be genuinely isolated.**

---

### 5 种编排模式（Anthropic Building Effective Agents 同源）

| # | 模式 | 何时用 |
|---|------|--------|
| 1 | **Prompt Chaining** | 顺序步骤、每步处理上一步输出、顺序重要、步骤有依赖 |
| 2 | **Routing** | 分类器决定谁处理；简单 → 便宜模型，复杂 → 强模型，控成本 |
| 3 | **Parallelization** | 独立子任务并行执行；voting（同任务多次跑）或 sectioning（不同子任务并行）|
| 4 | **Orchestrator-Worker** | 中央 Agent 拆解任务、委派、综合；**Sub-Agents 与 Agent Teams 的主导架构** |
| 5 | **Evaluator-Optimizer** | 一个生成、一个评估反馈，循环；质量优于速度时用 |

---

### 何时不用多 Agent 系统

> **Teams have spent months building elaborate multi-agent pipelines only to discover that better prompting on a single agent achieved equivalent results.**
>
> **Start simple and add complexity only when you can clearly measure that it's needed.**

#### 多 Agent 真正赚钱的三种情况

1. **Context Protection**：子任务产出大量与主任务无关的信息，放到 sub-agent 防上下文膨胀
2. **True Parallelization**：独立研究/搜索任务，并行覆盖更多
3. **Specialization**：任务需要冲突的系统提示，或单 Agent 工具太多导致性能下降

#### 错误使用场景

- Agent 需要持续互相分享上下文 → 多 Agent 协调成本超过执行价值
- 子任务依赖关系比执行复杂度还高
- 任务足够简单，单 Agent + 好提示就够

#### 编码场景的特别警告

> **Parallel agents writing code make incompatible assumptions.** When you merge their work, those implicit decisions conflict in ways that are hard to debug.
>
> **Sub-agents for coding should answer questions and explore, NOT write code simultaneously with the main agent.**

这是个反复被踩的坑——多个 Agent 各自做了"对自己合理"的隐性假设，merge 时炸。

---

### 三大失败模式与对策

#### 失败 1：任务描述模糊 → Agent 重复劳动

**对策**：每个 Agent 必须给：
- Clear objective
- Expected output format
- Tools/sources guidance
- Explicit boundaries on what NOT to cover

#### 失败 2：验证 Agent 假装验证 → False positive

**对策**：模糊批准标准必杀。改用：
- "Run the full test suite"
- "Cover these specific cases: [list]"
- "Do NOT mark complete until each one passes"

#### 失败 3：Token 成本失控

**对策**：模型分层路由
- Capable model 用在真正重要的地方
- Routine work 走 fast/cheap 模型
- 设预算控制不让成本跑飞

---

### 实践指引

> Design around context boundaries, **not around roles or org charts**.
>
> **Start with a single agent.** Push it until you find where it breaks.
> That failure point tells you exactly what to add next.
>
> Add complexity only where it solves a real, measured problem.

---

### 与已有 wiki 的呼应

| 已有条目 | 互补点 |
|---------|--------|
| **Anthropic官方：构建有效AI Agent的设计模式与实践指南** | 5 种编排模式的源头（本文是简化解读）|
| **Anthropic：多智能体研究系统工程实践** | Anthropic Research 多 Agent 实战经验 |
| **Anthropic官方：多智能体协作5种主流模式怎么选、怎么用（宝玉译）** | 多 Agent 5 种模式的另一视角 |
| **Anthropic：AI Agent 有效上下文工程** | 上下文工程（context boundary 的理论基础）|
| **Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）** | Hermes 的 "Agent Teams + Summon + delegate_tool" 是这两种范式的实例化 |
| **Scaling Agent Systems - Google/MIT 多Agent扩展量化规律** | 多 Agent 系统扩展研究 |

## Related Topics

- **Anthropic官方：构建有效AI Agent的设计模式与实践指南** — 5 种编排模式的源头
- **Anthropic：多智能体研究系统工程实践** — Anthropic Research 多 Agent 实战
- **Anthropic官方：多智能体协作5种主流模式怎么选、怎么用（宝玉译）** — Multi-Agent 5 模式
- **Anthropic：AI Agent 有效上下文工程** — 上下文工程理论
- **Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）** — Hermes 全栈 Harness
- **Hermes Agent万字系统提示词深度解析** — Hermes 系统提示分析
- **Scaling Agent Systems - Google/MIT 多Agent扩展量化规律** — 多 Agent 系统扩展研究
- **Anthropic Claude Managed Agents：企业级 AI Agent 云托管服务** — Claude Managed Agents
- **Agent设计模式 - 上下文管理为核心的7大模式** — Lance Martin Agent 设计模式
- **Karpathy 的范式跃迁：Vibe Coding 是起点，Agentic Engineering 是终点** — Karpathy 范式跃迁视角
- **AHE：Agent 自进化优化 Harness 的可观测性框架** — AHE 自进化 Harness
- **三分钟大白话：什么是SubAgent？** — Sub-Agent 概念解释
