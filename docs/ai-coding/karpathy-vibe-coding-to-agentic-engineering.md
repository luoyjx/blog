---
title: "Karpathy 的范式跃迁：Vibe Coding 是起点，Agentic Engineering 是终点"
description: "过去说 10x engineer 已经不够了。 真正掌握 agentic engineering 的人，效率提升远远不止 10 倍。"
---

## Summary

Saito 复盘 Karpathy 最新一期访谈：**Karpathy 自己在 2024 年提出 Vibe Coding 后，2025 年 12 月遇到了"作为程序员从未感觉这么落后过"的真实分水岭**——最新模型可以连续完成大块工作几乎不需要纠正。核心论点：**AI 正在从加速工具变为全新计算范式**。框架是 **Software 3.0**——prompt + context window 本身就是编程，LLM 是新的"计算机"，编程从写代码变为组织输入。两个直观案例：OpenClaw 安装从复杂 shell 脚本变为一段 prompt；MenuGen 从完整应用变为拍照丢给 Gemini。理解能力的两把钥匙：**Jagged Intelligence（锯齿状智能）** 解释能力极不均匀，**Verifiability（可验证性）** 解释为什么差异如此巨大——可验证的任务能被 RL 反复优化。**Vibe Coding（降门槛）和 Agentic Engineering（保标准+提百倍速）是两个阶段**，10x engineer 已不够。给创业者的方向：找"**高度可验证但还未被重点优化**"的空白领域。人类的护城河缩到三个：**品味、判断、理解**。"理解无法外包，但思考过程可以外包"。

## Key Concepts

- **Vibe Coding** — Karpathy 2024 提出，"凭感觉写代码"，门槛大幅降低的写代码方式
- **Agentic Engineering** — 2025-12 进化版本，保持专业软件标准（安全/可靠）+ agent 提速远超 10×
- **Software 3.0** — 三代范式：1.0 手写规则 → 2.0 训神经网络 → 3.0 **prompt + context window 本身就是编程**
- **LLM 是新计算机** — 编程从"写精确程序"变为"在信息空间组织输入"
- **Jagged Intelligence 锯齿状智能** — 能力在不同任务上极不均匀（代码强 vs 50米开车走路弱）
- **Verifiability 可验证性** — 解释 Jagged Intelligence 的根因：可验证 = 能被 RL 反复优化
- **2025 12 分水岭** — Karpathy 个人体验的真实拐点，"想不起上次需要改 agent 是什么时候"
- **10x 不够论** — 真正掌握 agentic engineering 的工程师效率远超 10×
- **品味 判断 理解** — 人类剩下的核心能力：方向、审美、把控
- **理解外包不了，思考可以外包** — 用 LLM 加速建立理解，但理解本身只能由人完成
- **可验证空白区** — 创业方向：找"高度可验证但还未被大模型公司重点优化"的领域
- **Agent native 设计** — 系统从一开始就为 agent 设计，prompt/传感器/执行接口直接服务 agent

## Tags

karpathy, vibe-coding, agentic-engineering, software-3.0, jagged-intelligence, verifiability, paradigm-shift, ai-native, agent-design

## Detailed Content

### 时间线：从工具到范式

```
2024-Q3：Karpathy 提出 Vibe Coding（凭感觉写代码）
   ↓
2025-12：分水岭——agent 能连续完成大块工作几乎不需纠正
   ↓
2026-Q2：Karpathy 公开承认"作为程序员从未感觉这么落后过"
   ↓
现在：从 Vibe Coding 跃迁到 Agentic Engineering
```

**关键变化**：从"写一段、人改一段"到"一直让它做、它一直对"。

---

### Software 三代范式

| 范式 | 核心动作 | 编程对象 |
|------|---------|---------|
| 1.0 | 手写规则代码 | 计算机指令 |
| 2.0 | 准备数据集训练神经网络 | 权重 |
| **3.0** | **prompt + context window** | **信息空间** |

**Software 3.0 的认知颠覆**：
- LLM 不只是工具，而是一台**新的"计算机"**
- 你不再写精确程序，而是**通过上下文去"指挥"它完成计算**
- 编程的本质从**写代码**变为**组织输入**

#### 两个案例的范式对比

| 任务 | 旧范式（1.0/2.0）| 新范式（3.0）|
|------|----------------|-------------|
| OpenClaw 安装 | 跨平台 shell 脚本，处理环境差异 | 一段 prompt 给 agent |
| MenuGen 应用 | OCR + 图像生成 + Vercel 部署 | 拍照丢给 Gemini，一句指令 |

**关键洞察**：很多现有软件其实是**旧范式下的中间产物**——在新范式里**已经没有存在的必要**。

---

### Jagged Intelligence + Verifiability：理解能力的两把钥匙

#### Jagged Intelligence（锯齿状智能）

模型能力极不均匀：

| 维度 | 表现 |
|------|------|
| 代码 / 数学 / 高度可验证领域 | 极强 |
| 常识 / 审美 / 生活判断 | 很弱 |

**经典反例**："50 米去洗车，应该开车还是走路？" → 模型可能给出离谱答案。

#### Verifiability（可验证性）解释了 Jagged

```
[ 可验证任务 ]                  [ 不可验证任务 ]
  ↓                              ↓
有明确正确/错误                  没有标准答案
  ↓                              ↓
能构建 RL 环境                   无法用 RL 反复打磨
  ↓                              ↓
模型反复优化                      只靠预训练
  ↓                              ↓
能力快速爆发                      进步缓慢
  ↓                              ↓
重构十万行代码 / 发现零日漏洞    50 米开车还是走路出错
```

这一对概念几乎能预测未来 2-3 年所有 AI 应用的发展速度。

---

### Vibe Coding vs Agentic Engineering：两阶段

| 维度 | Vibe Coding | Agentic Engineering |
|------|-------------|---------------------|
| 受众 | 所有人（包括非程序员）| 专业工程师 |
| 目标 | 大幅降低门槛 | 数量级提速 |
| 标准 | 能跑就行 | **保持专业软件标准（安全/可靠）** |
| 工作流 | 凭感觉写、随时改 | 系统化的 agent 协作 |
| 提速倍数 | 数倍 | **远超 10×** |

> **过去说 10x engineer 已经不够了。** 真正掌握 agentic engineering 的人，效率提升远远不止 10 倍。

---

### 人类剩下什么？

**短期三大能力**：

| 能力 | 含义 |
|------|------|
| **品味（Taste）** | 知道什么是好、什么不行 |
| **判断（Judgment）** | 选择方向、做权衡 |
| **理解（Understanding）** | 把握整体、识别异常 |

**关键反例**：agent 用 email 匹配 Stripe 和 Google 账号导致资金关联失败——**常识错误必须由人兜底**。

#### 关键格言

> **理解无法外包，但思考过程可以外包。**

含义：
- LLM 可以代替你做大量推导和探索（思考过程外包）
- 但**最终是否真懂、是否做对判断，必须自己完成**（理解不可外包）

---

### 给创业者的方向

> **找"高度可验证但目前还没被模型重点优化"的领域。**

为什么这是好方向？

```
高度可验证 → 能构建 RL 环境
未被重点优化 → 数据/反馈环节空白
  ↓
进入 → 投入 RL → 能力爆发
  ↓
形成数据飞轮护城河
```

**反例**：在已经被大模型公司重点投入的赛道（通用编程、通用对话）竞争，是 zero-sum 游戏。

**正例的特征**：
- 任务结果有客观判定标准
- 训练数据稀缺或专有
- 大公司没有强动机覆盖

---

### 关于未来的判断

#### 1. Agent-native 设计

系统从一开始就为 agent 设计，**很多内容不再是给人类阅读，而是直接服务于 agent**：
- prompt（人类可读但是为 agent 准备）
- 传感器（agent 的输入接口）
- 执行接口（agent 的动作接口）

#### 2. Agent 间通信

agent 代表个人或组织，**彼此之间直接沟通并完成事务**——MCP / A2A 协议是这个方向的早期形态。

#### 3. 教育的重心转移

| 旧教育 | 新教育 |
|--------|--------|
| 记忆 API 细节 | 培养理解和判断 |
| 学语法 | 学组织上下文 |
| 优化具体任务执行 | 优化"想清楚要什么" |

API 细节 agent 比人记得更清楚——记忆型学习被持续贬值。

---

### 战略启示

#### 1. 范式跃迁的判断

如果 2025-12 的"分水岭"判断成立，那么：
- 2026 年专业软件团队的工作流应该已经在大幅重构
- 还在用"agent 写一段 + 人改一段"模式的，本质是**用旧范式做新事情**
- 真正的红利在**完全 agent-native 的工作流重构**

#### 2. 与 Hermes / AHE 的呼应

最近知识库中的 **Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）** 和 **AHE：Agent 自进化优化 Harness 的可观测性框架** 都在解决同一个问题的不同侧面：
- Hermes：**架构层面**让 Agentic Engineering 落地（全栈 Harness）
- AHE：**方法层面**让 Harness 自动进化（不用手工调）
- Karpathy：**世界观层面**为什么这件事重要（Software 3.0 + Verifiability）

三者合起来 = 当下 Agentic Engineering 实践的完整地图。

#### 3. 理解的优先级

> 理解无法外包

这句话的实操含义：**永远要花时间真正读懂 agent 给你的产出**——不是"差不多就行"地接受，而是用工具（包括 LLM）加速你的理解过程，但最终判断必须自己做。

否则你不是用 AI 工作，是被 AI 牵着走。

---

## Related Topics

- **Karpathy 2025年度回顾：RLVR、Cursor、Claude Code与Vibe Coding** — Karpathy 2025 年度回顾
- **Karpathy microGPT - 纯Python零依赖的最小GPT实现** — Karpathy 的纯 Python microGPT
- **Karpathy LLM Wiki - 个人知识库的自演化模式** — Karpathy 个人知识库
- **Karpathy AutoResearch - AI自主机器学习研究** — Karpathy AutoResearch 自主 ML
- **Andrej Karpathy：代码智能体、AutoResearch 与 AI 循环时代** — Karpathy 代码 agent 与 AI 循环
- **大模型的下半场：从 Reasoning Thinking 到 Agentic Thinking** — 从 Reasoning 到 Agentic 思考
- **AHE：Agent 自进化优化 Harness 的可观测性框架** — AHE 自进化 Harness（方法层）
- **Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）** — Hermes 全栈 Harness（架构层）
- **Hermes Agent万字系统提示词深度解析** — Hermes 系统提示分析
- **少即是多：高效 Agent 构建方法——Skills 优于 agent.md，先干活再封装** — Saito 自己关于 Less is More 的 Agent 文章
- **AI Native Human：认知暴力重装——三次基因突变** — AI Native 人类认知突变
- **历史上生产力爆发时伴生的规律（AI 时代的启示）** — AI 时代生产力爆发模式
- **把自己当成一家公司来经营：个人商业画布** — 把自己作为公司运营框架
- **AI时代求职：从Push到Pull策略** — AI 时代求职 Pull 策略
