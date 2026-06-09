---
title: "DART：推理与工具使用的梯度正交冲突，LoRA 参数级解耦方案"
description: "DART：推理与工具使用的梯度正交冲突，LoRA 参数级解耦方案"
---

## Summary
论文揭示 Agentic RL 中推理和工具使用的梯度近乎正交（~90°），联合训练互相干扰而非协同。DART 方案：冻结骨干+两个独立 LoRA（推理/工具）+token 级路由，梯度完全隔离。3B 规模 EM +6%，多跳推理 +30%，接近 2-Agent 上限但保持单模型效率。更广泛意义：LoRA 从高效微调工具升级为能力模块化载体。

## Key Concepts
- **Gradient Conflict** — 推理与工具 token 梯度近正交，联合训练折中次优
- **DART** — Disentangled Action-Reasoning Tuning，双 LoRA 参数解耦
- **Dual LoRA** — 推理 LoRA + 工具 LoRA，独立低秩子空间
- **Token Level Routing** — 按 token 类型路由到对应 LoRA
- **LEAS** — Linear Effect Attribution System，量化能力间协同/干扰

## Why Conflict?
| 阶段 | 梯度关系 | 原因 |
|------|---------|------|
| 预训练 | 大致对齐 | 共享底层语言表征 |
| Agentic RL 后训练 | 近正交 | 推理（思维链）vs 工具（API/控制流）目标完全不同 |

## DART Architecture
```
Backbone (frozen)
├── Reasoning LoRA (B_r, A_r) ← reasoning tokens only
└── Action LoRA (B_a, A_a)    ← tool tokens only
Token-level router decides which LoRA receives gradient
```

## Results (3B scale)
| 指标 | 提升 |
|------|------|
| 平均 EM vs Search-R1-GRPO | +6% |
| 多跳推理相对提升 | ~30% |
| vs 2-Agent 系统 | 接近上限，单模型效率 |

## Broader Insight
- 不是所有能力都应共享参数空间联合训练
- 梯度冲突时，参数解耦 > 复杂奖励设计
- LoRA 新角色：能力模块化 + 结构解耦载体

## Related Topics
- **SKILL-0：无梯度更新的 In-Context Agentic RL 技能内化**
- **AI 工程四层模型：从 Prompt 到 Architecture**
- **Gemma 4 免费微调：Google Colab + Unsloth Studio 零成本方案**
- **Transformer 架构解析：Attention 机制与工作原理**
