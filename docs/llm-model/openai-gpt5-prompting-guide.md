---
title: "OpenAI GPT-5 Prompting 指南（官方 Cookbook）"
description: "OpenAI GPT-5 Prompting 指南（官方 Cookbook）"
---

## Summary
OpenAI 官方 GPT-5 提示工程指南，包含 Cursor 等生产用户案例。核心：GPT-5 对指令有"外科精准度"——矛盾指令消耗推理 token；新增 `reasoning_effort`/`verbosity` 参数；Responses API 跨工具调用持久化推理；Metaprompting 让 GPT-5 自我优化提示。

## Key Concepts
- **GPT 5** — 新一代 OpenAI 模型，外科精准的指令遵循
- **reasoning_effort** — 调节探索深度与延迟平衡的新参数
- **Metaprompting** — 让 GPT-5 自我构建和改进 Prompt
- **Agentic Workflow** — Tool Preambles、上下文收集标准、边界定义

## New Parameters
| 参数 | 用途 |
|------|------|
| `reasoning_effort` | 深度 vs 速度 |
| `verbosity` | 输出长度（独立于推理深度） |
| Responses API | 跨工具调用持久化推理 |

## Key Rules
1. 消除矛盾指令（矛盾会浪费推理 token）
2. 不要过度约束——GPT-5 自然的彻底性往往更好（Cursor 经验）
3. 用 Metaprompting 迭代改进 Prompt

## Related Topics
- **Anthropic：AI Agent 有效上下文工程**
- **Anthropic：为 Agent 编写高效工具（用 Agent 优化工具）**
- **Anthropic官方交互式Prompt Engineering教程（9章）**
