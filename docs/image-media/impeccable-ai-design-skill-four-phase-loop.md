---
title: "Impeccable：AI 编码工具里的四阶段设计 Skill"
description: "Paul Bakaus 做的设计 skill，23 个命令跑在 Cursor / Claude Code / Codex / Gemini CLI / Copilot 内部。核心洞察：设计的难点不是白纸那一刻，而是之后的一切——refine、polish、还设计债。整套工作流围绕'从图开始，不从段落"
---

> 📄 原文：[https://impeccable.style/designing/](https://impeccable.style/designing/)

> Paul Bakaus 做的设计 skill，**23 个命令跑在 Cursor / Claude Code / Codex / Gemini CLI / Copilot 内部**。核心洞察：设计的难点不是白纸那一刻，而是**之后的一切——refine、polish、还设计债**。整套工作流围绕"**从图开始，不从段落开始**"和"**做有主见的设计伙伴，不做 linter**"。

## 四阶段循环（The core loop）

| 阶段 | 做什么 | 一句话 |
|------|--------|--------|
| **Start** | 白文件 → brief → 成型 feature | 从图开始，不从段落 |
| **Iterate** | 就地精修，命令行或浏览器 | 命名维度 vs 视觉点选 |
| **Polish** | 上线前关卡：audit / clarify / harden | 不重设计，只找还没修的 |
| **Maintain** | 在设计债凝固前还掉 | extract / document |

## Start — Net-new 是 hard mode

白文件正是 coding agent（包括 Impeccable 自己）**最弱**的地方。所以**从一张图反应，而不是从抽象 brief 生成**——可来自 Figma、手机拍的草图、Google Stitch，或 `/impeccable craft` 用 **GPT Image 2** 生成 mock。

```
/impeccable init    # 写 PRODUCT.md（+ 有代码则 DESIGN.md）
/impeccable shape   # 品牌工具包：identity/palette/type/icon，一张图可审
/impeccable craft   # 朝 hi-fi mock 写代码，而非朝段落
```

**关键 step change**：图像生成跨过"参考级质量"门槛后，`craft` 能**朝一张具体图编码**，而不是朝抽象 brief 编码。GPT Image 2 / **Gemini Nano Banana Pro**（**Google Nano Banana 2 上手指南**）/ Imagen 4 Ultra / Grok Imagen 都能这么用。

**PRODUCT.md**（init 的 Teach 访谈产物）记录：Register（产品 vs 品牌）、Users、Voice、**Anti-references**（明确写下要避开什么，如"紫色渐变、玻璃拟态、hype"）。**每个后续命令生成前都先读 PRODUCT.md + DESIGN.md。**

## Iterate — 两条精修路径

| 编辑能命名 | 编辑更适合"指" |
|-----------|---------------|
| `/typeset · /layout · /colorize · /animate` | `/impeccable live` |
| 知道词就打命令，skill 编码具体学科 | dev server 上点选元素，画/打需求 → 出 3 个产品级变体，选一个写回源码 |

选择速查：说不清哪里"不对" → `live`；想"评判好不好" → `critique`；把保守设计做活 / 把吵闹的调安静 → `/bolder · /quieter`。

## Polish — 上线前三道关（窄目标，像镜头收紧才更锐）

- **audit** — 五维 0–4 打分（accessibility / performance / theming / responsive / anti-patterns），发现项 P0–P3
- **clarify** — 重写文案，按 PRODUCT.md 受众调（标签、错误消息、空态、microcopy）
- **harden** — 拿现实压测：60 字符名字、德语标题、十亿级价格、500、离线

## Maintain — 还设计债

- **`/impeccable extract`** — 找用了 ≥3 次同意图的模式（Subscribe/Submit/Join/Send/Go/OK → 一个 Button），提议 token 和 primitive
- **`/impeccable document`** — 扫 token/组件/路由，按 **Stitch 格式** 写 DESIGN.md（呼应 **Google Stitch 2.0 + Claude Code MCP：独立开发者 UI 设计工作流**）。**越指向真实组件和实时路由，它越读你的设计语言而非瞎猜**

## Skill 之外的两个出口（同一个反模式检测器）

| 入口 | 用途 |
|------|------|
| **CLI** `npx impeccable detect src/` | CI 门禁，确定性规则 + JSON + 退出码，slop 混进 PR 就 fail build |
| **Chrome 扩展** | 任意 live 页面叠加检测——staging、竞品、永远进不了编辑器的页面 |

> 这把"设计质量"做成了**可编程门禁**——与 **7 Principles for Agent-Friendly CLIs** / **CLI is All Agents Need - Unix Agent 设计指南** 的 agent-friendly CLI 思路一致：确定性 + JSON + exit code。

## Brand vs Product 两套词汇

Impeccable 按任务线索 + PRODUCT.md **每条命令前自动选道**：
- **Brand** — 设计即交付物（落地页、campaign、editorial）：独特字体、果断配色、图主导 hero，"印象就是产品"
- **Product** — 设计服务任务（app UI、admin、dashboard）：密度流畅、语义状态、可复用组件，"用户是来把事做完的"

## 自己别犯的反模式（用反模式工具时）

1. **同时跑 Impeccable 和 Anthropic frontend-design skill** — Anthropic 那个已疏于维护、落后于推荐模式，两者词汇打架互相抵消，**二选一**
2. **每个命令都 pin** — 又把 v3.0 合并清理掉的 `/` 菜单炸开了，**只 pin 每天用的两三个**
3. **跳过 init** — 没 PRODUCT.md/DESIGN.md 就默认通用 SaaS 模式，有上下文地板高得多
4. **当 linter 用** — 它是**有主见的设计伙伴不是校验器**；带理由反驳它会配合你，无理由忽视它的意见输出会变差

> 第 4 点是核心理念：**AI 设计工具应有 point of view，而非中立打分器**——与 **UI Skills - Agent 构建界面的 UI 打磨技能集** 的"让 agent 主动 polish 界面"相承。

## 为什么重要

Impeccable 是"**设计能力作为 skill 注入 coding agent**"的成熟样本（**Anthropic Agent Skills - 为真实世界任务装备AI Agent的技能框架** / **Anthropic官方完整指南：构建Claude Skills**）：它把 init→iterate→polish→maintain 的完整设计生命周期编码成 23 个命令，且**关键判断（从图开始、有主见、窄目标 polish、把质量做成 CI 门禁）都可迁移到任何 agent skill 设计**。同时它公开承认 net-new 是 agent 最弱处、用图像生成跨门槛来补——这点对所有做 AI 创作工作流的人都有参考价值。

## 关联

- **Google Stitch 2.0 + Claude Code MCP：独立开发者 UI 设计工作流** — DESIGN.md 用 Stitch 格式；Stitch 也是输入源
- **Google Nano Banana 2 上手指南** — Nano Banana Pro 是其支持的图像生成后端之一
- **UI Skills - Agent 构建界面的 UI 打磨技能集** / **App Store Screenshots Generator Skill** / **Claude + Seedance：AI 生成 UI 动效演示** — UI 设计/打磨 skill 生态
- **Anthropic Agent Skills - 为真实世界任务装备AI Agent的技能框架** / **Anthropic官方完整指南：构建Claude Skills** — skill 框架；文中点名要和 Anthropic frontend-design skill 二选一
- **7 Principles for Agent-Friendly CLIs** / **CLI is All Agents Need - Unix Agent 设计指南** — `npx impeccable detect` 作为 CI 门禁的设计哲学
- **编程Agent如何重塑工程、产品和设计** — coding agent 重塑设计工作流的大背景
