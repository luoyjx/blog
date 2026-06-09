---
title: "Google LangExtract - 带溯源的LLM结构化信息提取库"
description: "Google LangExtract - 带溯源的LLM结构化信息提取库"
---

## Summary
35.5k stars 的 Google 开源库，用 LLM 从非结构化文本提取结构化信息，核心特色是**精确溯源**——每条提取结果映射到原文具体位置。支持 Gemini/OpenAI/Ollama，Few-shot 定义任务无需微调，生成可视化 HTML 审查结果。适用于医疗、法律、文学等任意领域。

## Key Concepts
- **LangExtract** — Google 出品的带溯源结构化提取库（35.5k stars）
- **Source Grounding** — 提取结果精确映射原文位置，可视化高亮
- **Structured Output** — 基于示例强制一致 Schema
- **Document AI** — 长文档分块并行处理

## Use Cases
```python
# 示例：医疗记录药物提取
extractor = LangExtract(model="gemini-2.0-flash")
results = extractor.extract(clinical_note, examples=few_shot_examples)
```

## Related Topics
- **dots.ocr (dots.mocr) - 多语言文档版式解析 VLM**
- **CommonForms - PDF 自动转可填写表单（ML表单字段检测）**
- **cognee - AI Agent记忆知识引擎（6行代码）**
