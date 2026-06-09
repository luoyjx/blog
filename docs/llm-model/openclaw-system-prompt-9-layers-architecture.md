---
title: "OpenClaw Agent System Prompt 架构详解（9层）"
description: "OpenClaw Agent System Prompt 架构详解（9层）"
---

## Summary

OpenClaw 采用精心设计的 9 层 System Prompt 架构，如同"三明治"逐层叠加喂给大模型。前 6 层由框架自动生成（框架核心层、工具定义层、技能注册表、模型别名层、协议规范层、运行时信息层），确保基线一致；第 7-8 层赋予用户控制权（工作区文件层含 IDENTITY.md/AGENTS.md/MEMORY.md，动态注入层含 4 种 Hook 机制）；第 9 层实时注入发送者信息和消息历史。这一分层设计在框架一致性与用户个性化之间取得平衡。

## Key Concepts

- **OpenClaw** - 开源 AI Agent 框架
- **System Prompt** - AI 助手对话前的内部说明
- **9 Layer Architecture** - OpenClaw 的 9 层 System Prompt 架构
- **Hooks** - 动态注入机制（agent:bootstrap, bootstrap-extra-files, before_prompt_build, bootstrapMaxChars）
- **IDENTITY.md** - 定义 Agent 身份、风格、价值观
- **AGENTS.md** - 配置可调用的子 Agent
- **MEMORY.md** - AI 的长期记忆文件
- **Progressive Disclosure** - 渐进式信息披露设计

## Detailed Content

### 框架自动生成层（Layer 1-6）

**Layer 1 框架核心层**：定义 AI 身份、当前时间、运行环境、工具调用格式规范、安全边界。

**Layer 2 工具定义层**：列出所有可调用工具，使用严格的 JSON Schema 定义。

**Layer 3 技能注册表**：自动扫描技能目录，添加新技能只需放入目录。代价是技能越多消耗 token 越多。

**Layer 4 模型别名层**：为复杂模型路径创建简短别名。

**Layer 5 协议规范层**：定义 Silent Replies、Heartbeats、Reply Tags 等交互协议。

**Layer 6 运行时信息层**：每次请求注入实时环境信息，约 2KB 额外 token。

### 用户可控层（Layer 7-8）

**Layer 7 工作区文件层**：用户直接编辑 **IDENTITY.md**（身份风格）、**AGENTS.md**（子 Agent 配置）、**MEMORY.md**（长期记忆）、TOOLS.md（额外工具说明）。优化建议：用表格代替长段落，保持精简。

**Layer 8 动态注入层**：4 种 **Hooks** 机制——`agent:bootstrap`（最强大，完全控制 prompt 文件列表）、`bootstrap-extra-files`（最简单，追加额外文件）、`before_prompt_build`（最灵活，动态注入实时数据）、`bootstrapMaxChars`（控制字符上限）。

### 实时注入层（Layer 9）

**Layer 9 入站上下文层**：每次请求注入当前发送者信息、消息历史、是否被 @ 提及。

### 设计哲学

前 6 层框架自动生成确保基线一致，第 7-8 层赋予用户控制权实现个性化，第 9 层实时注入确保上下文准确。用户理解各层作用后，可"控制 AI 大脑的底层结构"。

## Related Topics

- **System Prompt**
- **Agent Workflow**
- **SubAgent**
- **Claude Code**
- **Prompt Engineering**
- **Skills**
