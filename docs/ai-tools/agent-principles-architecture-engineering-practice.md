---
title: "你不知道的 Agent：原理、架构与工程实践"
description: "你不知道的 Agent：原理、架构与工程实践"
---

## Summary
这是一篇全面的 AI Agent 开发指南，涵盖从核心循环到生产部署的完整知识体系。文章提出 Agent 架构的核心是"感知-决策-行动-反馈"循环，并强调工程约束（Harness、测试基础设施、执行边界）通常比模型改进对系统稳定性的影响更大。在上下文管理方面，提出了四层信息架构（持久层、按需层、运行时层、记忆层）来防止上下文退化。文章还涉及工具设计的 ACI 原则、多 Agent 协调、可观测性等关键主题，并以 OpenClaw 五层架构作为生产实践参考。

## Key Concepts
- **Agent Core Loop** - 感知-决策-行动-反馈循环，Agent 架构的基础控制流
- **Harness Engineering** - 测试基础设施和执行边界，比模型能力本身更重要
- **Context Management** - 四层信息架构：持久层、按需层、运行时层、记忆层
- **ACI (Agent Computer Interface)** - 针对 Agent 目标设计工具的原则，具有清晰边界和错误处理
- **Memory System** - 跨会话持久化，使用结构化 markdown 文件和整合触发器
- **Multi Agent Coordination** - 基于协议的通信，配合任务图和工作空间隔离
- **Observability** - 事件驱动追踪配合人工采样来校准自动评估

## Detailed Content

### 核心循环
Agent 架构依赖稳定的 **感知-决策-行动-反馈** 循环。控制流在不同实现中保持一致，这是所有 Agent 系统的共同基础。

### Harness 工程
测试基础设施、执行边界和反馈机制比模型能力本身更重要。**Harness Engineering** 决定了 Agent 在生产环境中的可靠性。

### 上下文管理
分层信息架构防止 **Context Management** 退化：
- **持久层** - 长期存储的知识
- **按需层** - 按需加载的信息
- **运行时层** - 当前执行上下文
- **记忆层** - 跨会话的记忆

### 工具设计
工具应使用 **ACI (Agent Computer Interface)** 原则设计，具有清晰边界和错误处理。

### 长任务处理
多会话恢复通过状态外部化而非上下文保持实现，这是处理长任务的关键策略。

### 多 Agent 协调
**Multi Agent Coordination** 采用基于协议的通信配合任务图和工作空间隔离，优先于简单的并行化。

### 评估与可观测性
使用代码评分器、结果验证和环境隔离的自动化验证。**Observability** 通过事件驱动追踪实现。

### OpenClaw 参考
五层架构展示了上述原则在生产环境中的实际应用。

### 核心洞察
工程约束通常比模型改进对系统稳定性的影响更大。

## Related Topics
- **LLM Application Architecture**
- **Autonomous Agent**
- **RAG System**
- **Prompt Engineering**
- **Agent Evaluation**
- **Claude Code Hooks**
