---
title: "Karpathy microGPT - 纯Python零依赖的最小GPT实现"
description: "Karpathy microGPT - 纯Python零依赖的最小GPT实现"
---

## Summary
Andrej Karpathy 发布的 microGPT 项目，用约 300 行纯 Python 代码（无任何外部依赖）完整实现了 GPT 的训练和推理。项目包含自动微分系统、字符级分词器、单层 Transformer 架构、Adam 优化器和温度控制采样推理。核心教育理念是"This file is the complete algorithm. Everything else is just efficiency."，展示了 GPT 的最简化但可运行版本。

## Key Concepts
- **GPT Architecture** - 嵌入、注意力、Transformer 的最小化实现
- **Autograd** - `Value` 类实现的自动微分系统（前向/反向传播）
- **Transformer** - 单层 Transformer，含线性变换、softmax、RMSNorm
- **From Scratch Implementation** - 零依赖纯 Python 教育实现
- **Adam Optimizer** - 含学习率衰减的优化器实现

## Detailed Content

### 完整实现内容
1. **数据集加载**：从 GitHub 获取名字数据集
2. **分词器**：基于字符级词汇表，含 BOS token
3. ****Autograd** 系统**：`Value` 类实现前向/反向传播（加法、乘法、幂、ReLU、log、exp）
4. **模型架构**：
   - 嵌入维度：16，上下文长度：16
   - 注意力头：4，1 层 **Transformer**
   - 含线性变换、softmax、RMSNorm
5. **训练循环**：1000 步，交叉熵损失，**Adam Optimizer** + 学习率衰减
6. **推理**：温度控制采样生成 20 个样本

### 教育价值
"This file is the complete algorithm. Everything else is just efficiency." -- 一切框架、优化、并行化都是效率提升，核心算法就这 300 行。是理解 **GPT Architecture** 最直接的方式。

## Related Topics
- **Deep Learning Education**
- **Neural Network From Scratch**
- **Language Model**
- **Attention Mechanism**
- **Backpropagation**
