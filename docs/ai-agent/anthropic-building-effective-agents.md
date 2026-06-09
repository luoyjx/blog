---
title: "Anthropic官方：构建有效AI Agent的设计模式与实践指南"
description: "Anthropic官方：构建有效AI Agent的设计模式与实践指南"
---

## Summary
Anthropic 官方发布的 Agent 构建指南，核心原则是用简单、可组合的模式而非复杂框架。文章区分了 Workflow（预定义代码路径编排）和 Agent（LLM 动态控制）两种概念，系统介绍了五大 Workflow 模式：Prompt Chaining、Routing、Parallelization、Orchestrator-Workers 和 Evaluator-Optimizer。强调工具工程（ACI）的重要性应获得与 prompt 工程同等的关注，并分享了 Anthropic 在 SWE-bench 上的实践经验。

## Key Concepts
- **Workflow vs Agent** - Workflow 是预定义编排，Agent 是 LLM 动态控制
- **Prompt Chaining** - 任务分解为顺序步骤，含程序化门控验证
- **Routing** - 分类输入导向专门任务处理
- **Parallelization** - Sectioning（独立子任务）和 Voting（多次运行）
- **Orchestrator Workers** - 中央 LLM 动态分解任务委派给工作者
- **Evaluator Optimizer** - 生成-评估-反馈循环迭代
- **Agent Computer Interface (ACI)** - 工具设计的防错原则
- **Tool Engineering** - 工具设计应获得与 prompt 工程同等关注

## Detailed Content

### 核心区分
- **Workflow**：LLM 和工具通过预定义代码路径编排，适合定义明确、需要可预测性的任务
- **Agent**：LLM 动态指导自身过程和工具使用，适合需要灵活性和模型驱动决策的场景

### 五大 Workflow 模式
1. ****Prompt Chaining****：顺序步骤 + 程序化门控验证
2. ****Routing****：分类输入导向专门处理（如客服分流）
3. ****Parallelization****：Sectioning 和 Voting 两种变体
4. ****Orchestrator Workers****：中央 LLM 动态分解和委派
5. ****Evaluator Optimizer****：生成-评估循环迭代

### 工具工程最佳实践
- 提供足够 token 让模型"思考"
- 格式贴近互联网自然文本
- "Poka-yoke"防错设计：如发现相对路径出错后改为要求绝对路径
- Anthropic 在 SWE-bench 上优化工具的时间 > 优化 prompt 的时间

### 三大核心原则
1. **简单性**：保持 Agent 设计直接
2. **透明性**：显式展示规划步骤
3. **文档和测试**：精心设计 **Agent Computer Interface (ACI)**

## Related Topics
- **Agent Design Patterns**
- **Agent Skills Framework**
- **Demystifying Evals**
- **Context Management**
- **MCP Protocol**
