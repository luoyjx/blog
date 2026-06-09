---
title: "并行编程导论与 CUDA 入门"
description: "并行编程导论与 CUDA 入门"
---

## Summary
jasonkayzk 的 CUDA 入门教程，介绍并行编程基础与 CUDA 核心概念：SIMT 模型、Grid/Block/Thread 三级线程层次、cudaMalloc/cudaMemcpy 内存管理、Kernel 函数编写。含 CPU→GPU 加法示例及性能分析关键结论。

## Key Concepts
- **CUDA** — Nvidia 并行计算平台，SIMT 模型
- **SIMT** — Single Instruction Multiple Threads，GPU 执行模型
- **Thread Hierarchy** — Grid → Block → Thread，索引计算 `BlockID × BlockSize + ThreadID`
- **GPU Programming** — Host/Device 协同工作流

## Core Workflow
```
Host 准备数据 → cudaMalloc → cudaMemcpy(H→D) → Kernel<<<grid,block>>>() → cudaMemcpy(D→H)
```

## Performance Rules
1. 数据传输开销 > 计算时间 → 最小化 H-D 通信
2. 单 GPU 线程 &lt; CPU 核心 → 性能靠大规模并行
3. 合并循环到 Kernel 内部 → 减少启动开销
4. 用 Nsight Systems 做性能分析

## Related Topics
- **How to Think About GPUs - 大模型训练GPU架构深度指南**
- **CMU 10-202: Introduction to Modern AI - 现代AI入门课程**
