---
title: "AITutor - 交互式终端AI编码学习指南"
description: "AITutor - 交互式终端AI编码学习指南"
---

## Summary

AITutor 是一款类似 vimtutor 的终端交互式教育应用，专注于教授 AI 编码概念。课程体系涵盖 17 节课，从初级的观察-思考-行动循环和 Token 预算，到高级的 **Model Context Protocol** 架构和并行 Agent 执行。项目基于 Go 语言和 Charm 框架（bubbletea/lipgloss/bubbles）构建，提供可滚动文本、ASCII 可视化和多题型评估三阶段学习体验。进度自动保存，支持跨会话继续学习，是入门 AI 编码实践的优质工具。

## Key Concepts

- **AITutor** - 类 vimtutor 的 AI 编码交互式教程
- **Context Window** - 上下文窗口，AI 模型的输入容量
- **Token Budget** - Token 预算管理
- **MCP** - Model Context Protocol 架构
- **Agent Workflow** - Agentic 工作流设计
- **Prompt Engineering** - 提示词工程基础与高级技巧
- **SubAgent** - 并行 Agent 执行与子 Agent 概念
- **Git Worktrees** - Git 工作树用于并行开发
- **Skill System** - Skill 系统与延迟工具加载

## Detailed Content

### 课程体系

AITutor 将 AI 编码知识分为三个层级共 17 节课：

**初级（第 1-4 课）**：建立基础认知，包括观察-思考-行动循环、**Token Budget** 管理、核心工具（glob、read、edit、bash）以及 **Prompt Engineering** 基础。

**中级（第 5-11 课）**：深入项目级实践，涵盖项目级指令、执行策略、生命周期 Hooks、记忆系统、**Agent Workflow**、高级提示词技巧和代码审查实践。

**高级（第 12-17 课）**：掌握前沿架构，包括 **MCP** 架构、**Skill System**、并行 Agent 执行、**Git Worktrees**、延迟工具加载和批量操作。

### 学习方法论

每节课三阶段：理论文本 -> 交互式 ASCII 可视化 -> 多选/填空/排序题评估。

### 技术栈

Go 语言编写，基于 Charm 框架生态：bubbletea（TUI 框架）、lipgloss（样式）、bubbles（组件）。

## Related Topics

- **Model Context Protocol**
- **Agent Workflow**
- **Prompt Engineering**
- **SubAgent**
- **Claude Code**
- **Coding Agent**
