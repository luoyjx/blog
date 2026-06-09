---
title: "ByteDance DeerFlow 2.0超级Agent编排框架"
description: "ByteDance DeerFlow 2.0超级Agent编排框架"
---

## Summary
ByteDance发布DeerFlow 2.0，一个从头重写的开源超级Agent Harness框架，编排子Agent、记忆和沙箱执行环境。2.0版本支持可扩展技能系统（含Claude Code集成）、多Agent层级任务委派、本地/Docker/Kubernetes三级沙箱隔离、动态Prompt优化的上下文工程、以及持久化知识存储的长期记忆系统。框架集成Telegram、Slack、飞书、企业微信等IM通道，支持OpenAI、OpenRouter、vLLM等多模型后端。

## Key Concepts
- **Agent Orchestration** - 多Agent协调与层级任务委派
- **Sub Agent** - 层级委派中的子Agent系统
- **Sandbox Execution** - 本地/Docker/Kubernetes三级隔离执行
- **Context Engineering** - 动态Prompt优化与会话上下文管理
- **Long term Memory** - 持久化知识存储与上下文检索

## Detailed Content

### Skills与工具

DeerFlow 2.0的可扩展技能系统支持**Claude Code**集成和工具编排，与**Agent Skills**生态系统兼容。

### Sub-Agents

**Sub Agent**系统实现多Agent协调：
- 层级任务委派
- Agent组合模式
- 跨Agent通信

### 沙箱与文件系统

**Sandbox Execution**提供三级隔离：
- 本地执行模式
- Docker容器隔离
- Kubernetes供给
- 隔离文件操作

### 上下文工程

**Context Engineering**包含：
- 动态Prompt优化
- 基于会话的上下文管理
- 推理和思考模式

### 长期记忆

**Long term Memory**系统：
- 持久化知识存储
- 上下文检索系统

### 技术栈

| 类别 | 技术 |
|------|------|
| 后端 | Python 3.12+ |
| 前端 | Node.js 22+ |
| 基础设施 | Docker, Kubernetes |
| 追踪 | LangSmith, Langfuse |
| 模型支持 | OpenAI, OpenRouter, vLLM, Claude Code OAuth, Codex CLI |

### IM通道集成

Telegram、Slack、飞书、企业微信，无需公网IP。

## Related Topics
- **OpenAI Symphony**
- **Agent Skills**
- **Hackathon Claude Code Setup**
- **Self Improving Agent**
- **Harness Engineering**
