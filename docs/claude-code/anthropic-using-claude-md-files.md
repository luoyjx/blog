---
title: "Anthropic官方：如何使用CLAUDE.md文件定制Claude Code"
description: "Anthropic官方：如何使用CLAUDE.md文件定制Claude Code"
---

## Summary
Anthropic 官方 CLAUDE.md 使用指南。CLAUDE.md 是为 Claude 提供持久项目上下文的配置文件，可放置在项目根目录、monorepo 父目录或家目录（全局）。`/init` 命令自动分析代码库生成初稿。推荐四部分结构：**Persistent Context**（项目映射）、工具连接（MCP）、工作流定义、开发标准。进阶：**Custom Commands**（`.claude/commands/` markdown 文件）、`/clear` 任务间清空上下文保留配置、Subagents 防上下文干扰。保持简洁，随项目演进持续更新。

## Key Concepts
- **CLAUDE.md** — Claude Code 的持久项目上下文配置文件
- **Persistent Context** — 无需每次对话重复解释的项目知识
- **Project Configuration** — 架构、标准、工作流的文档化
- **Custom Commands** — `.claude/commands/` 中的自定义 slash 命令
- **Context Management** — /clear、Subagents 的上下文管理策略

## Related Topics
- **Claude Code**
- **8个Claude Code Hooks自动化实践**
- **Claude Code Best Practices   14 Key Practices**
- **你不知道的Claude Code：架构治理与工程实践**
