---
title: "How to Think About GPUs - 大模型训练GPU架构深度指南"
description: "How to Think About GPUs - 大模型训练GPU架构深度指南"
---

## Summary
Google DeepMind 的 GPU 架构深度技术指南（How To Scale Your Model 第12章）。覆盖：SM/Tensor Core/CUDA Core 硬件架构、内存层次（寄存器→SMEM→L2→HBM）、H100 vs **Blackwell B200** 对比（bf16 从990到2250 TFLOP/s）、**NVLink**/NVSwitch/InfiniBand 网络拓扑、集合操作（AllReduce/AllToAll/SHARP）、四种 **Training Parallelism**（数据/张量/专家/流水线）及 roofline 分析。含 DeepSeek V3 和 LLaMA-3 实际配置案例。

## Key Concepts
- **GPU Architecture** — SM + Tensor Cores + 内存层次的完整技术解析
- **Tensor Core** — GPU 矩阵计算核心单元
- **NVLink** — 节点内 GPU 全连接高速互联
- **Training Parallelism** — 数据/张量/专家/流水线四种并行策略
- **Memory Hierarchy** — 寄存器→SMEM→L2→HBM 多级缓存
- **Blackwell B200** — 下一代 GPU，2250 TFLOP/s bf16

## Related Topics
- **Scaling Hypothesis**
- **Compute Investment**
- **LLM Architecture**
