> 原文：14-claude-code-best-practices.md
> 来源：https://www.anthropic.com/engineering/claude-code-best-practices

# Claude Code：Agent 式编码最佳实践

> 配置环境到跨并行会话扩展的技巧和模式。

Claude Code 是 Agent 式编码环境。**不像聊天机器人回答问题等待**——Claude Code 可以读你的文件、运行命令、做改动，**自治地推进问题，你旁观、重定向或完全离开**。

这改变了你的工作方式。**不是你写代码并请 Claude 审查，而是你描述想要什么，Claude 弄清如何构建**。Claude 探索、规划、实现。

但这种自治仍有学习曲线。Claude 在你需要理解的某些约束内工作。

> 大多数最佳实践基于一个约束：**Claude 的上下文窗口快速填满，性能随填充而退化**。

Claude 的上下文窗口持有你的整个对话——每条消息、Claude 读的每个文件、每次命令输出。**单次调试或代码库探索可能产生和消耗数万 token**。

这很重要——LLM 性能随上下文填充而退化。**上下文窗口接近满时，Claude 可能开始"忘记"早期指令或犯更多错误**。上下文窗口是要管理的最重要资源。

---

## 给 Claude 验证工作的方法

包含测试、截图或预期输出，让 Claude 能自我检查。**这是你能做的单一最高杠杆的事**。

Claude 在能验证自己工作时表现戏剧性更好——运行测试、对比截图、验证输出。

没有清晰的成功标准，它可能产生看起来对但实际不工作的东西。**你成为唯一的反馈循环**，每个错误都需要你的注意。

| 策略 | 之前 | 之后 |
|------|------|------|
| **提供验证标准** | "实现一个验证邮箱的函数" | "写一个 validateEmail 函数。示例测试用例：user@example.com 为 true，invalid 为 false，user@.com 为 false。实现后运行测试" |
| **可视化验证 UI 改动** | "让仪表盘看起来更好" | "[贴截图] 实现这个设计。截图结果并与原始对比。列出差异并修复" |
| **解决根因，不是症状** | "构建失败" | "构建失败带这个错误：[贴错误]。修复并验证构建成功。**解决根因，不要抑制错误**" |

UI 改动可以用 Claude in Chrome 扩展验证——它在浏览器打开新标签页测试 UI，迭代直到代码工作。

---

## 先探索，再规划，再编码

把研究和规划与实现分开，避免解决错误问题。

让 Claude 直接跳到编码可能产生解决错误问题的代码。**用 Plan Mode 把探索与执行分开**。

推荐工作流四个阶段：

1. **探索（Explore）**：进入 Plan Mode。Claude 读文件并回答问题不做改动
   ```
   读取 /src/auth 并理解我们如何处理 sessions 和 login。
   也看我们如何为 secrets 管理环境变量。
   ```

2. **规划（Plan）**：要求 Claude 创建详细实现计划
   ```
   我想加 Google OAuth。哪些文件需要改？
   session 流程是什么？创建一个计划。
   ```
   按 `Ctrl+G` 在文本编辑器打开计划，让 Claude 推进前直接编辑。

3. **实现（Implement）**：切回 Normal Mode，让 Claude 编码并对照计划验证

4. **提交（Commit）**：要求 Claude 用描述性消息提交并创建 PR

**Plan Mode 有用，但也增加开销**。范围清晰、修复小的任务（如修拼写错误、加一行日志、重命名变量）直接让 Claude 做。**当你不确定方法、改动修改多文件、或不熟悉被改的代码时规划最有用**。如果你能用一句话描述 diff，跳过计划。

---

## 在提示中提供具体上下文

**指令越精确，需要的修正越少**。Claude 能推断意图，但读不了你的心。引用具体文件、提及约束、指向示例模式。

| 策略 | 之前 | 之后 |
|------|------|------|
| **范围任务** | "为 foo.py 加测试" | "为 foo.py 写一个测试覆盖用户登出的边缘情况。避免 mocks" |
| **指向源** | "为什么 ExecutionFactory 有这么奇怪的 API？" | "看 ExecutionFactory 的 git 历史并总结它的 API 是怎么来的" |
| **引用现有模式** | "加日历组件" | "看主页上现有 widget 如何实现以理解模式。HotDogWidget.php 是好示例。遵循模式实现新日历 widget..." |
| **描述症状** | "修登录 bug" | "用户报告 session 超时后登录失败。检查 src/auth/ 中的认证流程，特别是 token 刷新。**写一个失败测试复现问题，然后修复**" |

模糊提示在你探索且能承担修正时有用。"你会改进这个文件什么？" 这种提示能浮现你想不到要问的东西。

### 提供丰富内容

- **用 `@` 引用文件** 而非描述代码在哪
- **直接粘贴图片**
- **给 URL** 文档和 API 引用
- **管道数据** 如 `cat error.log | claude`
- **让 Claude 自己抓取** 用 Bash 命令、MCP 工具或读文件

---

## 配置环境

### 写有效的 CLAUDE.md

运行 `/init` 基于当前项目结构生成起始 CLAUDE.md，再随时间精炼。

CLAUDE.md 是 Claude 在每次对话开始读的特殊文件。包含 Bash 命令、代码风格、工作流规则——**这给 Claude 它无法仅从代码推断的持久上下文**。

```markdown
# 代码风格
- 用 ES modules（import/export），不用 CommonJS（require）
- 尽可能解构 imports（如 import { foo } from 'bar'）

# 工作流
- 做完一系列代码改动后务必类型检查
- 出于性能考虑，优先运行单个测试，不是整个测试套件
```

CLAUDE.md 每个会话都加载，**只包含广泛适用的内容**。**保持简洁**。每行问："**删除这行会让 Claude 犯错吗？**" 如果不会，砍掉。**臃肿的 CLAUDE.md 让 Claude 忽略你的实际指令**！

| ✅ 包含 | ❌ 排除 |
|--------|--------|
| Claude 猜不到的 Bash 命令 | Claude 通过读代码能搞清楚的任何东西 |
| 偏离默认的代码风格规则 | Claude 已知的标准语言约定 |
| 测试指令和首选测试运行器 | 详细 API 文档（链接到 docs 代替）|
| 仓库礼仪（分支命名、PR 约定）| 频繁变化的信息 |
| 项目特定的架构决策 | 长解释或教程 |
| 开发者环境怪癖 | 代码库的逐文件描述 |
| 常见陷阱或非显然行为 | 自明实践如"写干净代码" |

如果 Claude 持续做你不想要的事尽管有规则，**文件可能太长，规则迷失**。

可以加强调（如 "IMPORTANT" 或 "YOU MUST"）改善遵守。**把 CLAUDE.md 当代码**——出错时审查、定期修剪、通过观察 Claude 行为是否真改变测试改动。

CLAUDE.md 文件可用 `@path/to/import` 语法导入额外文件。位置：
- **家目录** `~/.claude/CLAUDE.md`：适用所有 Claude 会话
- **项目根** `./CLAUDE.md`：签入 git 与团队共享
- **项目根** `./CLAUDE.local.md`：个人项目特定笔记，加到 `.gitignore`
- **父目录**：monorepo 中有用
- **子目录**：Claude 在该目录文件工作时按需拉入

### 配置权限

默认 Claude Code 为可能修改系统的操作请求权限。三种方式减少这些中断：
- **Auto mode**：分类器模型审查命令，只阻塞看似有风险的
- **权限白名单**：允许你知道安全的特定工具
- **沙箱**：启用 OS 级隔离限制文件系统和网络访问

### 用 CLI 工具

告诉 Claude Code 用 `gh`、`aws`、`gcloud`、`sentry-cli` 等 CLI 工具与外部服务交互。**CLI 工具是与外部服务交互的最上下文高效方式**。

### 连接 MCP 服务器

`claude mcp add` 连接 Notion、Figma 或你的数据库。

### 设置 hooks

**Hooks 用于必须每次发生、无例外的操作**。Hooks 在 Claude 工作流的特定点自动运行脚本——不像 CLAUDE.md 指令是建议性的，**hooks 是确定性的**。

### 创建 Skills

在 `.claude/skills/` 创建 SKILL.md 文件给 Claude 领域知识和可复用工作流。

### 创建自定义 sub-agent

在 `.claude/agents/` 定义专门助手。**Sub-agent 在自己的上下文用自己的允许工具集运行**。对读多文件或需要专门焦点的任务有用。

---

## 有效沟通

### 提代码库问题

像问资深工程师那样问 Claude：
- 日志如何工作？
- 我如何创建新 API endpoint？
- `foo.rs` 第 134 行的 `async move { ... }` 做什么？

**这是有效的入职工作流**——改善上手时间，减少其他工程师的负担。

### 让 Claude 面试你

对于更大功能，**让 Claude 先面试你**。从最小提示开始，请 Claude 用 `AskUserQuestion` 工具面试。

```
我想构建 [简短描述]。用 AskUserQuestion 工具详细面试我。

问技术实现、UI/UX、边缘情况、关切、权衡。不要问显然问题，**深挖我可能没考虑的难点**。

继续面试到我们覆盖一切，然后写完整规格到 SPEC.md。
```

规格完成后，**开新会话执行**。新会话有完全聚焦实现的干净上下文。

---

## 管理你的会话

对话是持久且可逆的。**用这点占便宜**！

### 早且频繁地修正

注意到 Claude 跑偏立即修正。**最好结果来自紧密反馈循环**。

- `Esc`：动作中停止 Claude（保留上下文）
- `Esc + Esc` 或 `/rewind`：开 rewind 菜单恢复之前对话和代码状态
- "Undo that"：让 Claude 还原它的改动
- `/clear`：在不相关任务间重置上下文

**如果一个会话中你已就同一问题修正 Claude 超过两次，上下文被失败方法污染**。运行 `/clear`，用更具体的提示（包含你学到的）重新开始。

### 积极管理上下文

不相关任务间运行 `/clear` 重置上下文。

- 频繁用 `/clear` 完全重置
- 自动压缩触发时，Claude 总结最重要的（代码模式、文件状态、关键决策）
- 更多控制：`/compact <instructions>` 如 `/compact 聚焦 API 改动`
- 只压缩部分对话：`Esc + Esc` 或 `/rewind`，选消息检查点
- 在 CLAUDE.md 自定义压缩行为
- 不需要留在上下文的快速问题：用 `/btw` 答案出现在可解除的覆盖层

### 用 sub-agent 调查

`"用 sub-agent 调查 X"`。它们在独立上下文探索，**保持主对话干净**。

```
用 sub-agent 调查我们的认证系统如何处理 token 刷新，
以及我们是否有现存的 OAuth 工具应该复用。
```

也用 sub-agent 验证：
```
用 sub-agent 审查这段代码的边缘情况
```

### 用检查点 rewind

Claude 每个动作都创建检查点。**双击 Escape 或 `/rewind` 打开 rewind 菜单**。可以恢复对话、代码或两者。

**不仔细规划每步**——你可以让 Claude 试些冒险的，不 work 就 rewind 试不同方法。

### 恢复对话

`claude --continue` 接续最近，`--resume` 选最近会话。`/rename` 给会话描述性名称。**像分支对待会话**——不同工作流可以有独立持久上下文。

---

## 自动化和扩展

### 非交互模式

`claude -p "prompt"` 在 CI、pre-commit hooks 或脚本。`--output-format stream-json` 获流式 JSON 输出。

### 多个 Claude 会话

三种主要方式并行：
- Claude Code 桌面应用
- Claude Code on the web
- Agent teams

**Writer/Reviewer 模式**：Session A 写，Session B 审查（用新鲜上下文，不偏向自己刚写的代码）。

### 跨文件 fan out

```bash
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue. Return OK or FAIL." \
    --allowedTools "Edit,Bash(git commit *)"
done
```

### 用 auto mode 自治运行

```bash
claude --permission-mode auto -p "fix all lint errors"
```

分类器模型审查命令——阻塞范围升级、未知基础设施、敌意内容驱动的动作。

---

## 避免常见失败模式

- **厨房水槽会话**：从一个任务开始，问 Claude 不相关的事，又回到第一个任务。**修复**：不相关任务间 `/clear`
- **反复修正**：Claude 做错，你修正，还错。**修复**：两次失败修正后 `/clear`，写更好的初始提示
- **过度规定的 CLAUDE.md**：太长，Claude 忽略一半。**修复**：无情修剪
- **信任后验证缺口**：Claude 产生看似合理的实现不处理边缘情况。**修复**：始终提供验证（测试、脚本、截图）
- **无限探索**：要求 Claude"调查"东西不范围化。Claude 读数百文件填充上下文。**修复**：范围窄或用 sub-agent

---

## 发展你的直觉

本指南的模式不是一成不变的——是一般工作良好的起点，可能不适合每种情况。

**有时你应该让上下文累积**因为深入一个复杂问题，历史很有价值。**有时跳过规划**让 Claude 弄清楚，因为任务是探索性的。**有时模糊提示恰好对**——你想看 Claude 如何解读问题。

注意什么 work。Claude 产出好输出时，注意你做了什么——提示结构、提供的上下文、当时的模式。Claude 挣扎时，问为什么。**随时间，你将发展任何指南都无法捕捉的直觉**。
