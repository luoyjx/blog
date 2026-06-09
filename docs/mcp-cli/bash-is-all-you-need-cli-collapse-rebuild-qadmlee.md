---
title: "Bash is All You Need — 万物皆 CLI 的底层逻辑（中文深度综述）"
description: "中文圈对'Bash/CLI 即 agent runtime'浪潮最完整的综述。把 forget-mcp-bash-is-all-you-need-deadneurons 的英文命题，补上了完整时间线、实证数据、资本市场维度（SaaS-pocalypse）和'坍缩-重建'哲学框架。一句话：中间软件层正"
---

> 📄 原文：[https://www.qadmlee.com/posts/bash-is-all-you-need/](https://www.qadmlee.com/posts/bash-is-all-you-need/)

> 中文圈对"Bash/CLI 即 agent runtime"浪潮最完整的综述。把 **Forget MCP, Bash Is All You Need：MCP 正在重新发明 POSIX** 的英文命题，**补上了完整时间线、实证数据、资本市场维度（SaaS-pocalypse）和"坍缩-重建"哲学框架**。一句话：中间软件层正在坍缩，整个 stack 正在为 Agent 重构，而 50 年前的 Unix Shell 恰好站在重构起点。

## 引爆点数据（Vercel d0 内部 Agent）

砍掉 80% 工具，只留一个 Bash Shell：

| 指标 | 复杂架构 | Bash 架构 | 变化 |
|------|---------|----------|------|
| 执行时间 | 274.8s | 77.4s | **快 3.5×** |
| 成功率 | 80% | 100% | **+20%** |
| Token | ~102k | ~61k | **省 37%** |
| 步数 | ~12 | ~7 | 减 42% |

> "Grep is 50 years old and still does exactly what we need. We were building custom tools for what Unix already solves." — Andrew Qu（Vercel）

## 一、大厂集体转向 CLI 的时间线（2025 Q4–2026 Q1）

| 时间 | 玩家 | 动作 |
|------|------|------|
| 2025 Q4 | Anthropic | Claude Code = while loop + Bash tool；开源 Ralph Wiggum（Bash do/while 循环）|
| 26.01.12 | Vercel | 砍 80% 工具，开源 bash-tool，发"Bash is All You Need" |
| 26.01.29 | 华尔街 | IGV 软件指数暴跌（Covid 以来最大）；MSFT 蒸发 $3600 亿 |
| 26.02.19 | Amp | "The Coding Agent Is Dead"，**自毁 VS Code/Cursor 扩展**，All in CLI |
| 26.03.06 | Google | 开源 Workspace CLI（gws），40+ skills 覆盖全 API |
| 26.03.13 | Courier | "MCP vs CLI: why the terminal wins today" |

**工程圈和资本市场在同一季度给出同一信号。**

## 二、为什么 CLI 天然适配 Agent（最核心：训练数据）

| 维度 | CLI | MCP |
|------|-----|-----|
| 训练数据覆盖 | 50 年 man pages/SO/脚本，**烤进权重** | 2024 末才有，**几乎为零** |
| 推理成本 | 给个 `--help` | 塞完整 schema 进 context |
| 工具发现 | `ls`/`which`/`--help` | 需预先注册 |

> "The terminal is a 50-year-old technology that **accidentally became the best interface for AI agents**." — Courier
>
> 调 MCP = **为模型已经知道的事情重新付费**。

**Unix 哲学 = Agent 最佳架构**：一事一工具→模块化；文本通用接口→LLM 天生吃文本；管道组合→observe-decide-act-repeat 循环。

**模型已不需要"框架"**（Amp 最激进判断）："These new models barely need to be told how to act like coding agents anymore. They're now fully trained for that." → **瓶颈从工具侧转到了人侧**（怎么组织代码库、描述任务、验证结果）。

## 三、CLI vs MCP 不是替代而是分工

> **CLI 管执行，MCP 管分发。**

- Simon Willison：MCP 真正价值在**分发**——更新 server，所有 agent 自动拿新能力，不用升 SDK
- 有终端 → CLI；无终端（浏览器 agent/聊天机器人/企业沙箱）、能力分发发现 → MCP
- Anthropic 推 MCP 工具向"轻量代码函数"演化 = **MCP 在向 CLI 靠拢**

这点与 **Forget MCP, Bash Is All You Need：MCP 正在重新发明 POSIX** "MCP 唯一做得好的是 chat UI 的 OAuth"判断一致——两文独立收敛到"MCP 退为接口/分发层"。

## 四、SaaS-pocalypse：同一场坍缩的资本市场版

> "Every SaaS is a wrapper around a database." + 2026.01 软件股暴跌 = 这句话变严肃了。

Jason Lemkin（SaaStr）："**AI 不是在杀死 SaaS，而是在饿死 SaaS。**" AI 预算同比 +100%，总 IT 预算只 +8%——差额从 SaaS 座位费抽走。三股挤压力量：**预算挤压 + 座位数压缩**（10 个 AI agent 干 100 销售的活）**+ 体验代差**。

> 生存标准（Lemkin）："**If you own the data layer, you win.**" 是 system of record → 必需品；只是 UI → 可替代。

## 五、坍缩与重建（本文最有价值的哲学框架）

**坍缩**：过去 20 年软件架构越堆越高（框架→插件→扩展→协议→编排层），每层都是"人的带宽有限"的补偿。AI 没这个限制——**给它文本文件 + shell，它自己就是最强编排层**。

```
坍缩前：人 → GUI/SaaS → 插件 → API 封装 → 数据库/文件系统
坍缩后：人 → AI Agent → Shell/CLI → 数据库/文件系统
```

只剩两端：**人**（定义问题、判断、取舍）+ **底层系统**（文件/DB/网络/渲染引擎）。

**重建（The Great Rebuild）**：a16z "Big Ideas 2026" 关键词 = **Refactoring**。"给旧系统加 AI 皮肤不够，整个 stack 必须为 Agent 重新设计。"（Angela Strange）"The Agent-Native Internet"：从**以文档为中心**（页面）走向**以能力为中心**（动作）的互联网。

| 范式转移 | 围绕什么重新组织计算 |
|---------|---------------------|
| PC | 个人 |
| 智能手机 | 移动性 |
| 云 | 弹性 |
| **AI Agent** | **自主性** |

## 与本知识库的关系（OS-as-Runtime 命题地图再扩张）

这是该命题簇里**视野最宽**的一篇——把工程趋势 + 资本市场 + 文明级范式转移缝合到一起：

- **英文原命题** → **Forget MCP, Bash Is All You Need：MCP 正在重新发明 POSIX**（MCP 被引力拉向 POSIX）
- **CLI 设计原则** → **7 Principles for Agent-Friendly CLIs** / **CLI is All Agents Need - Unix Agent 设计指南** / **给 AI 造专用 CLI：Codex 团队的 Agent-Friendly CLI 实践方法论**
- **本地工具实证** → **LiteParse：为 AI Agent 设计的本地文档解析器**（CLI + `| grep` 的文档解析）
- **作者前作** → **AI 时代的工具选型思考 — 从 Obsidian 插件说起**（同一洞察的 Obsidian 切面，本文第四节亲自承认是"同一东西的不同切面"）
- **Ralph 循环** → 与 **Ralph 自主编码循环完整实操指南** 同源（Bash do/while agent loop）

## 关联

- **AI 时代的工具选型思考 — 从 Obsidian 插件说起** — 作者前作，本文的起点与互证
- **Forget MCP, Bash Is All You Need：MCP 正在重新发明 POSIX** — 英文同名命题，互为印证
- **7 Principles for Agent-Friendly CLIs** / **CLI is All Agents Need - Unix Agent 设计指南** / **给 AI 造专用 CLI：Codex 团队的 Agent-Friendly CLI 实践方法论** — CLI 设计原则
- **LiteParse：为 AI Agent 设计的本地文档解析器** — CLI 工具实证
- **Ralph 自主编码循环完整实操指南** — Ralph Wiggum Bash 循环
- **编程Agent如何重塑工程、产品和设计** — coding agent 重塑工作流的大背景
