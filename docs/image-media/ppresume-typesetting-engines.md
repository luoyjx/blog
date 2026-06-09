---
title: "排版引擎对比：HTML/LaTeX/Typst/React-pdf（程序员视角）"
description: "排版引擎对比：HTML/LaTeX/Typst/React-pdf（程序员视角）"
---

## Summary
PPResume（简历生成器）开发者从实际需求出发，对比5种排版引擎：HTML/CSS、LaTeX、LaTeX.js、Typst、React-pdf。4项评估标准：Knuth-Plass断行、CJK支持、分页、实时预览。结论：LaTeX是唯一满足全部需求的引擎；Typst CJK 支持尚不完整；React-pdf 无CJK支持。

## Key Concepts
- **Typesetting Engines** — 5种引擎的系统对比
- **LaTeX** — 唯一满足全部4项需求，缺实时预览
- **Typst** — 现代LaTeX替代品，CJK支持尚不完整
- **Knuth Plass** — 段落级断行优化算法，优于贪心算法
- **CJK Typography** — 97,680+字符集，标点规则，字体配对

## Comparison
| 引擎 | K-P | CJK | 分页 | 实时 |
|------|:---:|:---:|:---:|:---:|
| HTML/CSS | ✗ | ✓ | 部分 | ✓ |
| **LaTeX** | ✓ | ✓ | ✓ | ✗ |
| LaTeX.js | ✗ | ✓ | ✗ | ✓ |
| Typst | ✓ | 部分 | ✓ | 部分 |
| React-pdf | ✓ | ✗ | ✓ | ✓ |

## Related Topics
- **Engineering Blogs**
- **dots.ocr (dots.mocr) - 多语言文档版式解析 VLM**
