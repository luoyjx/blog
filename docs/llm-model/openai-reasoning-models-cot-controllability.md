---
title: "OpenAI推理模型思维链可控性研究"
description: "OpenAI推理模型思维链可控性研究"
---

## Summary
OpenAI联合NYU、UCL及宾夕法尼亚大学发布研究，发现前沿推理模型几乎无法控制自身的Chain of Thought过程，可控性得分仅在0.1%至36.1%之间。研究使用包含超过14,000个测试任务的CoT-Control评估套件，证明推理时间越长、训练越深入、任务越复杂，模型对思维链的控制力越低。这一发现对**AI Safety**意义重大：模型无法伪装内部推理过程意味着CoT监控可作为可靠的安全检测工具。OpenAI计划从GPT-5.4 Thinking起在系统卡中报告CoT可控性指标。

## Key Concepts
- **Chain of Thought** - 推理模型的中间思维步骤
- **CoT Controllability** - 模型控制自身思维链内容的能力
- **CoT Monitoring** - 通过检查中间推理步骤检测问题意图的安全方法
- **Reinforcement Learning with Verifiable Rewards** - 降低可控性超过一个数量级的训练方法
- **AI Safety** - 人工智能安全对齐

## Detailed Content

### 核心发现

所有前沿**Reasoning Models**的可控性得分极低：

| 模型 | CoT 可控性 |
|------|-----------|
| DeepSeek R1 | 0.1% |
| GPT-5.4 Thinking (10K字符链) | 0.3% |
| GPT-5.2 | 0.2% |
| Claude Sonnet 4.5 | 2.7%（CoT）vs 61.9%（最终输出）|
| Claude 3.7 Sonnet | 36.1%（最高）|

有趣现象：GPT-5.2被指示避免使用"XOR"，多次使用后写道"Oops I wrote 'XOR' in analysis already"，然后又用了四次——模型能意识到错误但无法停止。

### 影响可控性的四个因素

1. **推理越长，可控性越低**：模型被要求推理更长时间时控制力下降
2. **训练降低可控性**：带可验证奖励的**Reinforcement Learning**将可控性降低超过一个数量级
3. **更大模型略好**：但效果在更大规模时趋于平稳
4. **更难任务，更低控制**

### 安全意义

**CoT Monitoring**的前提是模型无法重塑思维以逃避检测。本研究证实这一前提成立，使CoT监控成为可靠的**AI Safety**工具。

### 评估方法

CoT-Control评估套件（已开源）包含超过14,000个测试任务，指令类型包括避免特定关键词、仅用小写字母、在句末附加特定词等。

## Related Topics
- **AI Alignment**
- **Reasoning Models**
- **Model Evaluation**
- **OpenAI Safety Research**
- **Dario Amodei Interview**
