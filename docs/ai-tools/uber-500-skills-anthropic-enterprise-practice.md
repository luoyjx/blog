---
title: "Uber内部500+个Skills企业级实战"
description: "Uber内部500+个Skills企业级实战"
---

## Summary
Uber建立了"AI Foundations and devx"团队，将软件开发流程转型为**Agentic Engineering**。其内部Skills平台从去年底的2个技能爆发增长至500+个，采用黄金市场与私有市场的多层级架构管理。平台涵盖代码审查、知识封装、特征装配线、团队记忆共享等应用场景，通过CI/CD和LLM评估机制保障质量。核心理念是"Make Skills, Not Agents"，强调将通用Agent通过Skills专业化，显著提升了研发速度和工程创造力。

## Key Concepts
- **Agent Skills** - AI Agent的可复用能力单元
- **Skill Marketplace** - 多层级技能市场架构（黄金市场 + 私有市场）
- **Agentic Engineering** - 以Agent能力为核心的工程范式
- **Meta Skill** - 用于创建其他技能的元技能
- **Code Review Automation** - AI驱动的代码审查自动化
- **Team Memory** - 基于图数据库的团队知识共享

## Detailed Content

### 平台架构与发展
Uber的开发者平台团队在**Claude Marketplace**概念宣布后自发建立初始市场。**Skill Marketplace**采用多层级架构：黄金市场由官方维护，有严格准入；团队/个人市场鼓励自下而上的创新。通过aifx CLI工具作为统一入口，配合评估与遥测系统进行质量管控。

### 核心应用场景
- ****Code Review Automation****：包括快速审查和专业知识审查（Go语言nil panic检测、并发问题），可启动不同"性格"的Agent团队
- ****Meta Skill****：技能工坊能读取当前对话会话，自动总结并生成新的技能代码
- **知识封装**：将隐性知识封装为Skills，使非专业人士快速获得特定领域能力
- **特征装配线**：限制PR行数 -> TDD -> 代码审查 -> 安全审查的**Pipeline**模式
- **团队记忆**：将高质量AI交互存储到图数据库，通过"回忆技能"提取**Team Memory**

### 质量保障
对黄金市场技能实施CI/CD、代码审查、Owner机制，并触发基于LLM的评估。好技能的信号包括使用量、用户反馈和社区共识。

### 工程师角色演变
在**Agentic Engineering**时代，工程师的核心职责是利用Agent能力加强工程基础，构建加速功能开发的技能流水线。"人类仍需对输入和输出负责"，同时赋能非程序员进行Vibe Coding。

## Related Topics
- **Agent Design Patterns**
- **Progressive Disclosure**
- **Vibe Coding**
- **Claude Code**
- **MCP Protocol**
