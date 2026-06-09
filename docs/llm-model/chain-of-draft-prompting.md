---
title: "Chain of Draft (CoD)：用 CoT 7.6% 的 Token 达到同等推理准确率"
description: "Chain of Draft (CoD)：用 CoT 7.6% 的 Token 达到同等推理准确率"
---

## Summary
Chain of Thought (CoT) 的效率优化版。核心思想：像人类草稿纸上只记关键信息一样，LLM 推理不需冗长解释。仅用 CoT 7.6% 的 Token 达到同等或更好准确率。模板：每步限 5 个词，只保留最关键信息，`####` 后给出答案。

## Key Concepts
- **Chain of Draft** — CoT 的极简版，每步最多 5 词
- **Chain of Thought** — 传统逐步推理技术（CoD 的基础）
- **Token Efficient Reasoning** — 用最少 Token 完成有效推理
- **Minimalist Prompting** — 极简提示词设计哲学

## Prompt Template
```
Think step by step, but only keep a minimum draft for each thinking step, with 5 words at most.
Return the answer at the end of the response after a separator ####.
```

## CoT vs CoD
| 维度 | CoT | CoD |
|------|-----|-----|
| Token 使用 | 100% | ~7.6% |
| 准确率 | 基准 | 同等或更好 |
| 输出风格 | 冗长解释 | 关键词/公式 |
| 最佳场景 | 复杂推理 | 结构化推理 |

## Limitations
- 需较大模型（>3B 参数）
- Zero-shot 效果较差，建议 few-shot
- 最适合结构化推理任务

## Related Topics
- **Caveman：极简模式节省 75% Token 的 Claude Code Skill**
- **OpenAI GPT-5 Prompting 指南（官方 Cookbook）**
- **Anthropic官方交互式Prompt Engineering教程（9章）**
