---
title: "你不知道的Agent：原理、架构与工程实践"
description: "你不知道的Agent：原理、架构与工程实践"
---

## Summary
Tw93的Agent工程实践深度指南，覆盖从基础原理到生产架构的完整知识体系。核心论点是**Harness**质量比模型层级更重要，Agent稳定性来自工程严谨性而非复杂性。文章系统性地阐述了**Agent Loop**基础、**Context Engineering**分层策略、五种控制模式、四层**Memory Architecture**、多Agent组织结构，以及评测与可观测性方法。特别强调工具设计遵循ACI原则，出问题时"先检查工具定义"。

## Key Concepts
- **Agent Loop** - 感知->决策->行动->反馈的基本循环，约20行代码
- **Harness** - 工程约束（验收基线、执行边界、回退机制），比模型能力更重要
- **Context Engineering** - 按频率分层信息管理，避免Context Rot
- **Memory Architecture** - 四层记忆：上下文窗口、Skills、JSONL日志、MEMORY.md
- **Multi Agent System** - Director模式（同步）与Orchestrator模式（异步）
- **Agent Evaluation** - Pass@k（能力探索）与Pass^k（回归测试）

## Detailed Content

### 核心原则
****Agent Loop**基础**：基本循环约20行代码，经过感知->决策->行动->反馈阶段。能力通过工具集和状态外部化扩展。

****Harness**比模型更重要**：工程约束对可验证任务来说比原始模型能力更重要。

****Context Engineering****：Context Rot（无关内容稀释信号）比上下文不足更成问题。按频率分层：永久、按需、运行时、记忆、系统。避免将确定性逻辑塞入prompt。

### 五种控制模式
1. **Prompt Chaining** - 提示词链式调用
2. **Routing** - 路由分发
3. **Parallelization** - 并行化
4. **Orchestrator-Workers** - 编排器-工作者
5. **Evaluator-Optimizer** - 评估器-优化器

大多数系统有效组合2-3种模式。

### 工具设计（ACI原则）
映射到Agent目标而非API端点；包含使用边界（"何时使用/不要使用"）；提供带恢复建议的结构化错误；添加调用示例（准确率从72%提升到90%）。

### **Memory Architecture**
四层记忆：上下文窗口（工作记忆）、**Agent Skills**（程序性记忆）、JSONL日志（情景记忆）、MEMORY.md（语义记忆）。在50% token使用率时自动整合。保留架构决策和约束推理，选择性压缩工具输出。

### **Multi Agent System**
- **Director模式**：同步，持续人类参与
- **Orchestrator模式**：异步委派，产出持久化产物（分支、PR）

严格协议优于自然语言，幻觉在Agent层间放大，交叉验证打破错误链。

### **Agent Evaluation**
- **Pass@k**：Agent理论上能否完成任务（能力探索）
- **Pass^k**：所有k次运行都成功吗（回归测试）

"评测系统的bug比Agent的bug更难发现"，先修评测系统再调Agent。

### 安全模式
三层防护：白名单授权、工作区隔离+路径验证、全面审计日志。

### 常见反模式
工具无控制膨胀、记忆断连、零评测、过早多Agent扩展、文档化约束（应通过linter/hooks强制执行）。

## Related Topics
- **Claude Code**
- **Agent Skills**
- **Progressive Disclosure**
- **Agentic Engineering**
- **OpenClaw**
