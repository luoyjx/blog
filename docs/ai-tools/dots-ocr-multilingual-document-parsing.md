---
title: "dots.ocr (dots.mocr) - 多语言文档版式解析 VLM"
description: "dots.ocr (dots.mocr) - 多语言文档版式解析 VLM"
---

## Summary
小红书（rednote-hilab）开源的 8.2k stars 多语言文档版式解析 VLM（2026年3月更名 dots.mocr）。1.7B 参数，支持全人类文字，可解析表格/公式/图表，输出 Markdown/LaTeX/HTML/JSON，在 olmOCR-Bench 等基准领先同规模模型。vLLM 官方集成。

## Key Concepts
- **dots.mocr** — 小红书开源多语言文档版式解析 VLM（8.2k stars）
- **Document Layout Parsing** — 11种版式类别，含表格、公式、标题
- **Multilingual OCR** — 支持几乎所有人类文字
- **SVG Generation** — 将图表/示意图转为结构化 SVG

## Output Formats
| 内容类型 | 输出格式 |
|---------|---------|
| 文本 | Markdown |
| 公式 | LaTeX |
| 表格 | HTML |
| 结构 | JSON（含边界框） |

## Related Topics
- **Google LangExtract - 带溯源的LLM结构化信息提取库**
- **CommonForms - PDF 自动转可填写表单（ML表单字段检测）**
- **Perplexity at Work - AI高效工作完整指南**
