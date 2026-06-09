---
title: "OpenAI：为什么大语言模型会幻觉（学术论文）"
description: "OpenAI：为什么大语言模型会幻觉（学术论文）"
---

## Summary
OpenAI + Georgia Tech 学术论文（2025-09-04），用计算学习理论分析 LLM 幻觉的根本原因：**训练/评估流程奖励猜测而惩罚不确定性**。类比学生猜多选题——二值评分下猜测比"我不知道"得分更高。解决方案：修改现有主导基准的评分机制（而非新增幻觉评测）。

## Key Concepts
- **LLM Hallucination** — 幻觉的统计根源：Is-It-Valid 二分类错误
- **Evaluation Misalignment** — 评测基准惩罚不确定性，优化出"考试机器"
- **Binary Grading** — 二值评分是幻觉持续存在的社会技术原因
- **Post training Bias** — 后训练强化猜测行为，而非表达不确定性

## Core Theorem
```
生成错误率 ≥ 2 × Is-It-Valid 二分类错误率
```
推论：训练数据中只出现1次的事实 → 基础模型在该事实上的幻觉率 ≥ 该比例

## Two-Phase Analysis
| 阶段 | 幻觉来源 |
|------|----------|
| 预训练 | 统计目标导致错误生成，即使数据无误 |
| 后训练 | 二值评测奖励猜测，"IDK"被惩罚 |

## Proposed Fix
修改现有主导排行榜基准评分 → 允许/奖励"我不知道"响应
（单纯增加幻觉评测不够，需改变激励机制）

## Related Topics
- **马东锡NLP：2025年度最喜欢的LLM论文集（13个方向）**
- **Simon Willison: 2025 LLM年度回顾**
- **CKA-Agent: 关联知识攻击 - LLM安全护栏绕过研究**
