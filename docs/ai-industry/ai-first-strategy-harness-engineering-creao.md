---
title: "为什么你的'AI优先'战略可能是错的：CREAO的Harness工程实践"
description: "'AI将来PR，人类只需要审查是否有风险。'"
---

## Summary

CREAO（Agent平台，25人）CTO Peter Pang 的第一手实践：将整个工程流程彻底重构为以Agent为主要构建者。99%生产代码由AI编写，14天内平均每天3-8次部署，原来六周的功能迭代周期压缩到一天。核心原则：Harness工程——工程团队首要工作是让Agent能做有用的工作，而非写代码。单体仓库、确定性CI/CD、三Pass Claude代码审查、自愈反馈循环构成完整体系。

## Key Concepts

- **Harness工程** — 工程团队首要工作：让Agent能做有用的工作，定义"好"是什么
- **AI优先** — 重新设计流程/架构/组织，让AI成为主要构建者（≠AI辅助）
- **自愈系统** — CloudWatch检测→Claude分诊→工单创建→修复→验证→自动关闭的完整循环
- **单体仓库** — 让AI能看到一切：可检查、可验证、可修改的系统部分越多，杠杆越大
- **架构师vs操作员** — 新工程组织只有两类角色：设计SOPs的架构师（1-2人）+ 执行具体任务的操作员
- **确定性CI/CD** — 六阶段流水线，无可选阶段，无手动覆盖，Agent可预测结果并推理失败
- **三Pass代码审查** — Claude Opus 4.6并行执行代码质量/安全/依赖扫描三个审查门槛

## Tags

ai-first, harness-engineering, engineering-org, monorepo, ci-cd, agent-platform, self-healing, startup

## Detailed Content

### AI优先 vs AI辅助的区别

| | AI辅助 | AI优先 |
|--|--------|--------|
| 方式 | 在原有流程叠加AI | 围绕AI重新设计一切 |
| 效率提升 | 10-20% | 乘法级 |
| 流程变化 | 不变 | 彻底重构 |
| 典型表现 | 开Cursor写代码 | AI是主要构建者，人类提供方向和判断 |

### 技术栈要点

- **AWS** + CloudWatch（结构化日志，25+告警，AI每日查询）
- **GitHub Actions**：六阶段确定性流水线
- **Claude Opus 4.6**：每PR三并行审查Pass（质量/安全/依赖）
- **Statsig**：功能标志 + A/B测试，Kill Switch即时生效
- **Graphite**：PR合并队列，堆叠PR
- **Sentry + Linear**：错误聚类 + 自动工单（含去重、回归检测、自动关闭）

### 自愈循环时序

```
09:00 UTC → Claude Sonnet 健康摘要 → Teams
10:00 UTC → 分诊引擎 → Linear工单（含诊断）
工程师推修复 → 三Pass审查 → CI → 六阶段部署 → 重新验证 → 自动关闭
```

### 新组织原则

> "AI将来PR，人类只需要审查是否有风险。"

> "批判AI的能力将比生产代码的能力更有价值。"

> "初级工程师比高级工程师适应更快。"

### 关键结果
- 功能迭代：6周 → 1天
- 每日部署：0 → 3-8次
- 管理时间：60% → 10%以下
- 用户参与度、付费转化均上升

## Related Topics

- **两本Harness工程书：Claude Code设计指南 & Codex对比（wquguru）** — Harness Engineering 书籍（Claude Code & Codex设计哲学）
- **驾驭工程：从Claude Code源码到AI编码最佳实践（blackanger著）** — 驾驭工程·马书（Claude Code源码分析）
- **Anthropic: Effective Harnesses for Long-Running Agents** — Anthropic官方Harness设计
- **Anthropic官方：多智能体协作5种主流模式怎么选、怎么用（宝玉译）** — 多智能体5种模式
- **编程Agent如何重塑工程、产品和设计** — 编程Agent重塑工程/产品/设计
- **为什么（资深）工程师难以构建AI Agent - 五大范式转变** — 为什么工程师难以构建AI Agent
