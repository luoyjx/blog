---
title: "Claude Code Token 缓存深度解析：缓存命中节省 80% 成本"
description: "Claude Code Token 缓存深度解析：缓存命中节省 80% 成本"
---

## Summary
@minlibuilds 基于 Gemma4 本地实验的 Claude Code Prompt Caching 解析。缓存命中可节省约 80% Token 成本。Claude Code 长系统提示词特别受益于缓存机制（缓存读取约原价 10%）。

## Key Concepts
- **Prompt Caching** — Anthropic 对超过阈值的提示词前缀进行缓存
- **Token Cost Optimization** — 通过缓存降低 API 调用成本
- **Cache Hit Rate** — 缓存命中率，影响实际节省比例

## Key Numbers
- 缓存命中节省：~80% Token 成本
- 缓存读取费用：约原价 10%

## Related Topics
- **Caveman：极简模式节省 75% Token 的 Claude Code Skill**
- **code-review-graph：Tree-sitter 本地知识图谱 49x Token 减少**
- **Everything Claude Code (ECC) - AI Agent 性能优化生态系统**
