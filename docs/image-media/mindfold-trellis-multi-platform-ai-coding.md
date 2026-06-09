---
title: "Mindfold Trellis跨平台AI编码统一工作流框架"
description: "Mindfold Trellis跨平台AI编码统一工作流框架"
---

## Summary
Mindfold Trellis（GitHub 4.7K stars，AGPL-3.0）是一个标准化跨13个AI编码平台（Claude Code、Cursor、OpenCode、Codex、GitHub Copilot等）的统一工作流框架。六大核心能力包括：自动上下文注入（标准写一次自动注入）、任务中心组织、通过Git Worktree实现并行执行、持久项目记忆、团队共享标准、以及跨平台一致性。项目通过`.trellis/`目录结构管理规范、任务、工作区和脚本。

## Key Concepts
- **Multi Platform AI Coding** - 跨多个AI编码平台的统一开发
- **Workflow Standardization** - 开发工作流的标准化
- **Context Injection** - 自动将项目规范注入AI会话
- **Project Memory** - 持久化的项目开发记忆
- **Git Worktree** - 通过git worktree实现多任务并行

## Detailed Content

### 六大核心能力

1. **自动**Context Injection****：标准写一次在`.trellis/spec/`，自动注入每次会话
2. **任务中心组织**：工作文档、实现细节、状态追踪集中在`.trellis/tasks/`
3. **并行执行**：通过**Git Worktree**多AI任务同时运行
4. **持久**Project Memory****：`.trellis/workspace/`保存会话历史，后续工作延续上下文
5. **团队共享标准**：仓库级**Workflow Standardization**，一人建立全团队受益
6. **跨平台一致性**：13个AI编码平台统一结构

### 支持的平台

Claude Code、Cursor、OpenCode、Codex、GitHub Copilot等13个**Multi Platform AI Coding**工具。

### 目录结构

```
.trellis/
├── spec/        # 编码标准、架构模式、项目指南
├── tasks/       # 任务规范、上下文、进度追踪
├── workspace/   # 个人开发日志、会话连续性
├── workflow.md  # 共享流程规则
└── scripts/     # 工作流自动化
```

### 安装

```bash
npm install -g @mindfoldhq/trellis@latest
trellis init -u your-name
```

## Related Topics
- **Claude Code Configuration**
- **Hackathon Claude Code Setup**
- **Agent Orchestration**
- **Development Workflow**
- **Self Improving Agent**
