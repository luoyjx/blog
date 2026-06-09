---
title: "Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）"
description: "Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）"
---

## Summary

一张横向对比表（来源"小白分享圈"）系统比较了 **Hermes Agent / Claude Code / Codex CLI / Gemini CLI / Goose** 五个主流 CLI Agent。在 15 个对比维度上，Hermes 是唯一全部维度都有覆盖的——尤其在**闭环学习（Auto Memory + 自我改进 + 技能自创建）、五层记忆系统、12 个消息平台、6 种沙箱后端、RL 训练（Atropos）**这些维度上是独有的。模型锁定方面分两阵营：Provider 中立（Hermes 18+ / Goose 30+）vs 旗舰绑定（Claude Code / Gemini CLI）。MCP 深度方面 Hermes 标注"深度原生"——可能是协议级整合而非 API 层调用。Skills 互操作上 Hermes 与 Claude Code 都已接入 agentskills.io。

## Key Concepts

- **Hermes 闭环学习** — Auto Memory + 自我改进 + 技能自创建三件套，是与其他 Agent 最显著的差异
- **五层记忆系统** — Hermes 的 FTS5 全文索引 + 向量检索 + Honcho + 技能 + Auto Memory；其他工具仅为单一文件型记忆
- **Provider 中立路线** — Hermes (18+) / Goose (30+) vs Claude Code (锁 Claude) / Gemini CLI (锁 Gemini)
- **MCP 深度原生** — Hermes 标注的差异化定位，区别于其他工具的 Client + Server 模式
- **agentskills.io** — Skills 互操作标准，Hermes 与 Claude Code 都接入（11+ 工具采纳）
- **多消息平台 Agent** — Hermes 12 个平台（Telegram/Discord/Slack/钉钉/飞书等），Claude Code 仅有 Channels 插件
- **多沙箱后端** — Hermes 6 种（Local/Docker/SSH/Modal/Daytona/Singularity）vs Claude Code (macOS Seatbelt + Worktree) / Codex (Dev Container + Docker)

## Tags

hermes-agent, agent-comparison, claude-code, codex-cli, gemini-cli, goose, memory-architecture, mcp, agentskills, multi-agent

## Detailed Content

### 完整对比表

| 维度 | Hermes Agent | Claude Code | Codex CLI | Gemini CLI | Goose |
|------|--------------|-------------|-----------|-----------|-------|
| Agent 循环 | ReAct（Gather→Act→Verify）| ReAct | ReAct | ReAct | ReAct |
| 闭环学习 | **Auto Memory + 自我改进 + 技能自创建** | 仅被动记忆 | — | — | — |
| 记忆系统 | **五层**（FTS5+向量+Honcho+技能+Auto Memory）| CLAUDE.md + Chat Recall | AGENTS.md + memories | GEMINI.md + Checkpoint | Memory + MEMORY.md + Todo |
| 模型锁定 | 无锁定（18+ Provider）| 锁定（Claude 家族）| 偏向 OpenAI | 锁定（Gemini）| 无锁定（30+ Provider）|
| 本地推理 | Ollama/vLLM/llama.cpp/LM Studio | — | — | 有限 | Ollama |
| 消息平台 | **12 个**（TG/Discord/Slack/钉钉/飞书等）| Channels 插件 | — | — | — |
| MCP 支持 | **深度原生** | Client + Server | Client + Server | Client | Client + Server |
| 子 Agent / 并行 | Agent Teams + Summon + delegate_tool/batch | Subagents + 隔离上下文 | — | — | — |
| Cron 调度 | 原生 + 云端定时 | 内置 | — | — | — |
| 沙箱执行 | **6 种后端** | macOS Seatbelt + Worktree | Dev Container + Docker | 基础 | — |
| 上下文管理 | 四阶段压缩 + 智能路由 | 自动压缩 + 按需加载 + 1M token | 取决于模型 | 1M token | 取决于模型 |
| 扩展机制 | Skills + MCP + Hooks + Plugins（4 层）| 工具 + 技能 + MCP + 钩子 | MCP + AGENTS.md | MCP + GEMINI.md | MCP 原生 + 扩展 |
| UI 形态 | CLI + 12 消息平台 | CLI + Desktop + IDE + Web | CLI | CLI | CLI + Desktop |
| 技能可移植 | agentskills.io | agentskills.io（11+ 采纳）| — | — | — |
| RL 训练 | **Atropos + 轨迹压缩** | — | — | — | — |

### 三个观察

#### 1. Hermes 的"全栈"定位

15 项维度全部覆盖。其他工具都有大量空缺：
- Codex CLI：闭环学习、子 Agent、Cron、本地推理、消息平台、UI 形态都为空
- Gemini CLI：闭环学习、子 Agent、Cron、消息平台都为空
- Goose：闭环学习、消息平台、Cron、沙箱、子 Agent 都为空
- Claude Code：闭环学习仅"被动记忆"，没有 RL 训练，消息平台靠插件

#### 2. 闭环学习是分水岭

| Agent | 学习能力 |
|-------|---------|
| Hermes | Auto Memory + 自我改进 + **技能自创建**（自己写新 Skill）|
| Claude Code | 被动记忆（写 CLAUDE.md 但不会自我演化）|
| 其他 | 无 |

技能自创建意味着 Agent 能在使用过程中沉淀可复用能力，是从"工具"向"自我演化系统"的关键跨越。

#### 3. 两条路线的世界观

**Provider 中立**（Hermes / Goose）：押注没有单一模型会赢，做适配层
- Hermes 18+ Provider，Goose 30+ Provider
- 优势：随模型生态变化保持灵活
- 劣势：与厂商深度集成会延迟

**旗舰绑定**（Claude Code / Gemini CLI / Codex CLI）：跟厂商一起进步
- 优势：可以用厂商内部 API、提前接入新能力
- 劣势：被锁定

### 与已有 Wiki 的呼应

之前的 **Hermes Agent万字系统提示词深度解析** 揭示了 Hermes 系统提示的 9 层结构 + 50% token 节省，本表则补充了**外部能力维度的横向对比**——两者结合可以完整理解 Hermes：内部 prompt 工程精炼 + 外部生态能力全栈。

## Related Topics

- **Hermes Agent万字系统提示词深度解析** — Hermes 系统提示 9 层结构与 token 优化
- **Claude Code架构拆解：Agent Harness的四层蓝图** — Claude Code 4 层框架架构
- **Claude Agent SDK 技术规范 v1.0.0** — Claude Agent SDK 技术规格
- **Claude Code Best Practices - 14 Key Practices** — Claude Code 最佳实践
- **AI记忆工具两大阵营：Memory Backends vs Context Substrates** — Memory Backends vs Context Substrates 两大阵营
- **Uber内部500+个Skills企业级实战** — Skills 互操作的企业实践参考
