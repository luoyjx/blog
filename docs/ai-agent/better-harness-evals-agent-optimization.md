---
title: "Better-Harness：Evals 驱动的 Agent Harness 持续优化方法论"
description: "Better-Harness：Evals 驱动的 Agent Harness 持续优化方法论"
---

## Summary
@shao__meng 提出的 Agent 工程优化方法论。核心类比：ML 用梯度下降优化模型，Agent 工程用 Evals 优化 Harness。五步工作流：获取 Evals→数据分层（优化集/保留集）→基线测试→自动优化→人工审核。三个关键设计：行为标签体系、保留集防过拟合+单变量原则、通过的 Evals 转为回归测试（TDD 理念）。Claude Sonnet 4.6 / GLM-5 实测泛化良好。

## Key Concepts
- **Agent Evals** — 将模糊的"表现好"转化为可测量指标
- **Harness Optimization** — Harness + Evals + 工程优化 → 更好的 Agent
- **Holdout Set** — 保留集，验证优化是否泛化，防止过拟合
- **Single Variable Principle** — 每次只改一个变量，避免混淆因素
- **Eval Driven Development** — 通过的 Evals 转为回归测试，类似 TDD

## Workflow
```
1. 获取 Evals（手工/生产日志/外部数据集）
2. 数据分层（优化集 + 保留集，行为标签分类）
3. 基线测试（修改前记录当前表现）
4. 自动优化（诊断→修改 Harness→验证）
5. 人工审核（检查过拟合/冗余）
```

## Core Analogy
| ML | Agent Engineering |
|----|-------------------|
| 模型 | Harness |
| 训练数据 | Evals |
| 梯度下降 | 工程优化 |
| 更好的模型 | 更好的 Agent |

## Anti-Overfitting
- 保留集（Holdout Set）
- 人工审核（捕捉自动化遗漏）
- 单变量原则（每次一个修改）

## Related Topics
- **Anthropic官方：揭秘AI Agent评测 - 从设计到实施的完整指南**
- **Anthropic官方：构建有效AI Agent的设计模式与实践指南**
- **Anthropic: Harness Design for Long-Running Application Development**
- **双城记：代码 Harness 演进到金融 Harness——Agent 进入价值世界的边界重建**
- **Systems Engineering：构建可靠 Agentic 软件的工程原则**
