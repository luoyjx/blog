---
title: "code-review-graph：Tree-sitter 本地知识图谱 49x Token 减少"
description: "code-review-graph：Tree-sitter 本地知识图谱 49x Token 减少"
---

## Summary
用 Tree-sitter 构建本地代码知识图谱，精准传递与当前变更相关的代码上下文。最大 49x Token 减少，跨 6 个仓库平均 8.2x 减少。Claude Code Review 的 Token 优化方案。

## Key Concepts
- **Code Knowledge Graph** — 代码依赖关系图谱化
- **Tree sitter** — 代码解析库，提取 AST 和依赖关系
- **Token Optimization** — 精准上下文，只传相关代码
- **AST** — 抽象语法树，代码结构分析基础

## Performance
| 指标 | 数值 |
|------|------|
| 最大 Token 减少 | 49x |
| 平均 Token 减少 | 8.2x |
| 测试仓库 | 6 个 |

## Related Topics
- **Caveman：极简模式节省 75% Token 的 Claude Code Skill**
- **Matthias Endler：如何做好代码审查（20年经验）**
- **Context Graph是下一代数据平台 - Glean创始人论企业流程理解**
