---
title: "OpenAI Codex Best Practices 最佳实践完整指南"
description: "OpenAI Codex Best Practices 最佳实践完整指南"
---

## Summary

OpenAI Codex 最佳实践指南的核心理念是将 Codex 视为一个可配置的持续改进的队友，而非一次性助手。指南涵盖十大实践领域：有效 Prompt 结构（Goal/Context/Constraints/Done When 四要素）、复杂任务规划（Plan Mode）、**AGENTS.md** 可复用指导、配置一致性、测试验证、**MCP** 外部上下文连接、**Skills** 封装可重复工作、**Automations** 自动化调度、会话管理以及常见错误规避。其中 Skills 定义方法、Automations 定义时间表的设计理念尤为关键。

## Key Concepts

- **Codex** - OpenAI 的 AI 编码助手
- **AGENTS.md** - Agent 的开放格式 README，自动加载上下文
- **Plan Mode** - 先收集上下文和澄清问题再编码
- **Skills** - 用 SKILL.md 打包可重用工作流
- **MCP** - 连接代码库外部上下文的协议
- **Automations** - 后台调度自动化运行
- **Session Management** - 会话管理与 SubAgent 调度
- **Git Worktree** - 实时文件并行工作策略

## Detailed Content

### Prompt 结构四要素

有效的 Prompt 需包含：Goal（变更目标）、Context（相关文件/文档，用 @ 引用）、Constraints（标准与架构要求）、Done When（完成标准）。推理级别从 Low（快速任务）到 Extra High（agentic 推理密集工作）。

### AGENTS.md 配置体系

作为 Agent 的开放格式 README 自动加载，内容涵盖仓库布局、构建/测试/lint 命令、工程惯例、约束规则和验证方法。支持多层级：全局 `~/.codex`、仓库级 `.codex`、子目录级。

### **Skills** 与 **Automations**

每个 **Skills** 应处理一个特定任务，包含 2-3 个用例，定义清晰输入输出和触发短语。**Automations** 通过 App 调度后台运行，配置目标项目、提示词/Skill、频率和环境。核心理念：**Skills 定义方法，Automations 定义时间表**。

### 会话管理命令

`/resume` 继续对话、`/fork` 分支工作、`/compact` 压缩历史、`/agent` 切换并行线程、`/status` 检查状态。

### 常见错误

把持久规则放 prompt 而非 **AGENTS.md**；隐藏构建命令细节；跳过规划；过早授予权限；不用 **Git Worktree**；一个线程处理整个项目。

## Related Topics

- **Claude Code**
- **AGENTS.md**
- **Model Context Protocol**
- **SubAgent**
- **Coding Agent**
