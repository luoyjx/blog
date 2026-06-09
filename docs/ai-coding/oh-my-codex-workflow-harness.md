---
title: "oh-my-codex：Codex CLI的Harness层"
description: "oh-my-codex：Codex CLI的Harness层"
---

## Summary

oh-my-codex（24k+ stars）是OpenAI Codex CLI的工作流增强层，相当于Codex版的Harness。三步标准工作流：Deep Interview（需求澄清）→ RalPlan（架构规划）→ Ralph/Team（单Agent或多Agent执行）。核心价值：把AI编程从代码生成推进到生产交付，通过`.omx/`目录持久化状态、tmux稳定多Agent编排、AGENTS.md定义项目范围。

## Key Concepts

- **Deep Interview** — 执行前澄清需求/边界/约束的结构化问询技能
- **RalPlan** — 将确认需求转化为可执行架构的规划技能
- **Ralph/Team模式** — Ralph=单一持久Agent，Team=多Agent并行执行
- **omx状态持久化** — `.omx/`目录管理跨Session的Agent状态
- **AGENTS.md** — 项目范围定义文件（类比CLAUDE.md）

## Tags

oh-my-codex, codex-cli, harness, workflow, multi-agent, state-persistence, ralph

## Detailed Content

### 与Claude Code Harness的对比

| 维度 | oh-my-codex | Claude Code Harness |
|------|-------------|---------------------|
| 底层 | OpenAI Codex CLI | Claude Code |
| 工作流标准化 | Deep Interview→RalPlan→Ralph/Team | CLAUDE.md + Skills |
| 状态持久化 | `.omx/` 目录 | 外部化状态 |
| 项目定义 | AGENTS.md | CLAUDE.md |
| 多Agent | tmux编排 | Subagents |
| 技能库 | 内置（deep-interview等）| 自定义Skills |

### 三步工作流

```
需求进来
    ↓
Deep Interview — 澄清需求/边界/约束（防止方向错误）
    ↓
RalPlan — 确认需求 → 可执行架构
    ↓
Ralph（单Agent）或 Team（多Agent并行）
    ↓
生产交付
```

### 安装与使用

```bash
npm install -g @openai/codex oh-my-codex
omx setup
omx --madmax --high   # 高配模式
```

### 项目信息

- GitHub: github.com/Yeachan-Heo/oh-my-codex
- Stars: 24k+
- 平台: macOS/Linux
- 依赖: tmux（多Agent编排）

## Related Topics

- **Claude Code架构拆解：Agent Harness的四层蓝图** — Claude Code的Harness架构（类比参考）
- **Harness Engineering：7层架构让AI Agent不再崩溃** — Harness Engineering七层架构
- **Ralph Loop 的四种变体详解** — Ralph循环的四种变体
- **Ralph 自主编码循环完整实操指南** — Ralph逐步出货指南
