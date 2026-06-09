---
title: "OpenAI Symphony自主工作管理框架"
description: "OpenAI Symphony自主工作管理框架"
---

## Summary
OpenAI发布Symphony框架（Apache 2.0，工程预览状态），将项目工作转化为隔离的、自主的实现运行，使团队能够管理工作而非监督编码Agent。框架从项目管理系统（如Linear）追踪任务，自动生成Agent处理任务，并通过CI状态检查、代码审查和视频演示提供工作证明。Symphony在采用"Harness Engineering"原则的代码库中效果最佳，支持自定义实现和参考Elixir实现两种方式。

## Key Concepts
- **Autonomous Agent** - 自主执行任务的AI代理
- **Harness Engineering** - 管理自主编码Agent的工程原则
- **Work Management** - 项目工作的追踪与管理
- **Proof of Work** - Agent通过CI/代码审查提供验证
- **Agent Orchestration** - 多Agent协调与部署

## Detailed Content

### 核心理念

Symphony将**Work Management**从"监督Agent编码"提升到"管理工作本身"的抽象层级。工程师不再逐步指导Agent，而是定义工作目标，由框架自动分配和验证。

### 主要功能

- **工作监控**：从项目管理系统追踪任务，与**CI/CD Integration**深度集成
- **Agent部署**：自动生成**Autonomous Agent**处理已识别的任务
- **工作证明**：通过CI状态检查、代码审查反馈、复杂度分析、视频演示提供验证
- **安全集成**：Agent在获批后可自主合并PR
- **高层管理**：工程师抽象地管理工作

### 实现方式

1. **自定义实现**：按SPEC.md规范用任何语言构建
2. **参考实现**：实验性Elixir实现

### 前提条件

Symphony在采用**Harness Engineering**原则的代码库中效果最佳——这是管理自主编码Agent的前提基础。

## Related Topics
- **ByteDance DeerFlow**
- **Harness Engineering**
- **CI/CD Pipeline**
- **Agent Skills**
- **Hackathon Claude Code Setup**
