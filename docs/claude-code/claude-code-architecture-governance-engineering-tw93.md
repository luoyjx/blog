---
title: "你不知道的Claude Code：架构、治理与工程实践"
description: "你不知道的Claude Code：架构、治理与工程实践"
---

## Summary

Tw93 基于六个月深度使用 Claude Code 的经验，系统总结了九大核心主题。六层框架设计涵盖上下文加载、行动能力、控制机制、验证和监控层。**Context Engineering** 方面，200K 上下文受固定开销限制，MCP 工具单独消耗 12.5%，需分离静态配置并管理工具输出噪声。**Skills** 应视为按需工作流而非 prompt 模板。**Hooks** 提供执行前/后约束的自动化节点，**SubAgent** 用于大输出任务的隔离策略。**Prompt Caching** 是成本结构基础，缓存感知布局至关重要。**CLAUDE.md** 作为合约文档聚焦构建/测试命令和架构边界。

## Key Concepts

- **Claude Code** - Anthropic 的 AI 编码助手
- **Context Engineering** - 200K 上下文的优化管理策略
- **Skills** - 按需工作流设计，强调渐进式披露
- **Hooks** - 执行前/后约束的自动化节点
- **SubAgent** - 大输出任务的隔离策略
- **Prompt Caching** - 成本优化的基础，缓存感知布局
- **CLAUDE.md** - 合约文档，聚焦构建/测试命令和架构边界
- **Compact Instructions** - 上下文压缩策略

## Detailed Content

### 六层框架设计

**Claude Code** 系统设计涵盖：上下文加载、行动能力、控制机制、验证、监控层，形成完整的治理体系。

### **Context Engineering**

200K 上下文受固定开销限制——**MCP** 工具单独消耗 12.5%。优化建议：分离静态配置、管理工具输出噪声、使用 **Compact Instructions**。

### **Skills** 设计

将 **Skills** 视为按需工作流而非 prompt 模板，强调 **Progressive Disclosure**，与 Anthropic 官方指南一致。

### 工具架构与 **Hooks**

讨论 **Claude Code** 内部的工具演进经验。**Hooks** 提供执行前/后约束的自动化节点，实现自动化验证。

### **SubAgent** 策略

大输出任务使用 **SubAgent** 进行隔离，避免上下文污染和窗口溢出。

### **Prompt Caching**

成本结构的基础，缓存感知的布局至关重要。合理组织 prompt 结构可显著降低 API 调用成本。

### **CLAUDE.md** 最佳实践

作为合约文档，聚焦构建/测试命令和架构边界，而非冗长的项目描述。

### 实用命令

`/context`、`/compact`、`/health` 等用于主动上下文管理。作者的 Kaku 终端项目和 health-check skill（tw93/claude-health）提供具体实践案例。

## Related Topics

- **Skills**
- **Model Context Protocol**
- **AGENTS.md**
- **OpenClaw**
- **Codex**
- **Prompt Engineering**
