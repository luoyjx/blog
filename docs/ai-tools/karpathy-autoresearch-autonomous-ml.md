---
title: "Karpathy AutoResearch - AI自主机器学习研究"
description: "Karpathy AutoResearch - AI自主机器学习研究"
---

## Summary
Andrej Karpathy开源的AutoResearch项目，让AI Agent在一夜之间自主进行机器学习研究。系统基于nanochat的精简单GPU实现，Agent独立修改train.py、执行固定5分钟实验、评估改进效果并自动迭代，一夜可完成约100个实验。核心设计原则包括**Single File Scope**（仅修改train.py）、**Fixed Budget Training**（固定5分钟训练预算）和标准化指标（val_bpb）。这是**Autonomous Research**在ML领域的开创性实践，展示了Agent从"辅助工具"到"自主研究者"的演进。

## Key Concepts
- **Autonomous Research** - AI Agent自主进行科学研究的范式
- **Single File Scope** - Agent仅编辑单个文件，保持变更可管理、diff可审查
- **Fixed Budget Training** - 固定5分钟训练预算，约每小时12个实验
- **Agent Autonomy** - Agent在无人值守情况下自主决策和迭代
- **ML Experimentation** - 自动化的机器学习实验流程

## Detailed Content

### 核心架构
基于nanochat的精简单GPU实现，包含三个核心组件：

1. **prepare.py** - 固定常量，一次性数据准备和运行时工具。此文件不可修改，作为实验的固定基础设施。

2. **train.py** - AI Agent唯一修改的文件（**Single File Scope**）。包含完整的GPT模型、优化器实现（Muon + AdamW）和训练循环。架构、超参数、优化器选择、批量大小均可调整。

3. **program.md** - 给Agent的轻量级指令指南。人类编辑此文件来配置和指导研究方向。

### 关键设计原则
- ****Single File Scope****：仅修改train.py，变更可管理、diff可审查
- ****Fixed Budget Training****：无论硬件如何，训练始终运行5分钟。约每小时12个实验，一夜约100个实验
- **自包含运行**：无需分布式训练、外部框架或复杂配置
- **标准化指标**：val_bpb（验证集bits per byte），词汇表无关的比较标准

### 使用方式
要求单张NVIDIA GPU、Python 3.10+、uv包管理器。社区fork支持MacOS（MLX）、Windows和AMD平台。

### 意义
这是**Autonomous Research**的标志性项目，展示了Agent可以在无人值守情况下自主进行有意义的ML研究。"早上醒来时发现一份实验日志和改进后的模型"的使用场景，体现了**Agent Autonomy**的实际价值。

## Related Topics
- **Agent Autonomy**
- **Agentic Engineering**
- **Agent Loop**
- **ML Experimentation**
- **Vibe Coding**
