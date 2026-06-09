---
title: "Anthropic工程博客：用代码执行+MCP构建更高效的Agent"
description: "Anthropic工程博客：用代码执行+MCP构建更高效的Agent"
---

## Summary
Anthropic 工程博客，展示代码执行模式的 MCP Agent 如何实现98.7% Token 节省（150k→2k tokens）。核心思路：Agent 写代码调用 MCP 工具而非直接调用，通过文件系统**Progressive Disclosure**按需发现工具、**Local Processing**本地过滤大数据、控制流优化减少 Agent↔Model 往返、**Privacy Preserving Computation**（PII 不进模型上下文）、**Skill Development**（可复用代码保存为带文档的 skills）。代价：需要安全沙箱和运维基础设施。

## Key Concepts
- **Code Execution MCP** — 写代码调用 MCP 工具替代直接工具调用
- **Token Efficiency** — 按需加载+本地处理实现98.7% token 节省
- **Progressive Disclosure** — 文件系统导航按需发现工具定义
- **Local Processing** — 数据在执行环境过滤，不流经模型
- **Privacy Preserving Computation** — 敏感数据不进入模型上下文
- **Skill Development** — 可复用代码函数保存为进化工具库

## Related Topics
- **MCP Protocol**
- **Agent Skills**
- **Context Management**
- **Anthropic官方：构建有效AI Agent**
- **Sandbox Execution**
