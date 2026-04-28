> 原文：06-equipping-agents-for-the-real-world-with-agent-skills.md
> 来源：https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills

# 用 Agent Skills 武装 Agent 应对真实世界

发布于 2025 年 10 月 16 日

> Claude 很强，但真实工作需要程序性知识和组织上下文。介绍 **Agent Skills**——用文件和文件夹构建专业化 Agent 的新方式。

> *更新（2025-12-18）*：我们已将 Agent Skills 作为开放标准发布，支持跨平台便携。

随着模型能力提升，我们能构建可以与完整计算环境交互的通用 Agent。例如 Claude Code 用本地代码执行和文件系统跨领域完成复杂任务。但随着 Agent 变强，**我们需要更可组合、可扩展、可移植的方式为它们配备领域特定专长**。

由此我们创造了 **Agent Skills**：组织好的指令、脚本和资源文件夹，Agent 可以动态发现并加载，以更好执行特定任务。**Skills 通过把你的专长打包为可组合资源扩展 Claude 能力**，把通用 Agent 转换为符合你需求的专业 Agent。

为 Agent 构建一个 Skill 就像为新员工准备入职指南。任何人都能通过捕捉和分享自己的程序性知识，用可组合能力专业化它们的 Agent，而不是为每个用例构建分散的、定制设计的 Agent。

> 一个 Skill 是包含 SKILL.md 文件的目录——指令、脚本和资源的有组织文件夹，赋予 Agent 额外能力。

---

## Skill 的解剖

来看一个真实示例：驱动 Claude 最近发布的文档编辑能力的 Skill 之一。Claude 已知很多关于理解 PDF 的内容，但在直接操作 PDF（如填表）方面有限。这个 PDF Skill 给 Claude 添加这些新能力。

最简形式：**Skill 是包含 `SKILL.md` 文件的目录**。该文件必须以 YAML frontmatter 开头，包含必需元数据：`name` 和 `description`。

启动时 Agent 把每个已安装 Skill 的 `name` 和 `description` 预加载到系统提示中。

这个元数据是**渐进披露（progressive disclosure）的第一层**：提供刚好够 Claude 知道每个 Skill 何时应被使用的信息，**而不把全部内容加载到上下文**。文件主体是**第二层细节**——如果 Claude 认为该 Skill 与当前任务相关，会通过读取完整 `SKILL.md` 加载到上下文。

随着 Skill 变复杂，可能包含太多上下文，无法塞进单个 `SKILL.md`，或包含只在特定场景相关的上下文。这时 Skill 可以在目录中捆绑额外文件，并从 `SKILL.md` 通过文件名引用。这些额外链接文件是**第三层（及更深）的细节**，Claude 可以选择仅在需要时浏览和发现。

在 PDF Skill 示例中，`SKILL.md` 引用两个额外文件（`reference.md` 和 `forms.md`）。把表单填写指令移到独立文件（`forms.md`），Skill 作者保持核心 Skill 精简，**信任 Claude 仅在填表时才读 `forms.md`**。

**渐进披露是让 Agent Skills 灵活可扩展的核心设计原则**。像组织良好的手册——从目录开始，到具体章节，最后是详细附录——Skills 让 Claude 仅在需要时加载信息。

带文件系统和代码执行工具的 Agent，处理特定任务时不需要把整个 Skill 读进上下文窗口。这意味着**单个 Skill 中可捆绑的上下文量在实际中无界**。

---

## Skills 与上下文窗口

当用户消息触发 Skill 时，上下文窗口的变化序列：

1. 起初上下文窗口包含核心系统提示、每个已安装 Skill 的元数据、用户初始消息
2. Claude 通过 Bash 工具读取 `pdf/SKILL.md` 触发 PDF Skill
3. Claude 选择读取 Skill 捆绑的 `forms.md` 文件
4. 最后 Claude 在加载了 PDF Skill 的相关指令后推进用户的任务

---

## Skills 与代码执行

**Skills 也可以包含代码，供 Claude 自由作为工具执行**。

LLM 在很多任务上出色，但某些操作更适合传统代码执行。例如通过 token 生成排序列表，远比直接运行排序算法贵。除了效率问题，许多应用需要只有代码才能提供的**确定性可靠性**。

在我们的示例中，PDF Skill 包含一个预写的 Python 脚本读取 PDF 并提取所有表单字段。Claude 可以运行这个脚本而不把脚本或 PDF 加载进上下文。**因为代码是确定的，这个工作流一致且可重复**。

---

## 开发与评估 Skills

入门指南：

- **从评估开始**：通过在代表性任务上运行 Agent，识别它们能力上的具体缺口，观察它们在哪里挣扎或需要额外上下文。然后逐步构建 Skills 来弥补这些短板。

- **为可扩展性结构化**：当 `SKILL.md` 变笨重时，把内容拆到独立文件并引用。如果某些上下文互斥或很少一起用，分离路径减少 token 使用。代码可以同时作为可执行工具和文档——清楚 Claude 应该直接运行脚本还是把它读进上下文作参考。

- **从 Claude 视角思考**：监控真实场景中 Claude 如何使用你的 Skill，根据观察迭代——留意意外轨迹或对某些上下文的过度依赖。**特别注意 Skill 的 `name` 和 `description`**——Claude 用它们决定是否触发 Skill 来响应当前任务。

- **与 Claude 一起迭代**：当你和 Claude 合作完成任务时，请 Claude 把成功方法和常见错误捕获到一个 Skill 的可复用上下文和代码中。如果它在用某个 Skill 完成任务时跑偏，请它自我反思哪里出错。**这个过程帮你发现 Claude 实际需要的上下文，而不是预先猜测**。

### 安全考虑

Skills 通过指令和代码给 Claude 新能力。这让它们强大，但也意味着**恶意 Skill 可能在使用环境中引入漏洞，或指示 Claude 泄露数据并采取意外动作**。

我们建议**只从可信来源安装 Skills**。从不太可信来源安装时，使用前彻底审计：从读取 Skill 中捆绑的文件内容开始理解它做什么，特别注意代码依赖和捆绑资源（如图片或脚本）。同样注意 Skill 内指示 Claude 连接潜在不可信外部网络源的指令或代码。

---

## Skills 的未来

Agent Skills 目前在 Claude.ai、Claude Code、Claude Agent SDK 和 Claude Developer Platform 中受支持。

未来几周，我们将持续增加支持创建、编辑、发现、分享、使用 Skills 完整生命周期的功能。我们特别期待 **Skills 帮组织和个人与 Claude 分享他们的上下文和工作流**。我们也将探索 Skills 如何补充 Model Context Protocol（MCP）服务器——通过教会 Agent 涉及外部工具和软件的更复杂工作流。

更远的未来，我们希望让 Agent **自己创建、编辑、评估 Skills**，把它们自己的行为模式编码为可复用能力。

Skills 是简单概念，对应简单格式。**这种简洁性让组织、开发者和最终用户更容易构建定制化 Agent 并赋予它们新能力**。
