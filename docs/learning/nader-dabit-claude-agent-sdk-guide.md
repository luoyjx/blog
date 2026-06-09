---
title: "Nader Dabit: Claude Agent SDK 完整构建指南"
description: "Nader Dabit: Claude Agent SDK 完整构建指南"
---

## Summary
Nader Dabit 撰写的 **Claude Agent SDK** 完整教程，获得 390 万浏览和 8.8K 赞。文章介绍了 SDK 的核心架构，包括 `query()` 异步生成器、内置工具集（Read/Write/Edit/Bash/Glob/Grep/WebSearch/WebFetch）以及消息流式处理机制。教程以代码审查 Agent 为实战案例，展示了结构化输出、**Subagents** 委派、权限管理、会话管理、**Hooks** 和 **MCP Tools** 自定义等高级功能。核心洞察在于 Agent 设计的难点不在构建，而在于设计何时不该行动、何时需要人类介入。

## Key Concepts
- **Claude Agent SDK** - Claude Code 背后的 Agent 基础设施库
- **Subagents** - 委派给专门 Agent（security-reviewer、test-analyzer）
- **MCP Tools** - 用 Zod Schema 定义的自定义工具
- **Permission Management** - 三种模式：default / acceptEdits / bypassPermissions
- **Hooks** - PreToolUse / PostToolUse 回调机制

## Detailed Content

### SDK 核心架构
使用 `query()` 函数作为异步生成器，流式处理三种消息类型：System（初始化）、Assistant（响应和工具调用）、Result（完成状态和成本）。

### 实战：代码审查 Agent
分析代码库中的 bug 和安全漏洞，需要 Node.js 18+ 和 Anthropic API Key，使用 **Claude Agent SDK** 作为运行时。

### 高级功能
- **结构化输出**：JSON Schema 格式化，自动按严重程度分类
- ****Subagents****：委派专门任务给 security-reviewer 和 test-analyzer
- ****Permission Management****：自定义 `canUseTool()` 处理器
- **会话管理**：通过 session ID 恢复对话，跨轮次保持上下文
- ****Hooks****：审计、阻止危险操作、自定义行为
- ****MCP Tools****：Zod Schema 输入验证 + 描述 + 处理函数

## Related Topics
- **Claude Agent SDK Technical Spec**
- **Everything Claude Code**
- **Ralph Loop**
- **Multi Agent Systems**
