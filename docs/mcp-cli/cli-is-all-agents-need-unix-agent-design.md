---
title: "CLI is All Agents Need - Unix Agent 设计指南"
description: "CLI is All Agents Need - Unix Agent 设计指南"
---

## Summary

本文提出 LLM 应通过 Unix CLI 命令与工具交互，而非结构化的 function call。核心论据是 LLM 的"一切都是 token"哲学与 Unix 的"一切都是文本流"哲学天然契合。设计上采用单工具模式（一个 `run(command="...")` 接口暴露所有能力），通过渐进式帮助发现（命令列表 -> 用法说明 -> 参数详情）减少认知负担，并利用错误驱动的引导和一致的输出格式帮助 Agent 学习模式。参考实现为 Go 语言开源项目 `agent-clip`。

## Key Concepts

- **Unix Philosophy** - 一切都是文本流，与 LLM token 哲学对应
- **Single Tool Design** - 通过一个 `run(command="...")` 接口暴露所有能力
- **Progressive Disclosure** - 三层信息披露减少认知负担
- **Error Driven Guidance** - 清晰错误信息附带可执行修复建议
- **CLI Agent** - 基于命令行接口的 Agent 设计模式

## Detailed Content

### 核心论点

LLM 应通过 **Unix Philosophy** 命令与工具交互。"LLM 在 50 年后做出了几乎相同的决定：一切都是 token"——与 Unix 的"一切都是文本流"哲学高度对应。

### 关键设计原则

****Single Tool Design****：不使用多个工具，而是通过一个统一的 `run(command="...")` 接口暴露所有能力，简化工具调用的复杂度。

****Progressive Disclosure****：三层信息披露——命令列表、用法说明、参数详情，逐步减少 Agent 的认知负担。

****Error Driven Guidance****：清晰的错误信息附带可执行的修复建议，替代模糊的失败提示，引导 Agent 自我修正。

**一致的输出格式**：退出码和计时元数据帮助 Agent 学习执行模式。

### 参考实现

`agent-clip`：Go 语言开源实现，演示命令路由、管道执行和 LLM 展示层的具体应用。

## Related Topics

- **Agent Workflow**
- **Tool Design**
- **Coding Agent**
- **SubAgent**
- **Model Context Protocol**
