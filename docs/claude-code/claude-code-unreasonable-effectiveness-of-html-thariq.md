---
title: "HTML 取代 Markdown：Claude Code 输出格式的范式转移"
description: "Making HTML documents with Claude is just more fun and makes me feel more involved and invested in the creation, and that by itself is enough."
---

## Summary

Thariq（Claude Code 团队）2026-05-08 发布的高传播长文（9.9M 浏览），主张**用 HTML 取代 Markdown 作为 Agent 与人沟通的主要输出格式**。核心命题：Markdown 在 100 行后变得不可读，且当文件不再由人编辑（用 Claude 改）时，Markdown 的最大优势（易编辑）消失了。**HTML 的六大优势**：① 信息密度（表格/CSS/SVG/代码/交互/工作流/空间数据/图像，几乎一切 Claude 能读的都能高效表达）② 视觉清晰度（>100 行 spec 真正有人读了）③ 易分享（上传 S3 即可分享链接）④ 双向交互（带滑块的设计、能改参数复制回 prompt 的编辑器）⑤ Data ingestion（Claude Code 的文件系统/MCP/git 历史/浏览器）⑥ Joyful（参与感）。**五大使用场景**：specs/planning、code review、design/prototype、reports/research、**custom throwaway editors**（最反直觉的用法——为单个数据 piece 现造一个 UI 编辑器，end with copy-as-JSON/prompt 按钮）。**金句**：HTML 是 "Stay in the Loop" 的关键——不是退出循环让 Claude 决策，而是用富表达让自己更深入参与。**最大成本**：HTML 比 Markdown 慢 2-4×，diffs 噪声大；最大收益：你和团队真的会读、会用。

## Key Concepts

- **HTML 取代 Markdown** — Claude Code 团队的内部趋势，从信息载体升级到富表达载体
- **Markdown 100 行天花板** — 实证：100 行以上的 markdown 文件人不读，团队更不读；HTML 没这个天花板
- **人不再编辑文件** — Markdown 的核心优势（易编辑）消失了，因为现在用 Claude 改文件而非自己改
- **Two way Interaction 文档** — 文档不只是被阅读，可以带 sliders/knobs 让用户调，结果通过 copy 按钮回到 prompt
- **Throwaway Editor 模式** — 为单个数据 piece 现造一次性 HTML 编辑器，end with copy-as-X 按钮；30 个 Linear ticket 排序、feature flag 编辑、prompt 调试等
- **Copy Back 模式** — HTML 编辑器的核心 export 设计：永远以"copy as JSON / copy as prompt"按钮结尾，把 UI 操作翻译回 Claude Code 的输入
- **Stay in the Loop** — HTML 的真正价值：用富表达让用户更深入参与 Claude 的工作过程，而非被排除在循环外
- **Design System HTML 引用** — 让 Claude 风格一致的实践：先生成一个 design system HTML 文件作参考，后续 HTML 都引用它
- **ASCII 图退化 / Unicode 估色** — Markdown 限制下 Claude 的不优雅 workarounds
- **HTML 是 Agent 富表达通道** — 表格/SVG/CSS/JS/canvas 都是 HTML 原生能力；几乎一切信息都可在 HTML 表达
- **/html skill 反模式警告** — 不要把这变成正式 skill，直接 prompt "make an HTML file" 即可
- **版本控制是 HTML 最大缺陷** — HTML diff 噪声大、难审；不适合需要 PR review 的场景

## Tags

claude-code, html-output, agentic-output, markdown-vs-html, two-way-interaction, throwaway-editor, design-system, thariq, anthropic, output-format

## Detailed Content

### 核心命题反转

**主流观点**：Markdown 是 Agent 与人沟通的标准格式，简单、可移植、易编辑。

**Thariq 的反转**：
- Markdown 在 Agent 时代已成为**限制性格式**
- 100 行以上 markdown 没人读
- 文件不再由人编辑后（改文件也用 Claude），**Markdown 的最大优势消失了**

### 范式转移路径

```
[ Agent 早期 ]
  Claude 输出 → 用户直接读/编辑 Markdown
  → Markdown 完美

[ Agent 增强期 ]
  Claude 输出 → 100+ 行 Spec/Plan/Report
  → Markdown 没人读了

[ Agent 成熟期 = 现在 ]
  Claude 输出 + Claude 编辑 + 团队消费
  → 需要富表达、易分享、可交互
  → HTML 替代 Markdown
```

---

### HTML 的六大优势（详细对比）

#### 1. 信息密度

| 信息类型 | Markdown | HTML |
|---------|----------|------|
| 简单文档结构 | ✓ | ✓ |
| 表格 | 基础 | 富表格 |
| 设计数据 | ✗ | CSS |
| 插图 | ASCII（不优雅）| SVG |
| 代码片段 | 静态 | 可执行 script |
| 交互 | ✗ | JS + CSS |
| 工作流 | ASCII | SVG + HTML |
| 空间数据 | ✗ | absolute + canvas |
| 图像 | URL | `<img>` |

**反例（Markdown 限制下的 workarounds）**：
- Claude 用 ASCII 画图（信息密度低）
- Claude 用 unicode 字符估色（不准确）

#### 2. 视觉清晰度

- Markdown 100 行后 → **本人不读** + **同事更不读**
- HTML → tabs / illustrations / links 组织 + 移动响应 + 真有人读

#### 3. 易分享

| 维度 | Markdown | HTML |
|------|----------|------|
| 浏览器原生渲染 | ✗ | ✓ |
| 分享方式 | 附件、贴心粘贴 | **上传 S3 + 链接** |
| 同事打开成本 | 高 | 一键 |
| 真被阅读率 | 低 | **高得多** |

#### 4. 双向交互（这是 Markdown 完全做不到的）

**HTML 文档可以**：
- 带 sliders / knobs 调参
- 实时预览
- **copy 按钮把改动复制回 prompt**

这是 **two way interaction document** 的实现基础——文档不再是"读完就完"的产物，而是 prompt 工作流的一部分。

#### 5. Data Ingestion（Claude Code 独有优势）

为什么不用 Claude.ai 或 Claude Design？

**Claude Code 能从这些来源拉取上下文**：
- 文件系统
- MCPs（Slack / Linear / etc.）
- Web 浏览器（Claude in Chrome）
- Git 历史

**实战示例（本文写作过程）**：
- 让 Claude Code 读整个代码文件夹
- 找出所有生成过的 HTML 文件
- 分组分类
- 生成一个含每类代表图的 HTML

#### 6. Joyful

> Making HTML documents with Claude is just **more fun** and makes me feel more involved and invested in the creation, **and that by itself is enough**.

—— Engineering 类型的"参与感经济学"——

---

### 五大使用场景

#### 场景 1：Specs / Planning / Exploration

**模式**：把单个 Markdown plan 换成 **"a web of HTML files"**

```
[ 工作流 ]
1. 让 Claude 探索多个方案（多个 HTML）
2. 选一个 expand（mockup + 代码片段）
3. 写实现计划
4. 新 session，把所有 HTML 喂给 Claude 实现
5. Verification agent 读这些文件，有更广上下文
```

**强力 prompt 范例**：
> "Generate 6 distinctly different approaches — vary layout, tone, and density — and lay them out as a single HTML file in a grid so I can compare them side by side. Label each with the tradeoff it's making."

#### 场景 2：Code Review & Understanding

**Thariq 的实践**：每个 PR 都附一个 HTML code explainer。

**为什么 > GitHub diff view**：
- 内联 margin 标注
- 按严重程度着色
- 流程图、模块图
- 聚焦关心的部分

**强力 prompt**：
> "Help me review this PR by creating an HTML artifact that describes it. I'm not very familiar with the streaming/backpressure logic so focus on that. Render the actual diff with inline margin annotations, color-code findings by severity..."

#### 场景 3：Design & Prototypes

**核心洞察**：**Claude Design 之所以基于 HTML，因为 HTML 是最具表达性的设计语言**，即使最终落地不是 HTML（可能是 React / Swift）。

**勿替代品**：sliders、knobs 调动画/颜色/easing。

**强力 prompt**：
> "Create a HTML file with several sliders and options for me to try different options on this animation, give me a copy button to copy the parameters that worked well."

#### 场景 4：Reports / Research / Learning

**Claude Code 跨数据源合成的能力**：搜 Slack、代码、git 历史、互联网 → HTML 报告/讲解/slidedeck。

**Thariq 自己写本文 prompt caching 系列时**：让 Claude 读 git 历史，生成 in-depth research HTML。

#### 场景 5：Custom Editing Interfaces（最反直觉的用法）

> Sometimes it's hard to describe what you want purely in a text box. **Build a throwaway editor for the exact thing I'm working on. Not a product, or a reusable tool, but a single HTML file, purpose-built for this one piece of data.**

**Throwaway Editor 模式的核心**：

```
[ 1. 让 Claude 为某个数据现造 HTML 编辑器 ]
   → 不是产品，不是工具
   → 一次性，单文件，针对这次任务
[ 2. UI 操作（拖拽 / 排序 / 选择 / 调参）]
[ 3. 关键：永远 end with copy-as-X 按钮 ]
   → copy as JSON
   → copy as markdown
   → copy as prompt
[ 4. 复制回 Claude Code 作下一步输入 ]
```

**经典用例**：
- 30 个 Linear ticket 拖拽到 Now/Next/Later/Cut → 复制回 markdown
- Feature flag config 表单编辑 + 依赖警告 → 复制 diff
- Prompt 调试 side-by-side + token 计数 → 复制 prompt
- 数据集审核（approve/reject）→ 复制选择
- 颜色 / easing / cron / regex 调参 → 复制配置

**Throwaway 心法**：不是要做产品，是要"**用 HTML 写下我此刻需要的 UI**"。**与其在文字里挣扎描述，不如让 Claude 现给我做一个 UI**。

---

### 反对意见与回应（FAQ）

| 反对 | Thariq 回应 |
|------|------------|
| Token 效率低 | "1M Opus 上下文里不明显，且更高的真实阅读率带来更好输出" |
| 比 Markdown 慢 2-4× | "结果值得" |
| 版本控制差 | **承认是最大缺点** |
| 怎么看？ | 浏览器本地打开（让 Claude 帮开），或上传 S3 |
| 怎么不丑？ | frontend design plugin + 用一个**设计系统 HTML 引用** |
| 反对做成 `/html` skill | "直接 prompt 'make an HTML file' 即可，先用熟再考虑封装" |

---

### 最深的洞察：Stay in the Loop

**Thariq 的真正动机**：

> I had begun to fear that because I had stopped reading plans in depth I would simply have to leave Claude to make its choices.
>
> But I am happy to say instead that **I feel more in the loop than ever before when using HTML**.

#### 核心张力

```
Agent 越来越强
   ↓
人读不过来 100+ 行 markdown
   ↓
两种应对：
[ 路径 A ]：放手让 Agent 自己决定（退出循环）
[ 路径 B ]：升级输出格式，让人能高效消费（留在循环）
   ↓
HTML 是路径 B 的实现工具
```

#### 与 Karpathy "理解不可外包"的呼应

**Karpathy 的范式跃迁：Vibe Coding 是起点，Agentic Engineering 是终点** 中 Karpathy 说"理解无法外包，但思考过程可以外包"。**Thariq 的 HTML 范式正是这条原则的具体落地**：
- 思考过程外包给 Claude
- 理解必须由人完成
- HTML 是"让人能高效完成理解"的渠道
- Markdown 在长任务下做不到

---

### 战略启示

#### 1. 输出格式是 Agent 工程的隐形维度

很多人讨论 Agent 工程时聚焦于：模型、Harness、工具、prompt。**Thariq 揭示了被忽视的一维：输出格式如何决定人机协作的密度**。

#### 2. Markdown 是"前 Agent 时代"的产物

| 时代 | 主流文档格式 | 设计前提 |
|------|-----------|---------|
| 前 Agent | Markdown | **人写人读** |
| 后 Agent | HTML | **Agent 写人读 + 团队协作消费** |

Markdown 之所以好，是因为"人写"这件事是瓶颈。但当 Claude 写、Claude 改、人只消费时，那个瓶颈变了。

#### 3. Throwaway Editor 是范式级模式

把"现造一个 HTML 编辑器"作为日常工作流，颠覆了"工具必须是产品"的旧观念：
- **工具可以是一次性的**
- **工具可以为单个 piece 服务**
- **工具的价值在于使用而非复用**

这与 **Ralph Loop 的四种变体详解** 中"循环即工具"的思想呼应。

#### 4. 设计系统 HTML 引用的元设计

> Create a single design system HTML file by pointing Claude at your codebase. You can then use that design system file as a reference for other html files.

这是**自举（bootstrap）**思想——用一个 HTML 文件定义"我们的视觉语言"，让后续所有 HTML 引用它。本质是把组织/个人审美**实例化为可引用的资产**。

#### 5. 不要过早封装

> I'm a little bit afraid that people will read this article and turn it into a `/html` skill or something.

**重要的反 skill 警告**——能力还在探索期时，封装为 skill 反而会限制使用方式的演化。**先用原生 prompt 充分探索 → 等模式稳定 → 才考虑 skill 化**。

#### 6. 与近期知识库的串联

| 已有条目 | 关联 |
|---------|------|
| **Claude Code 的核心架构原则：Prompt Caching 决定一切** | Thariq 早期作品（2026-02），讲底层架构；本条（2026-05）讲应用层产出 |
| **Karpathy 的范式跃迁：Vibe Coding 是起点，Agentic Engineering 是终点** | "理解不可外包"在本条得到落地工具 |
| **Claude Code Session管理：1M上下文的双刃剑** | 1M context 让 HTML 的 token 成本可接受 |
| **Anthropic：AI Agent 有效上下文工程** | HTML 是 progressive disclosure 的具体载体 |
| **HyperFrames：以HTML为基础的AI Agent视频编辑框架** | HTML 作为 Agent 输出的另一极端——视频 |

#### 7. 个人/团队的具体行动建议

- **立即试**：下次让 Claude 生成 plan / report / spec 时，加上 "make this as an HTML file"
- **PR 工作流**：试着每个 PR 配一个 HTML code explainer
- **设计系统文件**：花一次时间生成自己/团队的设计系统 HTML
- **Throwaway editor 思维**：遇到"难以用文字描述需求"时，让 Claude 现造一个 UI
- **不要过早做 skill**：先 30 天裸 prompt，找出自己稳定的模式，再考虑封装

## Related Topics

- **Claude Code 的核心架构原则：Prompt Caching 决定一切** — Thariq 早期作品（架构层）
- **Claude Code Session管理：1M上下文的双刃剑** — Thariq Session 管理（1M context 让 HTML 成本可接受）
- **Claude Code架构拆解：Agent Harness的四层蓝图** — Claude Code 4 层架构
- **Karpathy 的范式跃迁：Vibe Coding 是起点，Agentic Engineering 是终点** — Karpathy 范式跃迁视角
- **Anthropic：AI Agent 有效上下文工程** — 上下文工程理论
- **HyperFrames：以HTML为基础的AI Agent视频编辑框架** — HTML 视频（HTML 作为输出的极端形式）
- **Ralph Loop 的四种变体详解** — Ralph 循环（一次性工具的另一思路）
- **Anthropic：为 Agent 编写高效工具（用 Agent 优化工具）** — Agent 工具设计
- **Claude Subagents vs Agent Teams：按上下文分而非按角色分的多 Agent 架构** — Subagents vs Agent Teams
- **next-ai-draw-io - AI驱动的自然语言图表生成Web应用** — AI Draw.io（结构化绘图的另一面）
- **ai-drawio - 自然语言生成draw.io图表** — AI Drawio 图生成
- **Excalidraw Diagram Skill视觉论证图表生成** — Excalidraw 可视化论证
- **Blueprinter：扁平工程蓝图风格技术图表 Claude Code Skill** — Blueprinter 技术图
- **Generative TUI：终端中生成实时数据仪表盘** — 终端版本的类似思想（用结构化输出做 UI）
- **投资人的 Claude 实战手册：18 个高杠杆提示词（2026 升级版）** — 实战 18 提示词
