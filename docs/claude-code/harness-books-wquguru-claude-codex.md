---
title: "两本Harness工程书：Claude Code设计指南 & Codex对比（wquguru）"
description: "'两个城市都修了桥，不能说明它们是按同一条河设计的。'"
---

## Summary

@wquguru 发布了两本关于 Harness 工程的开源中文书籍，分别深度解析 Claude Code 的工程设计，以及对比 Claude Code 与 Codex 的架构哲学。核心论点是：功能名词相同不代表系统骨架相同，应从架构思想而非功能对照表视角来比较两套系统。在线阅读：https://harness-books.agentway.dev/index.html

## Key Concepts

- **Harness工程** — 把不稳定 AI 模型收束进可持续运行工程秩序的系统
- **控制面** — Claude Code 的核心管控层
- **Agent架构** — 主循环、工具权限、上下文治理、恢复路径
- **多代理验证** — Multi-agent 体系的校验机制
- **工程骨架** — 超越功能列表，关注系统深层结构
- **Claude Code** — Harness 工程分析的主要研究对象
- **Codex** — 用于对比的 OpenAI AI 编码系统

## Tags

harness, claude-code, codex, architecture, engineering, books, agent

## Detailed Content

### 第一本：Claude Code 设计指南
- 关注如何把不稳定模型收束进可持续运行的工程秩序
- 涵盖：控制面、主循环、工具权限、上下文治理、恢复路径、多代理验证、团队制度

### 第二本：Claude Code 与 Codex Harness 哲学对比
核心洞见：**功能名词相同不等于架构骨架相同**
> "两个城市都修了桥，不能说明它们是按同一条河设计的。"
- 反对用功能对照表代替思想分析
- 强调从系统骨架和设计哲学层面比较

### 资源
- GitHub：https://github.com/wquguru/harness-books
- 在线阅读：https://harness-books.agentway.dev/index.html

## Related Topics

- **驾驭工程：从Claude Code源码到AI编码最佳实践（blackanger著）** — 另一本同主题书籍（驾驭工程·马书）
- **池建强推荐：Harness Engineering Claude Code设计指南 + Codex对比书** — 池建强的推荐与解读
- **Anthropic: Effective Harnesses for Long-Running Agents** — Anthropic 官方 Harness 设计
- **8 个 Claude Code Hooks 自动化实践** — Claude Code Hooks 实践
