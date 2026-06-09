---
title: "Claude Code 的核心架构原则：Prompt Caching 决定一切"
description: "One of the most common ways people break prompt caching."
---

## Summary

Thariq（Claude Code 团队）公开 Claude Code 的核心工程原则——**整套 harness 围绕 prompt caching 设计**。Prompt caching 通过**前缀匹配（prefix matching）**复用上次请求的计算，长任务 Agent 产品的可行性几乎完全建立在它之上。**关键约束**：前缀任何位置发生变化都会让其后所有 token 失效。**五条经验**：① 静态内容前置（System Prompt → Tools → CLAUDE.md → Session → Messages），追求最大前缀共享；② 用 message（如 `<system-reminder>`）传递更新而非改 system prompt；③ 不要中途换模型（缓存按模型分），切换用 sub-agent handoff；④ 不要中途增删工具（用 EnterPlanMode/ExitPlanMode 工具切状态、用 defer_loading 替代移除）；⑤ Compaction 用 cache-safe forking（前缀与父对话完全一致，只追加 compaction prompt）。**最反直觉的发现**：在 100K Opus 对话中切换到 Haiku 答简单问题，**比让 Opus 继续答更贵**——因为要重建 Haiku 的 prompt cache。**运维要求**：把 cache hit rate 像 uptime 一样监控，cache miss 率波动几个百分点即按 SEV 处理。**Plan Mode 设计是最好的范例**：不切工具集，把 Plan Mode 本身做成工具，cache 完全不破。**金句**：Claude Code is built around prompt caching from day one — you should do the same if you're building an agent.

## Key Concepts

- **前缀匹配缓存** — Prompt caching 通过 prefix matching 工作，前缀任何位置变化都会让其后失效；这是 Claude Code 一切设计的底层约束
- **Cache Rules Everything Around Me** — 工程界经典格言在 Agent 时代的回响；长任务 Agent 的可行性建立在 caching 之上
- **静态在前动态在后** — System Prompt → Tools → CLAUDE.md → Session → Messages，追求最大前缀共享
- **system reminder 模式** — 不改 system prompt 传更新，用消息层注入（如时间变化、文件修改）
- **模型间缓存隔离** — Prompt cache 按模型分；100K Opus 对话切 Haiku 答简单问题反而更贵
- **Sub Agent Handoff** — 需要换模型时不在同 session 切，用 sub-agent 准备 handoff 消息
- **Plan Mode 即工具** — 不切换工具集进入 plan mode，把 EnterPlanMode/ExitPlanMode 做成工具本身
- **defer_loading 替代移除** — 工具不移除而用轻量 stub（defer_loading: true）+ ToolSearch 按需展开 schema
- **Cache Safe Forking** — Compaction 等 fork 操作必须复用父对话的完整前缀（同 system + 同 tools + 同 history），只追加新内容
- **Compaction Buffer** — 上下文窗口预留空间给 compaction prompt 和 summary 输出
- **缓存命中率即可用性指标** — 把 cache hit rate 当 uptime 监控，miss 率几个百分点波动即 SEV
- **token 顺序的脆弱性** — 工具顺序非确定性、时间戳进 system prompt、参数变化都会破缓存
- **Autonomous Plan Mode 入口** — 因为 Plan Mode 是工具，Agent 能自主进入；这是 cache-friendly 设计的副作用红利

## Tags

claude-code, prompt-caching, prefix-matching, agent-engineering, harness-design, plan-mode, tool-search, compaction, cost-optimization, anthropic

## Detailed Content

### 核心命题：Cache 是 Agent 工程的底层约束

```
[Long-running Agentic Product]
            ↓
依赖于
            ↓
[Prompt Caching]
            ↓
通过
            ↓
[Prefix Matching]
            ↓
约束
            ↓
[整个 Harness 设计]
```

**为什么这件事重要**：
- 长任务 Agent 每轮都要把整个对话历史传回模型
- 没有 caching → 每轮成本 × 轮数 = 不可负担
- 有 caching → 第二轮起仅付增量成本
- **Claude Code 的订阅 plan 慷慨度直接挂钩 cache hit rate**

---

### 五条经验（含设计哲学）

#### 经验 1：静态在前，动态在后

**正确顺序**（Claude Code 实际架构）：

```
1. Static system prompt & Tools     ← 全局缓存（跨用户跨 session）
2. CLAUDE.md                         ← 项目级缓存
3. Session context                   ← session 内缓存
4. Conversation messages             ← 增量
```

**反例（破坏缓存的常见错误）**：
- 静态 system prompt 里嵌时间戳
- 工具定义顺序非确定性变化
- 工具参数动态变化（如 AgentTool 能调用的 sub-agent 列表）

**设计含义**：**任何带有时间属性、上下文属性的内容，都不要塞进前缀。**

#### 经验 2：用 message 传更新

**错误做法**：
```
更新时间 → 改 system prompt → 整个 cache 失效
```

**正确做法**：
```
更新时间 → 在下一条 user message 或 tool result 注入
          <system-reminder>It is now Wednesday</system-reminder>
          → 前缀不变，cache 命中
```

**Claude Code 的 system-reminder 模式**就是这条经验的产物——你看到的 `<system-reminder>` 标签是 cache-friendly 的更新通道。

#### 经验 3：不要中途换模型

**反直觉数学**：
- 你在 100K Opus 对话中
- 想问个简单问题想用 Haiku 省钱
- **结果**：切换到 Haiku 比让 Opus 继续答**更贵**
- **原因**：Haiku 没有这个 100K 的 cache，要重建

**正确做法 — Sub-Agent Handoff**：

```
[主 session, Opus, 100K cached]
   ↓
Opus 准备 handoff 消息（任务描述、必要上下文）
   ↓
[Sub-agent, Haiku, 干净上下文]
   ↓
处理任务
   ↓
返回结果给主 session
```

**Claude Code 的 Explore agent 用的就是这个模式**（Haiku 处理代码探索）。

#### 经验 4：不要中途增删工具

> **One of the most common ways people break prompt caching.**

直觉上觉得"该给模型的工具就给"是对的，但**工具是缓存前缀的一部分**——增删工具 = 让前缀变 = 整个对话的 cache 失效。

##### 范例 1：Plan Mode 设计

**错误的直觉做法**：
```
进入 plan mode → 把工具集换成只读 → cache 失效
```

**Claude Code 的实际做法**：
```
始终保留所有工具
将 EnterPlanMode 和 ExitPlanMode 做成工具本身
进入 plan mode → 模型收到 system message 说明 plan mode 规则
退出 plan mode → 调用 ExitPlanMode 工具
工具集从未变化 → cache 完全保留
```

**意外红利**：因为 `EnterPlanMode` 是工具，**模型可以自己检测到难题时主动进入 plan mode**——cache-friendly 设计带来了 autonomous 能力。

##### 范例 2：Tool Search 设计

**问题**：Claude Code 接 MCP 后可能有几十个工具，每次请求全带成本太高。

**错误做法**：动态裁剪 → cache 破

**Claude Code 解法 — defer_loading**：

```json
{
  "tools": [
    {"name": "github.createPR", "defer_loading": true},
    {"name": "github.listIssues", "defer_loading": true},
    ...
    {"name": "ToolSearch", "defer_loading": false}
  ]
}
```

- **始终发送轻量 stub**（只有 name，无完整 schema）
- 模型通过 `ToolSearch` 工具按需"发现"
- 选中的工具才加载完整 schema
- **缓存前缀稳定**：相同 stub 始终以相同顺序出现

#### 经验 5：Cache-Safe Forking（Compaction 范例）

**问题**：上下文窗口满了 → 需要 compaction（总结对话） → 怎么做？

**错误的简单实现**：
```
独立 API 调用 + 不同 system prompt + 无工具 + 整个对话历史
→ cached prefix 完全不匹配
→ 全部 input token 按 full price 收费
→ 用户付出巨额额外成本
```

**Claude Code 的 Cache-Safe Forking**：

```
[父对话]
  System prompt: A
  Tools: T
  Messages: m1, m2, ..., mn

[Compaction 请求]
  System prompt: A         ← 完全相同
  Tools: T                  ← 完全相同
  Messages: m1, m2, ..., mn, [compaction prompt]   ← 仅追加
              ↑
        与父对话最后一次请求几乎一致
              ↓
        cached prefix 命中
              ↓
        只为 compaction prompt 付费
```

**代价**：需要预留 compaction buffer（窗口空间），让 compaction prompt 和 summary 输出有地方放。

**Anthropic 已把这个模式做进 API**——开发者不必自己实现，可以直接调用。

---

### 关键运维原则

#### Cache Hit Rate = 可用性指标

> **Monitor your cache hit rate like you monitor uptime.**
>
> We alert on cache breaks and treat them as incidents.

具体做法：
- 监控 cache hit rate
- miss 率波动几个百分点 → 触发 SEV（Severity Event）
- 像处理服务宕机一样紧急处理

**为什么这么严格**：
- cache miss 直接放大 input token 成本（数十倍）
- 长 session 中 miss 一次 = 重建整个 100K+ 前缀
- 影响延迟（用户感受到的速度）

#### 部署灰度的 cache 风险

每次更新 system prompt / 工具集 → 全用户 cache 失效 → 一波成本峰值。

部署节奏需要考虑：
- 何时部署？
- 怎样让用户在低峰期重建 cache？
- 是否需要 A/B test 缓冲？

---

### 设计哲学：用工具建模状态

#### 核心模式

> **Use tools to model state transitions, NOT to change the tool set.**

| 错误模式 | 正确模式 |
|---------|---------|
| 进入 plan mode → 切只读工具 | 加 EnterPlanMode 工具 |
| 进入安全模式 → 移除危险工具 | 加 SafeMode 工具 |
| 进入 debugging → 切诊断工具集 | 加 ToggleDebugMode 工具 |

**抽象原则**：把"模式切换"这种状态变化，编码为**工具调用动作**，而不是**配置变化**。

#### 副作用：Agent 自主性提升

因为状态切换是工具，Agent 能自己调用 → **自主决策入场 / 出场**：
- 检测到难题 → 自己进 plan mode
- 任务完成 → 自己退出 plan mode
- 这是 cache-friendly 设计带来的智能化红利

---

### 与近期知识库的呼应

#### 与 **Claude Code Token 缓存深度解析：缓存命中节省 80% 成本** 的关系

知识库已有的 token caching 深度文章和本条形成**理论 + 实战**互补：
- token caching 文章 → caching 机制和 API 细节
- **本条** → 实战中踩过的坑和设计哲学

#### 与 **Claude Code架构拆解：Agent Harness的四层蓝图** 的关系

Claude Code 4 层架构（Model / Context / Harness / Infrastructure）中，**Context 层和 Harness 层的所有设计决策都受 caching 约束驱动**——本条揭示了"为什么 Claude Code 的 Harness 长这样"。

#### 与 **Anthropic：AI Agent 有效上下文工程** 的关系

上下文工程的"static / dynamic 分离"原则在本条得到了具体落地：**caching 是 static/dynamic 分离的实际驱动力**，不只是理论上的好习惯。

#### 与 **Claude Code Session管理：1M上下文的双刃剑** 的关系

那篇是 Thariq 后续作品，讲 1M context 下的 session 管理（Rewind / Compact / Subagents）。本条是更早期的奠基——**1M context 之所以能可行，正是因为有了这套 cache-safe 的 harness 设计**。

#### 与 **Claude Code省Token指南：慎用1M上下文，正确理解缓存机制（宝玉）** 的关系

省 token 的具体技巧文章可以放本条作为"为什么这样省 token 的根本原因"。

#### 与 **Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）** 的关系

Hermes 横向对比表里 Claude Code 的"自动压缩 + 按需加载 + 1M token"——本条解释了**这套设计背后是 cache 优化驱动**，不是单独的功能堆砌。

---

### 战略启示

#### 1. Caching 不是优化，是架构约束

很多人把 caching 当作"做完功能后再加的优化"。Thariq 的核心信息是：**Claude Code 是从 day one 就围绕 caching 设计 harness**——caching 决定了哪些功能能做、怎么做、用什么数据结构。

> **If caching is an afterthought, your agent's economics will not work at scale.**

#### 2. 反直觉数学需要重新建模

| 直觉 | 反直觉真相 |
|------|----------|
| 简单问题用便宜模型省钱 | 长 session 内换模型可能更贵 |
| 用户进 plan mode 就该限制工具 | 限制工具会破 cache |
| 工具用不上就移除 | 移除工具破 cache，应该 defer |
| Compaction 是简单的"总结再开新 session" | 简单实现会让 compaction 比对话本身还贵 |

#### 3. 设计模式：用工具建模一切状态

把 mode、permissions、状态切换都做成工具调用——不只是 cache-friendly，还能让 Agent 自主管理状态。

#### 4. 监控指标的转移

传统服务监控 uptime / latency / error rate；Agent 服务**还要加 cache hit rate**——它直接决定经济模型。

---

## Related Topics

- **Claude Code Token 缓存深度解析：缓存命中节省 80% 成本** — Claude Code Token Caching 深度解析（理论篇）
- **Claude Code架构拆解：Agent Harness的四层蓝图** — Claude Code 4 层架构
- **Claude Code Session管理：1M上下文的双刃剑** — Thariq 后续作品：1M context 的 session 管理
- **Claude Code省Token指南：慎用1M上下文，正确理解缓存机制（宝玉）** — 省 token 的具体技巧
- **Claude Code Best Practices - 14 Key Practices** — Claude Code 14 个最佳实践
- **Anthropic：AI Agent 有效上下文工程** — 上下文工程理论
- **Anthropic: Effective Harnesses for Long-Running Agents** — 长任务 Harness 设计
- **Anthropic: Harness Design for Long-Running Application Development** — 长任务 App Harness
- **anthropic managed agents** — Managed Agents
- **Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）** — Hermes 全栈 Harness 横向对比
- **AHE：Agent 自进化优化 Harness 的可观测性框架** — AHE 自进化 Harness
- **Claude Subagents vs Agent Teams：按上下文分而非按角色分的多 Agent 架构** — Subagents vs Agent Teams
- **Anthropic：多智能体研究系统工程实践** — Anthropic Research 多 Agent
- **Anthropic官方：如何使用CLAUDE.md文件定制Claude Code** — CLAUDE.md 用法（cache 层级中的项目层）
