---
title: "Anthropic: Harness Design for Long-Running Application Development"
description: "Anthropic: Harness Design for Long-Running Application Development"
---

## Summary
Anthropic 工程师 Prithvi Rajasekaran 探讨了如何通过 harness 设计提升 Claude 自主生成高质量前端和全栈应用的能力。文章揭示了两大核心问题：上下文管理（模型在长任务中失去连贯性）和自我评估偏差（Agent 对自身工作过度赞扬）。提出了受 GAN 启发的生成器-评估器循环架构，以及 Planner-Generator-Evaluator 三 Agent 系统。实验表明完整 harness 虽耗时更长成本更高，但产出质量显著优于单 Agent。随着模型能力提升（如 Claude Opus 4.6），harness 复杂度可相应简化。

## Key Concepts
- **Harness Design**：围绕 AI Agent 的编排框架，管理会话、上下文和评估
- **Generator Evaluator Pattern**：受 GAN 启发的生成-评估循环
- **Context Management**：上下文重置优于简单压缩
- **Self Evaluation Bias**：Agent 对自身工作的系统性过度赞扬
- **Multi Agent Architecture**：Planner + Generator + Evaluator 三角色协作
- **Sprint Contract**：Generator 和 Evaluator 在实现前协商的交付契约

## Detailed Content

### 核心问题

**上下文管理**：模型在长任务中随上下文窗口填满而失去连贯性。Claude Sonnet 4.5 表现出"上下文焦虑"，过早结束工作。解决方案是**Context Management**——在会话之间提供干净状态，比仅压缩更有效。

****Self Evaluation Bias****：Agent 持续对自己的工作过度赞扬，尤其在主观任务上。将评估 Agent 与生成 Agent 分离可提供批判性反馈。

### 前端设计：**Generator Evaluator Pattern**

受 GAN 启发的循环，建立四个评分维度：
- 设计质量：颜色、排版、布局的连贯视觉识别
- 原创性：避免模板和"AI slop"模式
- 工艺：间距、对比度等技术执行
- 功能性：可用性和任务完成度

### 全栈开发：**Multi Agent Architecture**

- **Planner**：将简短提示扩展为产品规格
- **Generator**：使用 React + Vite + FastAPI + SQLite 迭代构建
- **Evaluator**：通过 Playwright 测试功能，识别真实 bug

Agent 之间通过结构化文件通信，Generator 和 Evaluator 通过**Sprint Contract**在实现前协商交付标准。

### 实验对比
- 单 Agent：20 分钟，$9（有 bug）
- 完整 harness：6 小时，$200（功能完整、设计精良）

### 模型演进启示
Claude Opus 4.6 的改进使部分 harness 复杂度可被移除。核心原则：随模型改进定期重新评估，追求实现目标的最简方案。

## Related Topics
- **Effective Harnesses for Long Running Agents**
- **Agentic Thinking**
- **GAN Architecture**
- **Context Window Optimization**
- **AI Code Generation**
