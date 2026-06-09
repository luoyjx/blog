---
title: "DeepSeek Engram - 为 LLM 添加第二大脑的条件记忆架构"
description: "DeepSeek Engram - 为 LLM 添加第二大脑的条件记忆架构"
---

## Summary
DeepSeek 的 **Engram** 架构将常见 **N gram Lookup** 模式存储在查找表中，而非通过神经层计算，对频繁序列实现 O(1) 检索复杂度。架构包含四大组件：Tokenizer 压缩（减少 23% 词汇量）、**Multi Head Hashing**（并行哈希表缓解碰撞）、**Context Aware Gating**（动态判断何时使用查找表 vs 神经计算）和多分支集成（不同 N-gram 尺寸独立处理后卷积合并）。Engram-27B 在 NIAH 长上下文检索任务上提升 +12.8，最优分配策略为将约 20%-25% 的稀疏参数预算分配给 Engram。

## Key Concepts
- **Engram** - 条件记忆架构，将 N-gram 模式存储在查找表中
- **N gram Lookup** - O(1) 复杂度的频繁序列检索
- **Multi Head Hashing** - K 个不同哈希头并行缓解碰撞
- **Context Aware Gating** - 动态判断查找表可信度 vs 神经计算
- **LLM Architecture** - 大语言模型架构设计

## Detailed Content

### 四大架构组件
1. **Tokenizer 压缩**：通过语义合并冗余 token，有效词汇量减少 23%
2. ****Multi Head Hashing****：对每个 N-gram 阶使用 K 个哈希头，并行哈希表缓解碰撞
3. ****Context Aware Gating****：用隐藏状态作为动态查询，判断 **N gram Lookup** 何时可信
4. **多分支集成**：不同 N-gram 尺寸保持独立处理路径，通过学习的卷积合并输出

### 性能提升（Engram-27B）
| 任务 | 提升 |
|------|------|
| MMLU（知识） | +3.0 |
| CMMLU | +4.0 |
| BBH（推理） | +5.0 |
| DROP | +3.3 |
| NIAH（长上下文检索） | +12.8 |

### 系统设计
- **训练**：嵌入表跨 GPU 分片，5x 学习率缩放
- **推理**：确定性 ID 实现运行时预取，100B 参数卸载到 CPU 内存仅 &lt;3% 开销

### 最优分配策略
U 形缩放规律：约 20%-25% 的稀疏参数预算分配给 **Engram** 效果最佳，该比例跨模型尺寸保持稳定。

## Related Topics
- **Scaling Laws**
- **Sparse Models**
- **DeepSeek**
- **Mixture of Experts**
