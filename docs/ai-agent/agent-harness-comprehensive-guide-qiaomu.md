---
title: "Agent Harness完全指南：12组件、7决策、Von Neumann类比"
description: "Agent Harness完全指南：12组件、7决策、Von Neumann类比"
---

## Summary

qiaomu.ai发布的Agent Harness全面指南（2026-04-18）。核心命题：Harness即产品——相同模型不同基础设施结果截然不同（LangChain证据：只改Harness，TerminalBench排名30+→第5）。三层工程模型（Prompt/Context/Harness），12个核心组件，7个关键架构决策。Von Neumann类比：Harness=操作系统。Ralph Loop解决跨Context Window长任务。

## Key Concepts

- **Harness即产品** — 改变Harness而非模型是当前最直接的竞争优势
- **12核心组件** — 编排循环/工具/记忆/Context管理/Prompt构建/输出解析/状态管理/错误处理/护栏/验证/Subagent/Session
- **Von Neumann类比** — LLM=CPU, Context=RAM, 外部DB=存储, 工具=驱动, Harness=操作系统
- **错误复合** — 10步×99%/步=90.4%端到端；长链任务的根本风险
- **中间遗失** — Stanford研究：关键信息在Context中间位置时性能下降30%+
- **Ralph Loop** — 两阶段跨Context Window模式：初始化（git基线）+ 迭代（读历史选优先级执行提交）
- **Plan Execute优势** — 规划-执行方案比ReAct快3.6x

## Tags

agent-harness, von-neumann, 12-components, error-compounding, ralph-loop, context-engineering, harness-as-os

## Detailed Content

### 三层工程模型

```
Harness工程（最外层）
  ├── Context工程（管理信息）
  │     └── Prompt工程（构建指令）
  └── + 编排/状态/错误/生命周期
```

### 12个核心组件速查

| 组件 | 一句话 |
|------|--------|
| 编排循环 | TAO/ReAct的机械实现 |
| 工具 | Schema定义的Agent能力 |
| 记忆 | Session短期 + 持久化长期 |
| Context管理 | 防中间遗失的压缩/检索 |
| Prompt构建 | 分层组装指令/工具/历史 |
| 输出解析 | 响应→结构化工具调用 |
| 状态管理 | 跨Session进度持久化 |
| 错误处理 | 级联失败管理 |
| 护栏/安全 | 三层权限（输入/输出/工具）|
| 验证循环 | 规则验证+LLM评判 |
| Subagent编排 | 多Agent协调 |
| Session管理 | 跨Context Window恢复 |

### 7个架构决策

1. **单/多Agent** → 工具&lt;10个先用单Agent
2. **ReAct/Plan-Execute** → Plan-Execute快3.6x，优先考虑
3. **Context策略** → 时间清除/摘要/掩码/笔记/委托
4. **验证设计** → 确定性计算 vs 语义推理的权衡
5. **权限架构** → 安全vs速度的权衡
6. **工具范围** → 少而精胜过多而全
7. **Harness厚度** → 薄Harness+好模型 vs 厚架构显式控制

### 关键数据点

| 发现 | 数据 | 来源 |
|------|------|------|
| Harness改变的威力 | 排名30+→第5（模型不变）| LangChain/TerminalBench |
| 中间遗失 | 性能下降30%+ | Stanford研究 |
| 错误复合 | 10步99%→90.4% | 数学推导 |
| Token优化 | 减少26-54%，维持95%+精度 | ACON研究 |

### Ralph Loop（跨Context Window长任务）

```
初始化阶段
  → 设置环境
  → 创建进度文件
  → 捕获初始状态
  → 建立git基线

迭代阶段（每个Context Window）
  → 读取git历史 + 进度文件
  → 选最高优先级未完成工作
  → 执行
  → 提交
  → 写摘要
  → 下一个Context Window重复
```

## Related Topics

- **Harness Engineering：7层架构让AI Agent不再崩溃** — ltbase 7层Harness架构（更深入的实战细节）
- **Claude Code架构拆解：Agent Harness的四层蓝图** — Claude Code 4层框架
- **Ralph Loop 的四种变体详解** — Ralph Loop四种变体
- **Anthropic：AI Agent 有效上下文工程** — Anthropic Context工程指南
- **Claude Code Session管理：1M上下文的双刃剑** — Session管理与Context Rot
