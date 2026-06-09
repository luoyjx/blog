---
title: "CommonForms - PDF 自动转可填写表单（ML表单字段检测）"
description: "CommonForms - PDF 自动转可填写表单（ML表单字段检测）"
---

## Summary
982 stars 的 Python 工具，基于 ML 模型（FFDNet）自动检测 PDF 表单字段，生成可交互填写的 PDF。支持 CLI + Python API，有 FFDNet-L/S 两款模型可选，Apache 开源。基于 Towards Data Science 同作者研究论文，有 HuggingFace 数据集与在线 Demo。

## Key Concepts
- **CommonForms** — PDF 表单字段自动检测与填写化工具
- **Document AI** — ML 驱动的文档智能处理
- **Form Detection** — FFDNet 模型检测 PDF 中表单字段位置
- **PDF Processing** — 生成可交互填写的 PDF

## Usage
```bash
pip install commonforms
commonforms input.pdf -o output.pdf
```

## Models
| 模型 | 特点 |
|------|------|
| FFDNet-L | 精度高，适合准确性优先 |
| FFDNet-S | 速度快，适合批量处理 |

## Related Topics
- **ConvertX - 自托管文件格式转换平台（1000+格式）**
- **Document AI**
- **Self Hosted Tools**
