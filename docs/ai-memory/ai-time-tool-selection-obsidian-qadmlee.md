---
title: "AI 时代的工具选型思考 — 从 Obsidian 插件说起"
description: "从一个具体发现出发——大量 Obsidian 热门插件正被 AI 编码助手直接替代——推导出一个普适判断框架。这篇是作者后续 bash-is-all-you-need-cli-collapse-rebuild-qadmlee 的思想原点：同一洞察的 PKM/Obsidian 切面。"
---

> 📄 原文：[https://www.qadmlee.com/posts/tool-selection-in-ai-era/](https://www.qadmlee.com/posts/tool-selection-in-ai-era/)

> 从一个具体发现出发——**大量 Obsidian 热门插件正被 AI 编码助手直接替代**——推导出一个普适判断框架。这篇是作者后续 **Bash is All You Need — 万物皆 CLI 的底层逻辑（中文深度综述）** 的思想原点：同一洞察的 PKM/Obsidian 切面。

## 核心结论：Vault 就是一堆 Markdown 文件

> **任何能读写文件系统的 AI 工具，都天然就是 Obsidian 的「插件」。**

```
传统：Obsidian → 插件 → AI API → 结果显示在 Obsidian
新法：AI 助手 → 直接读写 .md 文件 → Obsidian 自动刷新
```

这与本知识库自身的运作完全同构——我们正是用 AI agent 直接读写 `raw/`、`wiki/`、`log.md` 的 Markdown，Obsidian/编辑器只负责渲染。**本知识库就是这套主张的活样本。**

## 判断标准（可迁移的核心框架）

> 一个插件有价值，**当且仅当它提供的是 Obsidian「运行时行为」**——实时渲染、UI 交互、实时索引、视觉渲染。凡是「读文件 → AI 处理 → 写回文件」的，都可跳过。

| 被 AI agent 替代 | 代表 | 不可替代（保留）| 原因 |
|------|------|------|------|
| AI 聊天/写作 | Copilot / Text Generator | **Dataview** | 实时动态查询渲染 |
| 自动分类 | Auto Classifier（改 frontmatter）| **Templater** | 创建时触发模板展开 |
| 快捷操作/语义搜索 | QuickAdd / Smart Connections | **Calendar** | 日历 UI 跳转 |
| Git 辅助 | obsidian-git | | |

## 「第二大脑」在大模型时代被重新审视

**双向链接还重要吗？** 传统 PKM 里 `**双链**` 的价值是"发现关联"——但 LLM 读完 Vault 后比任何链接网络都更擅长找语义关联：

| | 双向链接 | LLM 直读 Vault |
|---|---------|---------------|
| 发现关联 | 只能找已链接的 | 能发现没意识到的 |
| 维护 | 写时要记得加 | 零维护 |
| 跨笔记归纳 | 做不到 | 天然能力 |

> **双向链接降级为可选的阅读便利功能；AI agent 才是最强的「链接引擎」。**
>
> （注：本知识库仍坚持手写 `**backlinks**`——但定位正是"阅读便利 + 人类导航"，与此判断不冲突。）

**第二大脑新架构**：存储层（Obsidian+MD）/ 同步层（Git）/ 智能层（AI agent）/ 展示层（Obsidian 渲染+Dataview）。

## 工具层在退化：编辑器 → 渲染终端

> 编辑器（VSCode、Obsidian）正从「功能平台」退化为「渲染终端」。插件是"人的能力延伸"，AI agent 直接具备这些能力后，中间层多余。**只有实时运行时环境（渲染引擎、UI 交互、调试器）不被淘汰。**

此判断在作者后作里被 Amp"自毁编辑器扩展"实证（见 **Bash is All You Need — 万物皆 CLI 的底层逻辑（中文深度综述）**）。

## AI 时代人需要的核心能力

| 能力 | 含义 | 培养 |
|------|------|------|
| 判断力 | 知道「要什么」> 「怎么做」 | AI 给多方案→先自己选→验证 |
| 提问能力 | 精准定义问题 = 解决 80% | 积累高效 prompt 模式 |
| 架构思维 | 理解各层、做减法 | 对系统问「去掉这层会怎样？」|
| 验证标准 | 能识别「好」的输出 | 大量接触优秀案例建内在标尺 |
| 好奇心 | AI 只响应人的好奇，不主动 | 跨界探索（入门成本趋近零）|

**学习模式转变**：传统"输入→记忆→执行"（反馈慢）→ AI 时代"好奇→提问→判断→沉淀"（反馈快、正循环）。

## 用好 AI Agent 的方法

**分层授权**：全自动（给目标，格式化/搜集）/ 半自动（AI 出方案人审批，架构设计）/ 人工驾驶（人定步骤，敏感操作）。

**控制力提升**：① 规范文件（GEMINI.md）约束行为 ② 质量反馈回路（输出→检验→更新规范）③ 拆细任务 ④ 知道 AI 边界。

> 选型：包月不差钱就"只用最强模型"，遇瓶颈再补——超长上下文→Gemini，限流→备选，本地隐私→Ollama。

## 核心洞察

> **对 AI 的控制力，本质上是对问题的理解深度。** AI 放大的是已有的认知，而不是替代认知本身。

这条与 **Bash is All You Need — 万物皆 CLI 的底层逻辑（中文深度综述）** "瓶颈彻底转移到人这边"是同一句话的两种说法，也呼应 **Agent记忆三层架构：chunk/task/skill-recipes 压缩与召回策略** / **Context Engineering 实用指南 - 优化 AI 编码的上下文策略** 中"人定义问题、组织上下文"的主线。

## 关联

- **Bash is All You Need — 万物皆 CLI 的底层逻辑（中文深度综述）** — 作者后作，把本文洞察推广到全行业（CLI/SaaS/重构）
- **Forget MCP, Bash Is All You Need：MCP 正在重新发明 POSIX** — "文件系统 + shell 即插件"的英文同源命题
- **obsidian-skills - Obsidian AI Agent 技能集** — Obsidian × AI agent skill 实践
- **Paperless-ngx - 自托管文档数字化管理系统** — 开放格式文件 + AI 处理的另一案例
- **Context Engineering 实用指南 - 优化 AI 编码的上下文策略** — "人组织上下文/定义问题"主线
