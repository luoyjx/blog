---
title: "Agent设计模式 - 上下文管理为核心的7大模式"
description: "Agent设计模式 - 上下文管理为核心的7大模式"
---

## Summary
Lance Martin 提出的 Agent 设计模式框架，核心论点是有效的 Agent 设计根本上取决于高效管理上下文，因为语言模型随上下文增长性能下降。文章系统性地总结了七大设计模式：计算机访问、多层行动空间、渐进式披露、上下文卸载、Prompt 缓存、上下文隔离和持续学习。同时展望了学习式上下文管理、多 Agent 协调和长时运行基础设施三个未来方向。

## Key Concepts
- **Context Management** - Agent 设计的核心问题：高效管理 LLM 上下文窗口
- **Progressive Disclosure** - 分层信息揭示，仅初始显示必要操作
- **Context Offloading** - 将旧工具结果和轨迹写入文件系统
- **Prompt Caching** - 缓存命中率是"最重要的指标"
- **Context Isolation** - 子 Agent 以独立上下文窗口处理可并行任务
- **Multi Layer Action Space** - 极少直接工具，复杂操作推到计算机层
- **Continuous Learning** - 通过上下文演化而非权重更新改进

## Detailed Content

### 七大设计模式

#### 1. 计算机访问（Computer Access）
Agent 直接访问文件系统和 Shell。**Claude Code** 作为"操作系统的 AI"，Manus 使用虚拟计算机。在 OS 层控制系统，而非仅依赖工具调用。

#### 2. 多层行动空间（**Multi Layer Action Space**）
成功的 Agent 使用极少的直接工具（通常 &lt;20 个），将复杂操作推到计算机层（如 bash）。CodeAct 研究证实 Agent 可通过代码执行链接大量操作。

#### 3. 渐进式披露（**Progressive Disclosure**）
分层信息揭示策略：工具定义索引 + 按需检索加载；指令中放实用工具列表 + 按需 help flag；MCP 服务器同步文件夹；Skills YAML frontmatter 按需加载。

#### 4. 上下文卸载（**Context Offloading**）
将旧工具结果和轨迹写入文件系统，仅在边际收益递减时应用摘要。计划也写入文件，定期重读以强化目标。

#### 5. Prompt 缓存（**Prompt Caching**）
Manus 认为缓存命中率是"最重要的指标"。更强模型 + 缓存的成本往往低于较弱模型不缓存。

#### 6. 上下文隔离（**Context Isolation**）
"Ralph Wiggum"模式：初始化 Agent 建环境，后续 Agent 各个击破，通过 git 历史沟通进度。

#### 7. 持续学习（**Continuous Learning**）
反思过去轨迹更新指令；会话摘要蒸馏为日记再整合为参考文档；提取可复用流程保存为新的文件系统 Skill。

### 未来方向
- **学习式上下文管理**：模型自身学习管理上下文
- **多 Agent 协调**：Gas Town 项目的 git 追踪 + 市长协调层
- **长时运行基础设施**：标准化可观测性和优雅失败处理

## Related Topics
- **Building Effective Agents**
- **Agent Skills Framework**
- **MCP Protocol**
- **LLM Context Window**
- **Multi Agent Systems**
