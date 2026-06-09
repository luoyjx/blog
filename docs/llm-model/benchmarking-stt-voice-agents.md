---
title: "语音Agent STT基准测试"
description: "语音Agent STT基准测试"
---

## Summary
Daily.co发布了针对语音Agent场景的STT基准测试，评估10个服务在1,000个真实人类语音样本上的转录延迟和语义准确性。Pareto前沿表现者为Deepgram Nova 3（247ms/1.62% WER）、Soniox（249ms/1.29% WER）和Speechmatics（495ms/1.07% WER）。研究创新性地引入Semantic WER概念，使用Claude进行语义评估，区分不影响理解的格式变化和真正的关键错误。关键发现包括P95延迟比中位数更重要、准确性地板已大幅提升（所有服务语义WER &lt; 4.4%）、最快与最慢之间存在5倍延迟差距。

## Key Concepts
- **Speech to Text** - 语音转文字技术
- **Voice Agent** - 语音交互AI代理
- **Semantic WER** - 基于语义理解的Word Error Rate评估方法
- **Latency Benchmarking** - 转录延迟的基准测试方法
- **Turn Detection** - 判断用户何时说完的轮次检测

## Detailed Content

### 测试概览

10个**Speech to Text**服务，1,000个真实人类语音样本，评估两个关键维度：转录延迟和语义准确性。

### 三大性能因素

1. **语义准确性**：转录是否清晰传达用户意图（而非完美逐字匹配）
2. **延迟**：STT返回最终转录的速度
3. ****Turn Detection****：判断用户何时说完

### 最优表现者（Pareto前沿）

| 服务 | 延迟 | WER |
|------|------|-----|
| Deepgram Nova 3 | 247ms | 1.62% |
| Soniox | 249ms | 1.29% |
| Speechmatics | 495ms | 1.07% |

### **Semantic WER**创新

传统WER会惩罚缩写和格式变化（对LLM无关），**Semantic WER**使用Claude进行语义评估：
- "gonna/going to" -> 非错误（不影响理解）
- "renew/review" -> 关键错误（改变语义）

仅计算影响理解的错误，更贴近**Voice Agent**实际使用场景。

### 关键发现

- **P95延迟比中位数更重要**：揭示用户实际体验的最差场景
- **准确性地板已大幅提升**：所有服务**Semantic WER** &lt; 4.4%
- **延迟差异显著**：最快与最慢之间5x差距
- 竞争正扩展到语言支持、成本、本地部署和微调能力

## Related Topics
- **Voice AI**
- **Natural Language Processing**
- **Real time Audio Processing**
- **LLM Integration**
- **AI Agent Tools**
