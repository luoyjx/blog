---
title: "Agentic Design Patterns（Antonio Gullí）：Agent 四个 Level + 21 种模式的方法论书"
description: "任务越拆越碎，通信成本越高，到一定程度 Supervisor 模式反而比层级式更有效率。"
---

## Summary

Google 工程总监 Antonio Gullí 2025 年 Springer 出版的 **453 页方法论书**（21 种 Agent 设计模式），通过 Yanhua 的书评进入知识库。**核心洞察**：大多数人在用的"AI"只是 **Level 0**（裸 LLM），离真正的 Agent 还差三级——Level 1（工具使用者，自己判断何时调用）、Level 2（战略思考者，规划 + Context Engineering + 自我反思）、Level 3（多 Agent 协作）。**Context Engineering 是书中最被低估的概念**：不是 Prompt 怎么写，是"问之前 Agent 眼前摆什么"——四层（system prompt / 外部数据 / 隐式数据 / 反馈回路）。**Reflection 模式最有实战价值**：Producer 和 Critic 必须是两个不同 system prompt 的 Agent（同 persona 审自己有盲区），最大迭代 3 次，不追求完美。**Multi-Agent 反过度复杂化**：六种通信拓扑（单 Agent / P2P / Supervisor / Supervisor-as-Tool / 层级式 / 自定义混合），80% 场景 Level 2 单 Agent + Reflection 已够。**Memory 三层**：Session（对话窗口）/ State（任务进行中数据）/ Memory（跨会话长期记忆）。**最离谱的未来假设是"变形 Multi-Agent"**——你只声明目标，系统自动生成、调整、重组 Agent 团队，人类完全在循环外。**Yanhua 的三条落地建议**：① 给现有 Agent 加 Critic，② 做 Context Engineering 而非只做 Prompt Engineering，③ 先把单 Agent 做到 Level 2 再考虑 Multi-Agent。

## Key Concepts

- **Agent 四级分类** — Level 0 裸 LLM / Level 1 工具使用者 / Level 2 战略思考者 / Level 3 多 Agent 协作
- **Level 1 自我判断门槛** — 不是"能调接口"，而是"自己意识到需要调"
- **Context Engineering 四层** — system prompt / 外部数据 / 隐式数据 / 反馈回路
- **Context Engineering ≠ Prompt Engineering** — 前者管"环境呈现什么"，后者管"怎么问"
- **短小聚焦有力的上下文** — 书里的核心格言"To achieve maximum accuracy, give it short, focused, powerful context"
- **Producer Critic Reflection** — 两个不同 system prompt 的 Agent；同 persona 审自己必有盲区
- **Reflection 成本约束** — 每轮新调用 + 上下文窗口被前期版本占满，建议最大 3 次迭代不追求完美
- **Multi Agent 六种拓扑** — 单 Agent / P2P / Supervisor / Supervisor-as-Tool / 层级式 / 自定义混合
- **反过度 Multi Agent** — 大多数人 80% 时间花通信协议，先问"真的需要多 Agent 吗？"
- **Memory 三层模型** — Session（会话）/ State（任务进行中）/ Memory（持久化跨会话）
- **变形 Multi Agent** — 目标驱动、自我重组的 agent 团队，人类完全在循环外
- **Producer Critic = 即插即用** — 任何 workflow 末尾加 Critic，质量翻倍
- **Level 2 已够大多数场景** — 单 Agent + Reflection + Context Engineering + Memory 覆盖 80% 需求

## Tags

agentic-design-patterns, antonio-gulli, agent-levels, context-engineering, reflection, multi-agent, memory, book-summary, google-adk, springer-2025, agent-methodology

## Detailed Content

### Agent 四级分类详解

| Level | 定义 | 判别标志 | 例 |
|-------|------|---------|---|
| **Level 0** | 裸 LLM，没工具/记忆/行动 | 问 2026 奥斯卡最佳影片，它猜 | ChatGPT 直接对话 |
| **Level 1** | 工具使用者 | **自己意识到**需要调用工具（非人类告诉它）| 用户问"最近有什么新剧"→ Agent 主动调搜索 |
| **Level 2** | 战略思考者 | 规划 + Context Engineering + 自我反思 | 找咖啡店：先地图→筛街道→喂本地搜索 |
| **Level 3** | 多 Agent 协作 | Agent 之间通信、状态同步、冲突处理 | 新产品发布：PM Agent + 研究 Agent + 设计 Agent + 营销 Agent |

**关键判断标准**："Agent 不好用"九成是模型在 Level 0/1 还以为是在 Level 2/3 用。

---

### Context Engineering：四层信息架构

```
[ 第 1 层: System Prompt ]
  - 角色定义、语气、边界
  - 大多数人只写这一层 ← 问题所在

[ 第 2 层: 外部数据 ]
  - RAG 检索文档
  - 工具调用返回值
  - 实时 API 数据
  - 关键陷阱：如何喂才不淹没模型

[ 第 3 层: 隐式数据 ]
  - 用户身份
  - 交互历史
  - 环境状态
  - 例：发邮件给 John → 知道 John 是谁、明天会议是什么

[ 第 4 层: 反馈回路 ]
  - 输出后自动评估
  - 调整下次的 context 策略
  - 工程化：Google Vertex AI Prompt Optimizer
```

**与 Harness Engineering 的对应**：Yanhua 的核心洞察——**Context Engineering 是 Harness Engineering 在 prompt 层面的映射**。Harness 管"赛道设计"，Context 管"赛车眼前看到什么"。

---

### Producer-Critic Reflection 完整模板

```python
# Producer
"You are a Python developer. Write a factorial function.
 Handle edge cases and exceptions."

# Critic (critically different system prompt!)
"You are a meticulous senior engineer. Review line by line:
 bugs, style, missing edge cases, improvements.
 If perfect → output CODE_IS_PERFECT.
 Otherwise → list all issues."

# Loop
for i in range(MAX_ITER):  # 推荐 MAX_ITER = 3
    code = producer.generate(task, previous_feedback)
    feedback = critic.review(code)
    if "CODE_IS_PERFECT" in feedback:
        break
```

**关键约束**：
1. **两个不同的 system prompt** — 同 persona 必有盲区
2. **最大迭代 3 次** — 不追求完美
3. **Critic 输出明确停止信号**（CODE_IS_PERFECT 这种 sentinel）
4. **场景泛化**：代码、写作、计划、文档摘要、逻辑题——七种应用

---

### Multi-Agent 六种通信拓扑

| 拓扑 | 适合 | 风险 |
|------|------|------|
| **单 Agent** | 任务可拆为独立子问题 | 无 |
| **Peer-to-Peer** | 去中心化、容错性优先 | 协调成本高、容易乱 |
| **Supervisor** | 层级清晰、可管理 | Supervisor 是单点 + 性能瓶颈 |
| Supervisor-as-Tool | Supervisor 变体 | 同上 + 工具抽象成本 |
| 层级式 | 多级 Supervisor | 通信成本高 |
| 自定义混合 | 复杂特殊场景 | 设计与维护成本最高 |

**反过度复杂化原则**：
> 任务越拆越碎，通信成本越高，到一定程度 **Supervisor 模式反而比层级式更有效率**。

**80% 场景的真问题**：不是"用哪种 Multi-Agent 拓扑"，而是"这个任务真的需要多个 Agent 吗？"——往往 **Level 2 单 Agent + Reflection 已够**。

---

### Memory 三层模型

| 层 | 寿命 | 内容 | 实现 |
|---|------|------|------|
| **Session** | 当前对话 | 上下文窗口内容 | LLM 原生 context |
| **State** | 当前任务 | 任务进行中数据：在做什么、做到哪、中间产物 | Google ADK State 机制 |
| **Memory** | 跨会话 | 用户偏好、学到的经验、历史决策 | 数据库 / 向量库 + 语义检索 |

**Memory 设计的真问题**：不只是"存下来"，而是 **"存什么、什么时候存、怎么检索"** 的整套策略。
- 存太多 → 噪声大
- 存太少 → 不够用

---

### 变形 Multi-Agent（书末最大胆假设）

**普通 Multi-Agent**：人定义 Agent 团队，Agent 执行任务。

**变形 Multi-Agent**：

```
用户：做一个卖精品咖啡的电商生意。
   ↓
系统自动决定第 1 轮 Agent 团队：
  - 市场研究 Agent
  - 品牌 Agent
   ↓
[ 跑数据 → 系统判断 ]
   ↓
"品牌 Agent 不够用，拆为三个："
  - Logo 设计 Agent
  - 建站 Agent
  - 供应链 Agent
   ↓
[ 建站 Agent 成瓶颈 → 系统复制 3 个并行 ]
   ↓
持续自动调优每个 Agent 的 prompt
不断重组团队架构
```

**与 Karpathy AutoResearch 的对比**：
- AutoResearch：用户写 program.md → 系统执行计划
- **变形 Multi-Agent**：**连"计划是什么"都由系统生成**——人类只声明目标

这是 **Karpathy 的范式跃迁：Vibe Coding 是起点，Agentic Engineering 是终点** 提到的范式跃迁向更远一步推进的设想。

---

### 三条 Yanhua 落地建议

| 建议 | 难度 | 收益 |
|------|------|------|
| **1. 加 Critic** | 低（即插即用）| 质量往往翻倍 |
| **2. Context Engineering** | 中（重新整理 AGENTS.md）| 显著提升一致性 |
| **3. 先做好 Level 2 单 Agent** | 高（架构反思）| 避免过度工程的 80% 痛苦 |

---

### 与已有 wiki 的呼应（Agent 设计的方法论光谱）

| 已有条目 | 互补点 |
|---------|-------|
| **Anthropic官方：构建有效AI Agent的设计模式与实践指南** | Anthropic 5 模式（这本书 21 模式的子集）|
| **Tool / Skill / Subagent 决策框架：Anthropic Applied AI 团队的 Agent 分解方法论** | Tool/Skill/Subagent 三选一（这本书 Level 2 内部）|
| **Claude Subagents vs Agent Teams：按上下文分而非按角色分的多 Agent 架构** | Sub-Agent vs Agent Team（这本书 Multi-Agent 拓扑的细化）|
| **Harness Engineering：7层架构让AI Agent不再崩溃** | Harness 工程（这本书 Context Eng 的"轨道"层）|
| **Anthropic：AI Agent 有效上下文工程** | Anthropic 自家 Context 工程文（同主题不同视角）|
| **Karpathy 的范式跃迁：Vibe Coding 是起点，Agentic Engineering 是终点** | Karpathy 范式跃迁（这本书第五个假设的呼应）|
| **ai memory tools two camps.md** | 内存阵营（这本书 Memory 三层的对照）|
| **Anthropic: Effective Harnesses for Long-Running Agents** | 长任务 Harness（这本书 Memory 层 + State 层）|
| **本条** | **方法论总框架（Level 分类 + 21 模式 + 落地建议）**|

形成完整的"理论框架 ←→ 具体模式 ←→ Anthropic 实践 ←→ Claude Code 落地 ←→ 多 Agent 应用"知识网。

---

### 战略观察

#### 1. 这本书的真正价值

**不是"全面"，是"地图"**——给那些在 Agent 上踩过坑的人提供模式名字和分类。

> "你过去半年在 Agent 上踩的坑，都有人整理成模式了。你不需要再去发明 Reflection，不需要再去猜 Memory 该怎么分层。"

#### 2. Level 分类对个人的诊断价值

最有用的实操问句：**"我的 Agent 到了 Level 几？"**
- Level 0 → 加工具（API、搜索、数据库）
- Level 1 → 加规划 + Context Engineering
- Level 2 → 加 Reflection + Memory
- Level 3 → 拆 Agent 之前**先确认 Level 2 已用尽**

#### 3. Context Engineering = 下一代 Prompt Engineering

Prompt Engineering 走到瓶颈了——大家都在"写 prompt"。**真正还有杠杆的是"准备 context"**：把外部数据、隐式数据、反馈回路系统化。

这与 **Anthropic：AI Agent 有效上下文工程** 完全对齐——**Context Engineering 不是新词，是 Anthropic 半年前就开始倡导的方向，这本书给它一个完整的工程化框架**。

#### 4. 与本知识库 SKILL 的同源性

知识库 `~/knowledge_base/SKILL.md` 的设计：
- raw/ = 任务无关的原始材料（≈ external data）
- wiki/ = 提炼后的结构化知识（≈ contextualized data）
- log.md = 操作历史（≈ session memory）
- SKILL.md 本身 = 任务编排规则（≈ system prompt）

本质就是 Context Engineering 四层的实例化。

#### 5. 反 Multi-Agent 鼓噪的清醒声音

整个行业都在吹 Multi-Agent，但这本书 + Anthropic Will 的实战（**Tool / Skill / Subagent 决策框架：Anthropic Applied AI 团队的 Agent 分解方法论**）说的都是同一件事：**先把单 Agent 做到 Level 2，大多数人卡在 Level 0/1 还在想 Multi-Agent 拓扑**。

## Related Topics

- **Tool / Skill / Subagent 决策框架：Anthropic Applied AI 团队的 Agent 分解方法论** — Anthropic Will 的 Tool/Skill/Subagent 决策框架（实操层）
- **Anthropic官方：构建有效AI Agent的设计模式与实践指南** — Anthropic 5 编排模式
- **Claude Subagents vs Agent Teams：按上下文分而非按角色分的多 Agent 架构** — Sub-Agent vs Agent Team 架构辨析
- **Anthropic：多智能体研究系统工程实践** — Anthropic Research 多 Agent
- **Anthropic：AI Agent 有效上下文工程** — Anthropic Context Engineering 总论
- **Harness Engineering：7层架构让AI Agent不再崩溃** — Harness Engineering 总论
- **Karpathy 的范式跃迁：Vibe Coding 是起点，Agentic Engineering 是终点** — Karpathy 范式跃迁
- **AI记忆工具两大阵营：Memory Backends vs Context Substrates** — Memory 两大阵营
- **Anthropic: Effective Harnesses for Long-Running Agents** — 长任务 Harness
- **AHE：Agent 自进化优化 Harness 的可观测性框架** — AHE 自进化 Harness
- **Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）** — Hermes 全栈对比
- **大模型的下半场：从 Reasoning Thinking 到 Agentic Thinking** — Reasoning 到 Agentic 思考
- **All Agentic Architectures - 17种AI Agent架构完整实现** — 17 种 Agent 架构
- **Anthropic 工程师 30 分钟实战：1 人驱动 5 个并行 Agent** — 5 Agent 实战 demo
