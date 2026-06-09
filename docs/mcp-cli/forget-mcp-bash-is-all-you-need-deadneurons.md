---
title: "Forget MCP, Bash Is All You Need：MCP 正在重新发明 POSIX"
description: "Same logical operation, 两个数量级的成本差。"
---

## Summary

Dead Neurons 2026-02 高传播 Substack 长文，核心命题：**MCP 不是失败，而是被引力拉向 POSIX**——每次给 MCP 打补丁，都在重新发明 Linux 已有 40 年的概念（Tool Search Tool = process invocation, Programmatic Tool Calling = IPC/pipelines, Tool schemas = man pages, MCP servers = daemons）。**Bash 不是关键，OS 才是**。当你 `curl ... | jq ...` 时，用的不是 shell trick，是 kernel 的进程模型、IPC、文件描述符——**数据流不进入 context window，因为 OS 在管**。五步 bash 管道分钱级 vs 五步 MCP 工作流美元级。**三个赢家的趋同证据**：Claude Code（bash 是引擎、MCP 是配件）→ Cowork（同样底座做非编码）→ OpenClaw/Pi（**仅 4 工具：Read/Write/Edit/Bash 拿到 145K GitHub stars/周**）。Pi 的四个工具不是 agent tools 是 **system calls**。**MCP 唯一做得好的是 chat UI 里的 OAuth**，但 CLI 工具早就有 `gh auth login` 之类。**真正命题**：能用 shell 的 LLM 就有真正的 computer use 能力——不是逐工具调用，而是"机器自己操作自己"。**Linux 已经是史上最强应用 runtime**，MCP 在它之上重建一个。

## Key Concepts

- **MCP 趋向 POSIX** — MCP 每次打补丁都在重新发明 OS 的旧概念
- **OS Convergent 趋势** — Deferred loading → process invocation；Programmatic Tool Calling → IPC；Tool schemas → man pages；MCP servers → daemons
- **Bash 是接口 OS 是引擎** — `curl | jq` 的力量不在 shell 在 kernel（process model + IPC + file descriptors）
- **Composition Is Free** — OS 提供的管道组合：no inference / no tokens / no protocol overhead
- **五步管道经济学** — bash 分钱级 vs MCP 美元级（每步推理燃烧 token）
- **POSIX 七原语对应 Agent 需求** — stdin/stdout（通信）/ pipes（组合）/ permissions（访问控制）/ cron（调度）/ signals（生命周期）/ env vars（配置）/ package managers（发现安装）
- **Pi as System Calls** — Pi 4 工具（Read/Write/Edit/Bash）不是 agent tools 是 system calls；145K stars/周证明够用
- **10 行 system prompt vs 几千行 MCP schemas** — Pi 系统提示 ~10 行 vs MCP 描述几十个工具需要的几千 token
- **三赢家趋同证据** — Claude Code（OS + MCP 配件）→ Cowork（同底座）→ OpenClaw（彻底无 MCP）
- **Cowork 4 人 10 天** — 用 Claude Code 自己造 Cowork，证明 bash + OS 是好底座
- **MCP 唯一价值=Chat 认证** — OAuth in chat UI 是 MCP 的真实贡献，但 CLI 早有 gh/gcloud/aws auth
- **CLI 生态早已成熟** — jq/curl/git/docker/kubectl/aws/gh/ffmpeg/imagemagick/pandoc——数十万 CLI 工具立即可用
- **Save Once Run Forever** — bash pipeline 跑通后存脚本，**永远不再付 inference**——OS 是 runtime 不是 model
- **Computer Use 的真实形态** — 不是逐工具调用，是机器自己操作自己

## Tags

mcp, bash, posix, agent-runtime, linux, anti-mcp, claude-code, openclaw, pi-agent, cowork, computer-use, agent-architecture

## Detailed Content

### 核心论证骨架（递归三层）

```
[ 层 1：观察 ]
MCP 在反复打补丁
↓
[ 层 2：模式 ]
每个补丁都在重新发明 OS 已有概念
↓
[ 层 3：判断 ]
MCP 被引力拉向 POSIX——OS 已经是 agent runtime
```

### MCP 补丁 → OS 旧概念对应表

| MCP "新发明" | Linux/POSIX 已有 | 出现年代 |
|------------|----------------|---------|
| Deferred loading（Tool Search Tool）| Process invocation（fork/exec）| 1970s |
| Programmatic Tool Calling | IPC / pipelines / shell scripts | 1977 |
| Tool schemas | Man pages | 1971 |
| MCP servers | Daemons | 1970s |

### 五步工作流经济学对比

```
[ Bash pipeline ]
tool_a | tool_b | tool_c | tool_d | tool_e

→ 5 个进程，stdin/stdout 串联
→ 0 次推理
→ 0 token 消耗
→ 完全跑在 OS 上
→ 成本：分钱级（电费）

[ MCP 工作流 ]
model → tool_a → model → tool_b → model → tool_c → ...

→ 每个 tool 调用前后各一次 model 推理
→ 5 步 = 5+ 次推理
→ 每次推理：input + output token
→ 成本：可达美元级
→ 时延：数秒到数十秒
```

> Same logical operation, **两个数量级的成本差**。

### POSIX 提供的 7 个 Agent 原语

| Agent 需求 | POSIX 解 | 例 |
|-----------|---------|---|
| 通信协议 | stdin / stdout / stderr | 所有工具通过文件描述符通信 |
| 组合 | Pipes (`\|`) | `find . \| xargs grep ...` |
| 隔离 | Process boundaries | 一个工具崩了不影响其他 |
| 访问控制 | Permissions（chmod, sudo）| `chmod 600 secrets.txt` |
| 调度 | Cron | 定时任务无需 Agent |
| 生命周期 | Signals（SIGTERM, SIGKILL）| 优雅终止 |
| 配置 | Environment variables | `GITHUB_TOKEN=xxx gh repo list` |
| 发现/安装 | Package managers | `brew install jq` |

**关键观察**：这七项不是"shell 后加的"，是 **kernel + OS 原生**。MCP 在 user-space 重新实现这一切。

### 三个赢家的趋同证据（最强经验论据）

| 产品 | MCP 角色 | OS/Bash 角色 |
|------|---------|------------|
| **Claude Code** | 集成插件（accessory）| 引擎（engine）|
| **Cowork** | 几乎没用 | 全部 — 4 人 10 天用 Claude Code 自己造 |
| **OpenClaw / Pi** | **零** | **唯一架构**——Read/Write/Edit/Bash 共 4 工具，145K stars/周 |

**关键引用**（Armin Ronacher 评 Pi）：
> "If the agent needs to do something new, it doesn't download an extension or install a plugin, **it writes the code itself**."

**关键认知**：Pi 的 4 工具不是 "agent tools" 是 **system calls**。Pi 是 LLM 接入 OS primitives 的薄包装。

### 系统提示长度对比

| Agent | System prompt 长度 | 工具描述方式 |
|-------|------------------|------------|
| MCP-based agent | 几千 token（描述几十个工具 schema） | 显式 schema 注入 |
| Pi (bash-only) | **~10 lines** | 模型自己读 man / `--help` |

10 行 vs 几千 token——**两个数量级**。

### MCP 仍然合理的边界

不是要彻底废了 MCP，作者承认 **MCP 在一个具体场景有真正价值**：

```
Chat UI 中的 OAuth 集成
  - 用户点 "Connect to Google Drive"
  - 浏览器跳转、token 交换、凭证传递
  - 完全无需打开终端
  → MCP 在这个 UX 上是优秀的
```

但作者立刻反驳：
- CLI 工具早就有 `gh auth login` / `gcloud auth login` / `aws configure`
- Token 落到 env var 或 config 文件
- `GITHUB_TOKEN=xxx gh repo list` 在 pipe / script / Docker / CI 都能用

> MCP 的认证故事**专门为 chat UI 优化**——比表面看起来窄得多的用例。

### 与已有知识库的呼应（完整 OS-as-Runtime 命题地图）

| 已有条目 | 关系 |
|---------|------|
| **Tool / Skill / Subagent 决策框架：Anthropic Applied AI 团队的 Agent 分解方法论** | Will 演讲也明确说 "code execution 正吃 MCP 的份额"——同一命题的 Anthropic 内部声音 |
| **Claude Code 的核心架构原则：Prompt Caching 决定一切** | Claude Code 整套 harness 围绕 caching 设计，bash 工具是核心 |
| **Claude Code架构拆解：Agent Harness的四层蓝图** | Claude Code 4 层架构 |
| **Anthropic工程博客：用代码执行+MCP构建更高效的Agent** | Anthropic 自己也意识到 PTC 是补救（实际上是承认 MCP 不够）|
| **Anthropic 为什么要收购 Bun：重新定义 Agent 工具层** | Anthropic 收购 Bun 意图：把 JavaScript runtime 也变成 agent tool layer |
| **7 Principles for Agent-Friendly CLIs** | Agent-friendly CLI 设计——证明这条路被多次独立发现 |
| **CLI is All Agents Need - Unix Agent 设计指南** | 同主题前驱文章（"CLI is all agents need"）|
| **给 AI 造专用 CLI：Codex 团队的 Agent-Friendly CLI 实践方法论** | OpenAI Codex 同方向 |
| **Anthropic：多智能体研究系统工程实践** | Anthropic Research 系统的工程经验 |
| **本条** | **将"OS 是 agent runtime"上升为完整理论命题** |

### 战略观察

#### 1. 这条把分散的"反 MCP"声音收敛成完整理论

之前的几条都是**实操经验**（Will 演讲、Pi 项目、CLI 设计原则）。这条把它们**抽象成 OS-convergence 理论**：MCP 不是错，是**重力把它拉向已经存在的解**。

#### 2. 时间维度的暗示

```
2024 H2：MCP 大热，所有人都加 MCP
2025 全年：MCP 反复打补丁（Tool Search、PTC、defer_loading）
2026 H1：三个赢家产品（Claude Code / Cowork / OpenClaw）证明 OS 是答案
2026+：MCP 退守 chat UI 认证，agent 主流回归 bash + OS
```

#### 3. 对开发者的具体含义

**别先做 MCP**——这是 Anthropic Will（**Tool / Skill / Subagent 决策框架：Anthropic Applied AI 团队的 Agent 分解方法论**）已经在演讲中说的：tools 优先级是 **Claude Code primitives → custom local tools → MCP**，MCP 排最后。

**默认架构**：
```
[ Agent 设计模板 ]
1. Read / Write / Edit / Bash 四件套（OpenClaw Pi 风格）
2. 加 web search / code execution（Claude Code primitive）
3. 极小 system prompt（10 行级别）
4. Skills 装业务规则（progressive disclosure）
5. 只在多 client 共享时才考虑 MCP
```

#### 4. 反对意见与潜在边界

文章没充分讨论的：
- **企业治理**：MCP 提供集中的 tool registry / governance / audit trail，bash 散布缺乏
- **跨语言/跨 OS**：POSIX 在 Linux/Mac 强，Windows 弱；MCP 跨平台
- **安全沙箱**：让 LLM 直接 bash 的攻击面比 MCP 大得多
- **审计**：MCP 调用有结构化 log，bash 调用更难审计

但文章的核心论点不变：**OS 已经是答案，MCP 是 wrapper**——这些反对最多说明"MCP 不会消失"，不是"MCP 是首选架构"。

#### 5. 与"理解不可外包"的关联

**Karpathy 的范式跃迁：Vibe Coding 是起点，Agentic Engineering 是终点** 中 Karpathy 说"理解不可外包，思考可外包"。这里的延伸：
- **执行**外包给 OS（最高效率）
- **判断"哪些命令、怎么链"** 留给 LLM（核心价值）
- **MCP 把执行也外包给了第三方协议层**——多了一层不必要的中间人

#### 6. 对本知识库的反思

我们 `~/knowledge_base/SKILL.md` 工作流就是这种思想的实例化：
- 用 curl / fxtwitter API / yt-dlp / Jina——**OS 工具直链**
- 没装 MCP 服务器去做"知识抓取"
- 因为 **bash + Python + CLI 本身就是 runtime**

证明：本知识库自身的成功运转 = 这篇文章命题的活样本。

## Related Topics

- **Tool / Skill / Subagent 决策框架：Anthropic Applied AI 团队的 Agent 分解方法论** — Anthropic Will 工程师 Workshop（MCP first 是反模式）
- **Anthropic工程博客：用代码执行+MCP构建更高效的Agent** — Anthropic 官方 PTC 文章（被本文用作"承认 MCP 不够"的证据）
- **Claude Code 的核心架构原则：Prompt Caching 决定一切** — Claude Code 的 cache-first 设计
- **Claude Code架构拆解：Agent Harness的四层蓝图** — Claude Code 架构
- **HTML 取代 Markdown：Claude Code 输出格式的范式转移** — Thariq：用 HTML 替代 Markdown（同精神：用 OS 原生能力）
- **Claude Code from Source：18 章逆向解析 Claude Code 内部架构与可迁移模式** — Claude Code 源码分析
- **Anthropic 为什么要收购 Bun：重新定义 Agent 工具层** — Anthropic 收购 Bun（把 JS runtime 当工具层）
- **7 Principles for Agent-Friendly CLIs** — Agent 友好的 CLI 7 原则
- **CLI is All Agents Need - Unix Agent 设计指南** — 同主题前驱
- **给 AI 造专用 CLI：Codex 团队的 Agent-Friendly CLI 实践方法论** — OpenAI Codex CLI 设计
- **Anthropic：为 Agent 编写高效工具（用 Agent 优化工具）** — Agent 工具设计
- **Karpathy 的范式跃迁：Vibe Coding 是起点，Agentic Engineering 是终点** — Karpathy 范式跃迁
- **Karpathy microGPT - 纯Python零依赖的最小GPT实现** — Karpathy MicroGPT（纯 Python 无依赖哲学）
- **Hermes Agent vs 主流 CLI Agent 横向对比（15 维度）** — Hermes 全栈对比
- **Agentic Design Patterns（Antonio Gullí）：Agent 四个 Level + 21 种模式的方法论书** — Antonio Gullí 21 模式（Level 1 工具使用者就要做这件事）
