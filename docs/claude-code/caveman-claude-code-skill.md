---
title: "Caveman：极简模式节省 75% Token 的 Claude Code Skill"
description: "Caveman：极简模式节省 75% Token 的 Claude Code Skill"
---

## Summary
Claude Code / Codex / Cursor / Windsurf 等多平台 skill，让 AI 用极简语言输出，平均节省 65% output token（实测 22%-87%）。含 4 级模式（Lite/Full/Ultra/文言文）、terse commit、one-line review、CLAUDE.md 压缩工具（输入 token 节省约 45%）。论文支持：简洁约束下大模型准确率反而提升 26%。

## Key Concepts
- **Token Optimization** — 输出极简化，平均节省 65% output token
- **Claude Code Skills** — 通过 `npx skills add` 安装的多平台 AI 扩展
- **Caveman Compress** — 压缩 CLAUDE.md 等输入文件，节省约 45% input token
- **Chain of Draft** — 相关论文/技术：简洁推理提升准确率

## Install
```bash
npx skills add JuliusBrussee/caveman
# 或指定平台
npx skills add JuliusBrussee/caveman -a cursor
npx skills add JuliusBrussee/caveman -a codex
```

## Intensity Levels
| 级别 | 触发 | 效果 |
|------|------|------|
| Lite | `/caveman lite` | 去掉废话，保留语法 |
| Full | `/caveman full` | 默认。去冠词，用碎片句 |
| Ultra | `/caveman ultra` | 最大压缩，电报式 |
| 文言文 | `/caveman wenyan` | 古典中文压缩（人类最高效书面语） |

## Sub-Skills
| Skill | 功能 |
|-------|------|
| caveman-commit | 精简 commit message，Conventional Commits，≤50 字符 |
| caveman-review | One-line PR 评论：`L42: 🔴 bug: user null. Add guard.` |
| caveman-compress | 压缩 CLAUDE.md → 节省每次会话 input token |

## Benchmarks（实测 Claude API）
| 任务 | Normal | Caveman | 节省 |
|------|-------:|--------:|-----:|
| React re-render bug | 1180 | 159 | 87% |
| Auth middleware fix | 704 | 121 | 83% |
| PostgreSQL pool setup | 2347 | 380 | 84% |
| Docker multi-stage | 1042 | 290 | 72% |
| **平均** | **1214** | **294** | **65%** |

注意：仅影响 output token，thinking/reasoning token 不受影响。

## 论文支持
arXiv 2604.00025：简洁约束下大模型准确率**提升 26%**，颠覆"越详细越好"的假设。

## Related Topics
- **code-review-graph：Tree-sitter 本地知识图谱 49x Token 减少**
- **Claude Code Token 缓存深度解析：缓存命中节省 80% 成本**
- **Chain of Draft (CoD)：用 CoT 7.6% 的 Token 达到同等推理准确率**
- **Awesome Claude Code Toolkit - 最全面的Claude Code工具集**
