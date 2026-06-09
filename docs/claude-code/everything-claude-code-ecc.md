---
title: "Everything Claude Code (ECC) - AI Agent 性能优化生态系统"
description: "Everything Claude Code (ECC) - AI Agent 性能优化生态系统"
---

## Summary
Everything Claude Code (ECC) 是 Anthropic 黑客松冠军项目，GitHub 获得 140K+ Stars，是一个 AI Agent Harness 的性能优化生态系统。它不只是配置文件，而是涵盖 47 个 Agents、181 个 **Agent Skills**、79 个 Commands、多语言 Rules 和 Hooks 的完整系统。核心特性包括 **Token Optimization**（模型选择引导、system prompt 瘦身）、记忆持久化、持续学习（自动提取 **Instincts**）、验证循环（pass@k 指标）和 **AgentShield**（1282+ 测试、102+ 安全规则）。跨平台支持 Claude Code / Codex / Cursor / OpenCode / Gemini 等。

## Key Concepts
- **ECC** - Everything Claude Code 生态系统
- **Agent Skills** - 181 个技能覆盖后端、前端、框架、内容、学习
- **Instincts** - 从工作会话自动提取的置信度评分模式
- **AgentShield** - 1282+ 测试、102+ 安全规则的安全系统
- **Token Optimization** - 模型选择引导和 system prompt 瘦身

## Detailed Content

### 核心组件
- **Agents（47个）**：开发（planner / architect / code-reviewer）、语言专用（TS/Python/Go/Java 等）、质量（TDD-guide / refactor-cleaner）、运维（loop-operator / harness-optimizer）
- ****Agent Skills**（181个）**：后端（API/数据库/Docker/CI-CD）、前端（React/Next.js）、框架（Django/Laravel/Spring Boot）、内容（文章/研究/投资材料）、学习（持续学习/TDD/安全审查）
- **Commands（79个）**：`/tdd` / `/plan` / `/code-review` / `/multi-plan` / `/security-scan`
- **Hooks**：SessionStart/Stop/Edit/Build 阶段钩子

### 关键特性
- ****Token Optimization****：模型选择引导、system prompt 瘦身
- **记忆持久化**：跨会话自动保存/恢复上下文
- **持续学习**：自动提取 **Instincts** 并赋予置信度评分
- ****AgentShield****：安全扫描和规则验证
- **并行化**：git worktree、cascade 方法、多实例扩展

## Related Topics
- **Claude Agent SDK**
- **Ralph Loop**
- **UI Skills**
- **Claude Code**
