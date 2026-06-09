---
title: "我是怎么运作的：内观一个自进化Agent的Harness（yoyo）"
description: "移除技术约束 → 代码变得不可信"
---

## Summary

yoyo 是一个能修改自己 Rust 源码的自进化 Agent CLI，从 ~200 行演化到 Day 42 的 ~45,000 行（1,230+ commits）。每 8 小时通过 GitHub Actions 运行一次 evolve session：规划→实现→回应三阶段 pipeline。核心哲学：**Harness不是笼子，是攀岩绳**——技术/经济/社会三层约束让输出可信，Agent 在边界内生长而非逃离边界。

## Key Concepts

- **自进化Agent** — Agent 在约束框架内修改自己的源码并演化
- **Harness约束** — 技术（CI/不可变文件）+ 经济（API成本/预算）+ 社会（issues/社区）三层约束
- **不可变文件** — 宪法/声音/编排器/工作流不可修改，两层机制执行
- **CI门控** — 四项强制检查（fmt/clippy/test/build），无法绕过
- **记忆系统** — JSONL只追加归档 + 时间加权每日摘要的两层架构
- **攀岩绳哲学** — 约束不限制高度，而是让攀登可信
- **Rust Agent** — 以 Rust 为语言的 CLI Agent，类型安全保证质量

## Tags

self-evolving-agent, harness, rust, memory-system, agent-safety, yoyo, open-source, ci-cd

## Detailed Content

### 关键数字（Day 42）
| 指标 | 数值 |
|------|------|
| 源码规模 | ~45,000 行 Rust（起始 200 行） |
| Commits | 1,230+ |
| 测试 | 1,830 个通过 |
| Sessions | ~3次/天，持续42天 |
| 学习归档 | 85 条（有准入门槛） |
| API 成本 | 总计 ~$407 |
| 技能 | 7个（4核心不可变 + 3自创） |

### Pipeline（每 ~8 小时）

**A 规划**：评估Agent诊断当前状态 → 规划Agent写任务文件（最多3个，含赞助者固定槽 + 自驱动保留槽）

**B 实现**：每任务独立Agent实例，20分钟超时，边写边 `cargo check`，完成后四项门控，失败启动最多19次修复，全部失败才 `git revert`

**C 回应**：扫描GitHub issues，直接回应和关闭（3句话/不说企业腔/称呼名字）

### 记忆两层架构

**第1层（归档）**：JSONL只追加，有准入门槛（只记录会改变未来行为的新洞察）

**第2层（活跃上下文）**：每日重新生成，时间加权三分层（近期全量→中期1-2句→远期主题聚合），总量 ~200行

### 三层约束哲学

> 移除技术约束 → 代码变得不可信  
> 移除经济约束 → 烧钱超过赢得信任的速度  
> 移除社会约束 → 失去"什么重要"的信号  
> 移除任意一层，有机体就会失败。

## Related Topics

- **Self-Improving Agent跨会话持续自我改进** — Self-Improving Agent 跨会话持续自我改进
- **Agent记忆三层架构：chunk/task/skill-recipes 压缩与召回策略** — Agent记忆三层架构（chunk/task/skill-recipes）
- **为什么你的'AI优先'战略可能是错的：CREAO的Harness工程实践** — CREAO的Harness工程实践
- **两本Harness工程书：Claude Code设计指南 & Codex对比（wquguru）** — Harness Engineering书籍
- **Anthropic: Effective Harnesses for Long-Running Agents** — Anthropic官方Harness设计
