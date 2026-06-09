---
title: "AHE：Agent 自进化优化 Harness 的可观测性框架"
description: "进化 Agent 不是不够聪明，而是整个进化循环缺乏可观测性。"
---

## Summary

复旦 + 北大提出 **AHE（Agentic Harness Engineering）**——让"进化 Agent"自动迭代优化 Coding Agent 的 Harness（系统提示、工具、中间件、技能、记忆等所有可编辑组件）。**核心洞察**：进化 Agent 稳定优化的瓶颈不在 Agent 智能，而在**可观测性（Observability）**。三大支柱：① 组件可观测性（基于 NexAU 把 Harness 解耦为 7 种正交文件，每次编辑对应一次 git commit）② 经验可观测性（Agent Debugger 把数百万 token 轨迹蒸馏成 per-task + benchmark-level 两层报告）③ 决策可观测性（每次编辑附 Manifest 自声明预测，下轮 rollout 用真实 delta 做验证，可证伪而非自我合理化）。**结果**：Terminal-Bench 2 从 69.7% → 77.0%，超越人类设计的 Codex-CLI（71.9%）；零样本迁移到 SWE-bench 比种子还少用 12% token；跨 6 个基座普遍正增益（DeepSeek-v4-flash +10.1pp 最高）。**最反直觉发现**：System Prompt 单独移植反而 -2.3pp，AHE 的 Prompt 是"配合型选手"，需要 Memory + Tools + Middleware 协同。**最大局限**：能预测修复（Fix Recall 51.4% vs 随机 10.6%），但预见不到回归（Regression Recall 11.1% vs 随机 5.4%）。

## Key Concepts

- **AHE 三大可观测性支柱** — 组件可观测性 + 经验可观测性 + 决策可观测性，构成进化循环的全部前提
- **NexAU 7 组件解耦** — System Prompt / Tool Description / Tool Implementation / Middleware / Skill / Sub-agent Config / Long-term Memory 各自独立文件，文件级 diff 与回滚
- **Agent Debugger 渐进披露** — Per-task 根因 + Benchmark-level 概览两层报告，原始轨迹保留侧用于钻取
- **Manifest 编辑契约** — 每次修改附自声明预测（失败证据 / 根因 / 修复方案 / 预期影响），下轮实测验证（verdict）
- **可证伪进化** — 用跨轮实测替代自我合理化；这是从"自由发挥"升级到"科学方法"
- **组件非加性干扰** — Memory + Tools + Middleware 单独 +11.1pp，组合只 +7.3pp；过度堆叠"验证-闭环"行为在 Hard 任务上消耗长程预算
- **Prompt 是配合型选手** — System Prompt 单独移植 -2.3pp，必须与 Memory/Tools/Middleware 协同才有价值
- **回归预测盲点** — 进化 Agent 能精准定位"该修什么"，但预见不到"会搞坏什么"，这是当前最清晰的改进方向
- **离饱和越远增益越大** — AHE 编码通用协调模式而非提示词玄学，能力弱的模型从中获益更多
- **跨任务/跨模型零样本迁移** — Harness 在原任务进化出的"协调模式"在新任务上仍有效

## Tags

ahe, harness-engineering, agent-self-improvement, coding-agent, observability, nexau, agent-debugger, manifest, falsifiable-evolution, terminal-bench, swe-bench

## Detailed Content

### 论文解决的问题

**手工作坊 vs 模型迭代速度的鸿沟**：

```
人工 Harness 工程：
  开发者读海量轨迹 → 识别失败模式 → 改 Prompt/工具
  ↑
  跟不上 Base Model 迭代速度（GPT-5.4 → DeepSeek V4 → Qwen3.6 …）
```

**真正的瓶颈定位**：

> 进化 Agent 不是不够聪明，而是**整个进化循环缺乏可观测性**。

——这句反直觉判断是 AHE 全部设计的起点。

---

### 三大可观测性支柱（核心架构）

#### 支柱 1：组件可观测性（让动作空间结构化）

| 第 # | 组件 | 文件位置 |
|------|------|---------|
| 1 | System Prompt | `prompts/system.md` |
| 2 | Tool Description | `tools/*.desc.md` |
| 3 | Tool Implementation | `tools/*.impl.py` |
| 4 | Middleware | `middleware/*.py` |
| 5 | Skill | `skills/*/SKILL.md` |
| 6 | Sub-agent Configuration | `subagents/*.yaml` |
| 7 | Long-term Memory | `memory/*.md` |

**关键设计**：每个失败模式都能映射到**单一组件类别**——修改中间件不需要动 Prompt。每次逻辑编辑 = 一次 git commit，天然支持 diff 和回滚。

**种子 Harness 极简化**：只有一个 shell 工具，无中间件、无技能。**强迫每个组件都由进化 Agent 自己长出来**。

#### 支柱 2：经验可观测性（让证据可消化）

```
原始轨迹（数百万 token，"噪音海洋"）
  ↓ Agent Debugger（用 shell/script 工具逐条分析）
[ 两层报告 ]
  ├─ Per-task Analysis：每个任务的根因（成功/失败模式）
  └─ Benchmark-level Overview：聚合全局概览（每轮入口）
[ 原始轨迹保留在侧，需要时钻取验证 ]
```

**渐进披露**模式既省 token 又保证决策有据可依——这与 **Anthropic：AI Agent 有效上下文工程** 的"Just-in-time 检索"理念一致。

#### 支柱 3：决策可观测性（让修改可证伪）

**两道约束**：

1. **可控性**：进化 Agent 只能在 Harness 工作区内写入；System Prompt 不可删除——防止它通过"禁用验证器、换更强模型"等方式走捷径
2. **自声明预测（Manifest）**：每次编辑必须附带：
   - 失败证据
   - 推断的根因
   - 目标修复方案
   - 预测影响（哪些任务会修复 + 哪些可能回归）

**下轮 rollout 后的 verdict 机制**：
```
预测集合 ∩ 真实任务级 delta → verdict
  ├─ 确认有效 → 保留
  └─ 预测错误 → 回滚
```

> 这用**跨轮实测**替代了"自我合理化"——AHE 引入了**科学方法的可证伪标准**到 Agent 自进化中。

---

### 实验结果浓缩

#### 主战场（Terminal-Bench 2）

| 方法 | 成功率 | 类别 |
|------|-------|------|
| 种子 Harness | 69.7% | 起点 |
| ACE | 68.9% | Prompt-only 自进化基线 |
| TF-GRPO | 72.3% | 工具序列 RL 基线 |
| Codex-CLI（人类）| 71.9% | 人工设计 |
| **AHE** | **77.0%** | **本论文** |

**为什么基线追不上**：ACE / TF-GRPO 只编辑单一表面（Prompt 或工具序列），**不触碰工具实现、中间件、记忆**——而 AHE 的增益恰恰来自这些"Prompt 之外"的组件。

#### 跨任务迁移（SWE-bench-verified）

| 配置 | Aggregate Success | Tokens/Trial |
|------|------------------|--------------|
| Seed | 基准 | 基准 |
| ACE | ↓低于种子 | **+11%~29%** |
| TF-GRPO | ↓低于种子 | **+21%** |
| **AHE** | **最高** | **-12%** |

**反直觉结论**：AHE **更准的同时更省 token**——因为行为被编码进工具/中间件/记忆，避免每轮重复推导。

#### 跨模型迁移（冻结 Harness 换基座）

| 基座 | 增益 |
|------|------|
| GPT-5.4 medium | +2.3 pp |
| GPT-5.4 high | +7.3 pp（原优化目标）|
| GPT-5.4 xhigh | +2.3 pp |
| Gemini-3.1-flash-lite | +1.1 pp |
| **DeepSeek-v4-flash** | **+10.1 pp**（最高）|
| Qwen-3.6-plus | +6.3 pp |

**规律**：离饱和越远的模型增益越大——AHE 编码的是**通用协调模式**（何时调用工具、如何保护状态、如何闭环验证），不是特定模型的 prompt 玄学。

#### 组件消融

| 组件 | 单独移植增益 |
|------|------------|
| Long-term Memory | **+5.6 pp** |
| Tools | +3.3 pp |
| Middleware | +2.2 pp |
| **System Prompt** | **-2.3 pp（回归！）** |

**关键洞察**：
- 三正项相加 +11.1 pp，但完整 AHE 只 +7.3 pp → **组件间非加性干扰**（过度堆叠"验证-闭环"在 Hard 任务上造成冗余重试）
- Prompt 单独移植反而拖累 → **AHE 的 Prompt 是配合型选手**，必须有其他组件配合才发挥价值

---

### 自归因可靠性的两面

```
[ 修复预测：可靠 ]
  Fix Precision    33.7%  vs 随机  6.5%
  Fix Recall       51.4%  vs 随机 10.6%
  → 5× 优势，证据支撑

[ 回归预测：基本随机 ]
  Regression Precision 11.8%  vs 随机 5.6%
  Regression Recall    11.1%  vs 随机 5.4%
  → 仅 2× 优势，几乎瞎猜
```

> 进化 Agent **能可靠地知道自己要修什么**，但**预见不到自己的改动会搞坏什么**。

这是 AHE 当前最大的局限，也是论文明确指出的下一个改进方向。

---

### 战略含义与启示

#### 1. Harness Engineering 进入"可学习"时代

| 阶段 | 形态 |
|------|------|
| 1.0 手工作坊 | 工程师读日志改 Prompt |
| 2.0 部分自进化（ACE/TF-GRPO）| 只动 Prompt 或工具序列单一表面 |
| 3.0 AHE | **联合优化全部 7 类可编辑组件** |
| 4.0（未来）| 解决回归预见盲点 |

#### 2. 与 Hermes 等"全栈 Harness"的呼应

**Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）** 显示 Hermes 已经在多个维度上人工搭建了完整组件，AHE 给出了**让这些组件自动迭代**的方法论。

> Hermes（架构完备）+ AHE（自进化方法）= 真正的自演化 Coding Agent。

#### 3. 通用协调模式 vs 提示词玄学

跨模型迁移的"离饱和越远增益越大"证明 AHE 学到的不是 prompt 技巧，而是**协调模式**（何时调用工具、如何保护状态、如何闭环验证）——这暗示**真正可迁移的能力存在于"动作选择层"而非"语言层"**。

#### 4. 可证伪进化 = 科学方法上身

Manifest + verdict 机制把 Agent 自进化从"自由发挥"升级到"假设-验证"循环——这是把卡尔·波普尔的可证伪标准引入 Agent 自我改进的关键一步。

#### 5. 回归盲点的更深含义

进化 Agent 知道"我要修什么"但不知道"我会搞坏什么"——这本质上是**因果反事实推理**的缺失。修复未来需要：
- 模拟器/沙箱评估（"如果我这样改会发生什么"）
- 跨轮回归先验（"过去类似改动引发了什么回归"）
- 显式因果建模

#### 6. 与已有 Harness 知识的整合

AHE 把之前知识库中分散的 Harness 概念串成了一个统一框架：
- **Harness Engineering：7层架构让AI Agent不再崩溃** 7 层架构 → AHE 7 组件类型（异曲同工）
- **Anthropic: Effective Harnesses for Long-Running Agents** 长任务 Harness → AHE 让这种 Harness 自动进化
- **Claude Code架构拆解：Agent Harness的四层蓝图** Claude Code 4 层框架 → AHE 把"4 层"做成了"7 类正交文件"
- **我是怎么运作的：内观一个自进化Agent的Harness（yoyo）** Yoyo 自演化 → AHE 给出了观测性框架支撑
- **少即是多：高效 Agent 构建方法——Skills 优于 agent.md，先干活再封装** 极简 Agent → AHE 种子 Harness 同样极简化

## Related Topics

- **Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）** — Hermes 全栈 Harness 横向对比（与 AHE 形成"架构 + 方法"互补）
- **Hermes Agent万字系统提示词深度解析** — Hermes 9 层系统提示分析
- **Harness Engineering：7层架构让AI Agent不再崩溃** — ltbase 7 层 Harness 架构
- **Claude Code架构拆解：Agent Harness的四层蓝图** — Claude Code 4 层框架
- **Anthropic: Effective Harnesses for Long-Running Agents** — Anthropic 长任务 Harness 设计
- **Anthropic：AI Agent 有效上下文工程** — 上下文工程的 just-in-time 理念（与 AHE 渐进披露呼应）
- **我是怎么运作的：内观一个自进化Agent的Harness（yoyo）** — Yoyo 自演化 Agent Harness
- **Better-Harness：Evals 驱动的 Agent Harness 持续优化方法论** — Harness 评估与优化
- **Anthropic官方：揭秘AI Agent评测 - 从设计到实施的完整指南** — Agent 评估方法论
- **少即是多：高效 Agent 构建方法——Skills 优于 agent.md，先干活再封装** — 极简 Agent 哲学
- **SKILL-0：无梯度更新的 In-Context Agentic RL 技能内化** — Skill0 在上下文中的 Agentic RL
