---
title: "Ralph 自主编码循环完整实操指南"
description: "Ralph 自主编码循环完整实操指南"
---

## Summary
Ryan Carson 的 **Ralph Loop** 完整实操指南。Ralph 是 Bash 驱动的自主 AI 编码循环：每次迭代从 prd.json 选取 story → 实现 → typecheck+test → commit → 记录学习 → 循环。关键设计：每次迭代是全新 **Context Window Reset**，记忆仅通过 git commits、progress.txt 和 prd.json 持久化。六大成功因素：小 story、快速反馈循环、明确标准、**Compound Learning**（到第10个 story 已知前9个模式）、**AGENTS.md** 持久化可复用模式、浏览器截图验证 UI。实测13个 story 约1小时完成。

## Key Concepts
- **Ralph Loop** — Bash 循环驱动 AI agent 自主完成任务列表的模式
- **Autonomous Coding** — Agent 在无人值守下持续实现、测试、提交代码
- **Agent Loop** — 每次迭代全新上下文，通过外部文件传递记忆
- **Compound Learning** — 学习随迭代累积，后期 story 受益于前期经验
- **AGENTS.md** — Agent 发现的可复用模式的永久文档
- **Context Window Reset** — 每次迭代清空上下文，保持 Thread 小而聚焦

## Detailed Content

### 文件结构
- `ralph.sh` — 主循环（最多25次迭代）
- `prompt.md` — 每次迭代指令
- `prd.json` — 任务列表（priority + passes 状态）
- `progress.txt` — 会话记忆，逐次追加

### 不适用场景
探索性工作、无标准的大重构、安全关键代码、需人工审查的代码

## Related Topics
- **Ralph Loop 的四种变体详解**
- **Claude Code**
- **Continuous Learning**
- **Agent Architecture**
- **Deterministic Failure**
