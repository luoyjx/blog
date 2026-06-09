---
title: "LiteParse：为 AI Agent 设计的本地文档解析器"
description: "LlamaIndex 把 LlamaParse 的核心处理逻辑开源为 LiteParse——一个 零 Python 依赖、纯本地运行、TS-native 的 CLI + 库。目标不是'解析得最准'，而是 快到 agent 不会超时：给出够用的粗略文本驱动推理，需要细节时再回退到截图做多模态分析。"
---

> 📄 原文：[https://www.llamaindex.ai/blog/liteparse-local-document-parsing-for-ai-agents](https://www.llamaindex.ai/blog/liteparse-local-document-parsing-for-ai-agents)

> LlamaIndex 把 LlamaParse 的核心处理逻辑开源为 **LiteParse**——一个 **零 Python 依赖、纯本地运行、TS-native** 的 CLI + 库。目标不是"解析得最准"，而是 **快到 agent 不会超时**：给出够用的粗略文本驱动推理，需要细节时再回退到截图做多模态分析。

## 一句话定位

```bash
npm i -g @llamaindex/liteparse
lit parse anything.pdf
```

解析 PDF / Office / 图片的 **布局感知文本**，本地跑、无 GPU、无云依赖。

## 核心矛盾：现有解析工具的两难

| 路线 | 代表 | 问题 |
|------|------|------|
| 快但不准 | pypdf | 精度差 |
| 准但慢 | VLM 类（LlamaParse / Docling）| 慢、要云托管或本地 GPU，agent 会**等待甚至超时** |

LiteParse 选第三条路：**够用的粗文本 + 按需截图**，让 agent 持续迭代不卡住。

## LiteParse vs LlamaParse（明确分工，不互相替代）

| | LiteParse | LlamaParse |
|---|-----------|------------|
| 场景 | 编码 agent、实时管道 | 复杂文档智能产品 |
| 运行 | 本地、开源 | 云服务、专有模型 |
| 输出 | 文本 / 截图 / bounding box | markdown 表格、JSON schema、高级 OCR |
| 取舍 | 砍掉增加延迟的处理 | 难版面也要啃准每张表 |

> 判断法则：**读一下 PDF 就走人 → LiteParse；要钉死每个表格 → LlamaParse。**

## 为 Agent 量身设计的工作流

观察到的 agent 痛点：
- Anthropic 官方 PDF skill 鼓励 agent 每次现写 pypdf/pdfplumber 代码 → **每次处理都在重写代码**
- "先快速 parse 文本，再找截图细看" 的模式有效，但**代码在文档/会话间不可移植**

LiteParse 把这个模式固化成可复用工具，**并打包成 coding agent 的 skill**：

```bash
lit parse report.pdf | grep "table"
lit screenshot report.pdf -o "./report_images" --pages "1-3"

npx skills add run-llama/llamaparse-agent-skills --skill liteparse
```

> **关键 agent 模式**：文本快速理解 → 需要时回退截图做视觉推理。
> 这与本知识库 SKILL 的 **OCR 取文字 + LLM 视觉描述** 混合图片管线是同一思想（**5个Agent Skill设计模式 - Google ADK** 的工具分层精神）。

## 设计哲学：保留版面，不检测结构

不去识别表格再转 markdown（**增加复杂度和失败模式**），而是把文本投影到**空间网格**，保留空间关系：

```
Name   Age   City
John   25    NYC
Jane   30    LA
```

> LLM 早已在 ASCII 表格、代码缩进、README 上训练过——**模型自己能读列对齐，何必造复杂的表格检测管线？**

## 支持格式：统一收敛到 PDF

| 格式 | 处理路径 |
|------|---------|
| PDF | 原生文本解析 + 空间重建；扫描页/嵌图自动触发 OCR |
| DOCX/XLSX/PPTX | LibreOffice 转 PDF → 同一空间管线 |
| PNG/JPG/TIFF | ImageMagick 转 PDF → OCR |

**核心管线靠"全部当 PDF / 转成 PDF"统一**，加新格式容易。

## OCR：内置 + 可插拔

- 内置 **Tesseract.js**，自动跨 CPU 核并行
- `--ocr-server` 可指向外部 OCR；官方给了 **PaddleOCR / EasyOCR** 示例服务器
- 任何返回 bounding-box + 文本的 OCR 模型都能接

> 与本知识库已装的 PaddleOCR（`scripts/ocr/`）选型呼应——高精度难文档仍靠 PaddleOCR，LiteParse 把它当"高精度后端"挂上去即可。

## Benchmark：为什么自建评测

- 现有 OCR 数据集（OlmOCR 等）**不适配 LiteParse 的输出形态**（非 markdown、按版面换行、字体处理）——不是错，是评测口径不匹配
- **不与 VLM 类工具比**（LlamaParse/Docling），只对标无 VLM 的基础库：**PyPDF / PyMuPDF / Markitdown**
- 自建评测管线：LLM 据截图生成 QA 对 → 人工审 → LLM-as-judge 多解析器对比
- 结论：**页级 QA 准确率更高 + 大文档解析延迟一流**（数据集已上 HuggingFace）

## 编程接口

```typescript
import { LiteParse } from '@llamaindex/liteparse';
const parser = new LiteParse({ ocrEnabled: true });
const result = await parser.parse('document.pdf');
```

```python
# pip install liteparse （CLI wrapper）
from liteparse import LiteParse
print(LiteParse().parse("document.pdf").text)
```

## 为什么重要（与知识库主线的呼应）

LiteParse 是 **"Bash/CLI 即 agent runtime"命题的又一实证**：一个工具做成 CLI、能 `| grep`、打包成 skill、本地确定性运行——正是 **Forget MCP, Bash Is All You Need：MCP 正在重新发明 POSIX** 所说"赢家都收敛到 OS 原语"的体现。它也印证 **7 Principles for Agent-Friendly CLIs** / **CLI is All Agents Need - Unix Agent 设计指南** / **给 AI 造专用 CLI：Codex 团队的 Agent-Friendly CLI 实践方法论** 的 agent-friendly CLI 设计原则：**给 agent 一个可组合、可复用、零 SDK 的命令行入口，胜过又一个 MCP server**。

## 关联

- **Forget MCP, Bash Is All You Need：MCP 正在重新发明 POSIX** — CLI/管道即 agent runtime；LiteParse 是活样本
- **7 Principles for Agent-Friendly CLIs** / **CLI is All Agents Need - Unix Agent 设计指南** / **给 AI 造专用 CLI：Codex 团队的 Agent-Friendly CLI 实践方法论** — agent-friendly CLI 设计
- **dots.ocr (dots.mocr) - 多语言文档版式解析 VLM** / **MinerU：PDF 转结构化 AI 可用数据（OCR + 版式解析）** / **CommonForms - PDF 自动转可填写表单（ML表单字段检测）** / **Paperless-ngx - 自托管文档数字化管理系统** — 文档解析/管理生态
- **Anthropic Agent Skills - 为真实世界任务装备AI Agent的技能框架** / **Anthropic官方完整指南：构建Claude Skills** — LiteParse 以 skill 形态分发；文中点名 Anthropic PDF skill
- **qwen-asr-skill - Claude Code本地语音转文字技能** — 同为"本地优先、给 agent 用"的工具范式
