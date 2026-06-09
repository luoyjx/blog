---
title: "Hermes Agent万字系统提示词深度解析"
description: "Hermes Agent万字系统提示词深度解析"
---

## Summary

岚叔（@LufzzLiz）使用自研model-box工具导出Hermes Agent完整系统提示词，发现其规模约36,700 chars（~10K tokens），9层结构。最大"内鬼"是AGENTS.md（~20,300 chars，被截断到14K+4K），占系统提示词近一半但仅对开发者有用。优化方案：将Hermes工作目录改为主目录，避免加载hermes-agent仓库的AGENTS.md，每次对话省5K tokens（约50%）。Skill自进化逻辑好但存在skill泛滥问题，Memory系统存在敏感信息（API key）意外写入风险。

## Key Concepts

- **Hermes Agent** — 万字系统提示词的Agent，9层结构，51个注册工具（30个按需加载）
- **系统提示词** — 36,700 chars / ~10K tokens的完整提示词，9层架构
- **Token优化** — 通过改CWD路径跳过AGENTS.md加载，节省~5K tokens（50%）
- **动态AGENTS.md加载** — Hermes按CWD动态选择项目文件（优先级：.hermes.md > AGENTS.md > CLAUDE.md > .cursorrules）
- **Skill自进化** — Hermes有skill自进化逻辑（过时skill自动patch），但存在skill泛滥问题
- **model box** — 岚叔开源工具，mock模式启动，导出各种Agent的完整系统提示词

## Tags

hermes-agent, system-prompt, prompt-engineering, token-optimization, agent-architecture, model-box

## Detailed Content

### 系统提示词总体规模

| 指标 | 数值 |
|------|------|
| 总字符数 | ~36,700 chars |
| 总Token数 | ~10K tokens |
| 注册工具数 | 51个 |
| 加载工具数 | 30个（按需筛选）|
| 层级数 | 9层 |

工具加载筛选机制：`model_tools.py` 的 `_discover_tools()` 通过 `check_fn`（API Key是否存在）和 `enabled/disabled_toolsets` 决定。

### 9层结构详解

| 层 | 来源 | 大小 | 内容 |
|----|------|------|------|
| 1 | SOUL.md（用户自定义） | ~500 chars | Agent身份/人格 |
| 2 | 硬编码（prompt builder） | ~600 chars | Memory使用规则 |
| 3 | MEMORY.md快照 | ~3,725/4,000 chars（93%满）| 7个主题板块的记忆 |
| 4 | USER.md快照 | ~682/1,375 chars（49%）| 用户偏好/Wiki要求 |
| 5 | Skills索引 | ~5,000 chars | ~80+个Skill名称+描述前缀 |
| 6 | AGENTS.md（截断） | ~18,000 chars | 项目开发指南（最大"内鬼"）|
| 7 | 会话元数据 | ~200 chars | 模型自我认知指令 |
| 8 | 平台提示 | ~200 chars | Telegram/Discord平台定制 |
| 9 | 会话上下文元信息 | ~400 chars | 当前所在位置（频道、会话类型）|

### 最大"内鬼"：AGENTS.md截断机制

```
AGENTS.md原文（20,360 chars）
├── 前14,000 chars → 保留（项目结构、核心API、工具开发指南）
├── 中间2,360 chars → 丢弃（替换为截断提示）
└── 后4,000 chars → 保留（Known Pitfalls、测试指南）
```

截断逻辑：文件头部最重要（目录/API），尾部有价值（注意事项），中间细节可牺牲。

**问题**：如果你不是开发/维护Hermes，这~5K tokens完全无用。

### Token优化方案（节省50%）

**原理**：Hermes默认工作目录在hermes-agent仓库路径时，会加载该仓库的AGENTS.md。

**优化方式**：
```
告诉hermes：请将主agent cwd配置为～，然后重启
（需新开session，重新加载上下文）
```

文件加载优先级（四选一，只加载第一个找到的）：
`.hermes.md → AGENTS.md → CLAUDE.md → .cursorrules`

**效果**：系统提示词减少约一半。

### 发现的问题

1. **敏感信息写入Memory**：测试时挂的coze社区API key被写入MEMORY.md并持久化，Memory系统缺乏敏感信息过滤机制

2. **Skill泛滥**：Skill自进化逻辑（过时skill自动patch）良好，但长期运行后skill数量失控，需要生命周期管理和退化机制

3. **MEMORY接近满容量**：MEMORY.md已达93%（3,725/4,000 chars），需关注

### 与OpenClaw对比

| 特性 | Hermes | OpenClaw |
|------|--------|----------|
| AGENTS.md加载 | 项目级，按CWD动态选择 | 全局，总是加载 |
| 灵活性 | 高（可配置不同CWD）| 低（不够灵活）|
| 点评 | 设计更好，但默认配置有大文件问题 | 更简单但不灵活 |

### 导出工具：model-box

GitHub：github.com/cclank/modelbox

使用：mock模式启动 → `/models` 切换到modelbox → 导出完整系统提示词。适用于调试各种Agent（已用于分析OpenClaw、Hermes等）。

## Related Topics

- **我是怎么运作的：内观一个自进化Agent的Harness（yoyo）** — yoyo的不可变文件约束（与Hermes的SOUL.md类比）
- **Anthropic: Effective Harnesses for Long-Running Agents** — Anthropic官方Harness设计
- **Agent记忆三层架构：chunk/task/skill-recipes 压缩与召回策略** — Skill配方层级（与Hermes Skill索引的比较）
- **为什么你的'AI优先'战略可能是错的：CREAO的Harness工程实践** — CREAO的AI优先工程实践
