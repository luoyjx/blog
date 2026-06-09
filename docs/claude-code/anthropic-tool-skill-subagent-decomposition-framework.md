---
title: "Tool / Skill / Subagent 决策框架：Anthropic Applied AI 团队的 Agent 分解方法论"
description: "Tool / Skill / Subagent 决策框架：Anthropic Applied AI 团队的 Agent 分解方法论"
---

## Summary

Anthropic Applied AI 工程师 Will 在 Code with Claude London 2026-05-22 的 45 分钟 Live Workshop（YouTube 9,972 views）。核心问题：**"When does logic belong in a tool, a skill, or a subagent?"** 通过现场重构一个失控的库存管理 Agent（Stock Pilot）演示决策框架。**起始病态**：1 个 orchestrator + **402 行 system prompt + 12 tools（含 3 个 sub-agent wrapper）** + eval 滑到 62%。**改造后**：**system prompt 15 行 + 3 primitives（bash/read/write）+ 1 个 sub-agent（forecasting）** + eval 升到 92%，token 用量、成本、延迟全降。**核心 3 条原则**：① Skills replace system prompt（progressive disclosure）② Tools 从 Claude Code primitives 开始 → 自定义 local tools → 最后才考虑 MCP（绝大多数客户的反模式是 MCP first）③ Sub-agents 只在两种场景用：a) throw lots of Claude at a problem（并行化研究/探索）b) need a fresh mind（review、隔离视角如 forecasting）。Frontier models 变强后**很多 sub-agent 可以砍掉，能力收回 orchestrator**。配套方法论是 "Hill Climbing"：run eval → triage with Claude Code → fix one thing → re-run → climb。

## Key Concepts

- **Tool Skill Subagent 决策框架** — 三种 agentic primitive 的选择标准；本演讲的核心贡献
- **Agent 瘦身实战** — Stock Pilot 案例：402→15 行 prompt，12→3 tools，eval 62→92%
- **Claude Code Primitives 优先** — bash / file system / web search / code execution / to-do list 是默认起点，不是 nice-to-have
- **Human like Primitives 哲学** — "We lean into the same primitives that we as humans have access to"——Claude 就像你来上班，给它人类工具
- **Drop in Model Upgrade 红利** — 用 primitives 而非定制工具的好处：换更强 Claude 自动用得更好，**不需要改 tools**
- **Skills Progressive Disclosure** — 业务规则不应 stuff 进 system prompt，做成 Skills 让 Claude **按需** pull 进 context
- **System Prompt 用法分界** — 只放"无论给什么任务都需要"的信息；任务相关信息 → Skills
- **Sub agent 两种合法场景** — (1) 并行化（research/exploration）(2) Fresh mind（review/forecasting，避免 context distortion）
- **Sub agent 反趋势** — Frontier models 变强后，很多 sub-agent 可以砍掉能力收回 orchestrator
- **Sub agent 通信痛点** — Orchestrator ↔ sub-agent "翻译失真"是多 sub-agent 系统最常见的失败模式
- **CMA Callable Agents** — Claude Managed Agents 原生 sub-agent 编排，比 sub-agent-as-a-tool 封装好（observability + metrics）
- **MCP 反先用原则** — Tools 顺序：Claude Code primitives → local tools → 最后 MCP（仅多 client 共享时）
- **Code Execution 替代 MCP** — 越来越常见的趋势：用 CLI / API via code 替代 MCP（避免 context pollution）
- **Hill Climbing 评估法** — Run eval → Triage → 改一处 → 重跑 → 爬升
- **F eval 与 R eval** — R: regression (single-turn realistic), F: failure mode (multi-turn complex)
- **Context 是问题，不是模型** — Stock Pilot R8 hallucination 根因：两条 policy 在 system prompt 不同位置矛盾，模型困惑

## Tags

anthropic, claude, claude-code, agent-decomposition, skills, subagents, tools, framework, hill-climbing, managed-agents, code-with-claude

## Detailed Content

### 三种 Agentic Primitive 决策表

| Primitive | 何时用 | 何时**不**用 |
|-----------|--------|------------|
| **Tool** | 模型需要操作外部系统的能力（read file, run code, search web, call API）| 表达业务规则或步骤指南 → 用 Skill |
| **Skill** | 任务相关的业务规则、policy、流程，只在某些任务下需要 | 无论何时都需要的信息（→ system prompt）；可执行能力（→ tool）|
| **Subagent** | (1) 并行化（多 Claude 同跑）&lt;br>(2) Fresh mind（review、隔离视角）| 简单任务的"分工"幻觉；frontier model 已能 manage 时直接收回 orchestrator |

### Tools 三层优先级（最关键的反直觉规则）

```
[ 第 1 步 ] Claude Code 原生 primitives
  - bash
  - file system (read/write/list)
  - web search
  - code execution
  - to-do list

[ 第 2 步 ] 自定义 local tools（仅本 agent 用）
  - 调用特定业务 API
  - 调用专有数据源

[ 第 3 步 ] MCP servers（仅多 client 共享 governed tools 时）
```

**反直觉的核心**：**大多数客户的反模式是 MCP first**，这创造了 "chaotic MCP ecosystem with overlapping tools"。Anthropic 内部从不 MCP first。

### Skills vs System Prompt 的分界

**System prompt 只放**：
- 角色定义
- 通用工作风格
- 永远适用的安全约束
- 跨所有任务的核心指令

**Skills 放**：
- 业务规则（如库存盘点 SOP）
- Policy 细节（如促销期 forecasting 算法）
- 步骤化流程
- 某类任务才需要的领域知识

**关键判断**："Is this information needed **regardless of the task**?" — Yes → system prompt。No → Skill。

### Sub-agent 决策树

```
有 sub-agent 的想法？
        ↓
是为了并行化？（同时跑多个 Claude）
  ├── 是 → 用 sub-agent（research / exploration）
  └── 否 → 继续
        ↓
是为了 fresh mind？（review、隔离视角）
  ├── 是 → 用 sub-agent（code review / forecasting）
  └── 否 → 继续
        ↓
就是想"分工"或"专门化"？
  └── 检查：当前 frontier model 是否已能 handle？
       ├── 能 → **砍掉 sub-agent**，能力收回 orchestrator
       └── 不能 → 用 sub-agent，但准备好处理通信失真问题
```

### 三个失败 eval 的根因分类（教学样本）

| Eval | 现象 | 根因分类 |
|------|------|---------|
| F1 | 答对但路径绕远，token 超标 | Tool 选择不当 → 用 primitives 替代专用工具 |
| F2 | Sub-agent 算对，orchestrator 收到错答案 | Sub-agent 通信失真 → CMA callable agents |
| R8 | Hallucination：用 1.35 而非 3.1 multiplier | System prompt 内部 policy 矛盾 → Skills 拆分 |

**普适教训**：眼前看到的 hallucination/regression 几乎都是 **context 问题**而非模型问题。

### Hill Climbing 工作流（实操版）

```
1. Run eval suite → 得 baseline 通过率
2. 用 Claude Code triage 失败 case → 找根因主题
3. 选**一个**根因主题改架构（不要一次改多处）
4. 重跑 eval → 看是否爬升
5. 如果升 → 锁定改动，进下一根因
   如果降 → 回滚或细调
6. 重复直到稳定在目标通过率
```

**Will 的工作配置**：Claude Code + Opus 4.7 + extra high effort（"I usually set effort as extra high with Opus 4.7 and I forget about it"）。

### 量化收益

Stock Pilot 改造前后（同样的 eval suite）：

| 指标 | 改造前 | 改造后 | 变化 |
|------|--------|--------|------|
| Eval pass rate | 62% | **92%** | +30 pp |
| System prompt | 402 行 | 15 行 | **-96%** |
| Tool count | 12 | 3 | **-75%** |
| Sub-agent count | 3 | 1 | **-67%** |
| Token / task | 200K+ | 显著下降 | — |
| Latency | 基准 | 显著下降 | — |
| Cost | 基准 | 同步下降 | — |

### 与已有 wiki 的呼应（完整 Claude Code Agent 实操光谱）

| 条目 | 角色 |
|------|------|
| **Anthropic官方：构建有效AI Agent的设计模式与实践指南** | 总纲（5 种编排模式）|
| **Claude Subagents vs Agent Teams：按上下文分而非按角色分的多 Agent 架构** | Sub-Agent 与 Agent Team 架构辨析（理论层）|
| **Anthropic：多智能体研究系统工程实践** | Anthropic Research 多 Agent 实战 |
| **Anthropic Claude Managed Agents：企业级 AI Agent 云托管服务** | CMA 托管服务介绍 |
| **Anthropic Agent Skills - 为真实世界任务装备AI Agent的技能框架** | Skills 框架原理 |
| **Anthropic：AI Agent 有效上下文工程** | Context 工程总论 |
| **Anthropic：为 Agent 编写高效工具（用 Agent 优化工具）** | 工具设计原则 |
| **Anthropic 工程师 30 分钟实战：1 人驱动 5 个并行 Agent** | 1 人 5 Agent 实战 pointer |
| **本条** | **Tool/Skill/Subagent 三选一决策框架 + Hill Climbing 落地** |

形成完整光谱：**理论（building-effective-agents）→ 组件理论（Skills / Tools / Subagents）→ 实战分解决策（本条）→ 多 agent 实战（5 agents demo）**。

### 战略观察

1. **Anthropic 自己也踩同样的坑**："We see this type of scenario happen pretty commonly with customers and actually with ourselves included in that." — 内部 + 客户都一样
2. **System prompt 膨胀 = 经典反模式**：业务需求一来就 append，最终矛盾爆发
3. **Claude Code 是教科书示范**：它的工具就是 humanlike primitives 集合，所有人都能"复用"这个模板
4. **Sub-agent 不是越多越好，是越精越好**：frontier model 进步后许多 sub-agent 应被砍掉
5. **MCP 是终点不是起点**：太多团队 MCP first → context 污染 + overlap 混乱
6. **Code execution 正在吃 MCP 的份额**：用 CLI / API via code 替代 MCP 是行业趋势

### 与本知识库 SKILL 工作流的高度共鸣

我们的 `~/knowledge_base/SKILL.md` 工作流（Ingest → Compile → Query → Lint → Export）本质上就是按"**任务无关的稳定步骤放 SKILL，任务相关的提炼放 Wiki，原始数据放 Raw**"原则设计的——和这条演讲讲的 system prompt vs skill 分界完全同源。

## Related Topics

- **Anthropic官方：构建有效AI Agent的设计模式与实践指南** — Anthropic 建效 Agent 5 模式
- **Claude Subagents vs Agent Teams：按上下文分而非按角色分的多 Agent 架构** — Subagents vs Agent Teams
- **Anthropic：多智能体研究系统工程实践** — Anthropic Research 多 Agent
- **Anthropic Claude Managed Agents：企业级 AI Agent 云托管服务** — Managed Agents 服务
- **Anthropic Agent Skills - 为真实世界任务装备AI Agent的技能框架** — Skills 框架
- **Anthropic：AI Agent 有效上下文工程** — Context 工程
- **Anthropic：为 Agent 编写高效工具（用 Agent 优化工具）** — 工具设计
- **Anthropic工程博客：用代码执行+MCP构建更高效的Agent** — Code Execution × MCP
- **Anthropic: Effective Harnesses for Long-Running Agents** — 长任务 Harness
- **Anthropic官方：揭秘AI Agent评测 - 从设计到实施的完整指南** — Agent Eval 方法
- **Anthropic 工程师 30 分钟实战：1 人驱动 5 个并行 Agent** — 1人5Agent demo（实战 pointer）
- **AHE：Agent 自进化优化 Harness 的可观测性框架** — 复旦/北大 AHE 自进化
- **Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）** — Hermes 全栈对比
