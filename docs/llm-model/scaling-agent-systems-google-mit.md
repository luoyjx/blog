---
title: "Scaling Agent Systems - Google/MIT 多Agent扩展量化规律"
description: "Scaling Agent Systems - Google/MIT 多Agent扩展量化规律"
---

## Summary
本文由 Google 和 MIT 联合发表，旨在推导 Agent 系统的量化扩展原则。研究通过 180 种配置的受控实验，发现简单增加 Agent 数量并不普遍提升推理能力，效果强烈依赖于任务领域和协调结构。论文提出了包含效率、开销、错误放大和冗余的经验协调指标，构建了交叉验证 R²=0.513 的预测模型。核心结论是应根据任务特性选择合适的协调结构和 Agent 数量，而非盲目扩展。

## Key Concepts
- **Multi Agent Systems** - 多 Agent 协作系统
- **Scaling Laws** - 扩展规律的量化研究
- **Agent Coordination** - 协调结构（Independent / Centralized / Decentralized / Hybrid）
- **Error Amplification** - 多 Agent 场景下的错误放大效应

## Detailed Content

### 实验设计
研究覆盖 4 个基准任务（Finance-Agent / BrowseComp-Plus / PlanCraft / Workbench），5 种架构（Single-Agent + 4 种 **Multi Agent Systems** 架构），3 个 LLM 系列，共 180 种配置。

### 关键发现
推翻了"更多 Agent = 更强能力"的常见假设。**Scaling Laws** 表明效果强烈依赖领域，盲目扩展可能引入 **Error Amplification** 和额外开销。

### 预测模型
使用四项经验协调指标建立预测框架：
- Efficiency（效率）
- Overhead（开销）
- **Error Amplification**（错误放大）
- Redundancy（冗余）

## Related Topics
- **LLM Agent Architecture**
- **Benchmark Evaluation**
- **Coordination Overhead**
- **Claude Agent SDK**
