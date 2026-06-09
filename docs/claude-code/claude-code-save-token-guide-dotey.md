---
title: "Claude Code省Token指南：慎用1M上下文，正确理解缓存机制（宝玉）"
description: "永远是根本没进上下文的Token"
---

## Summary

宝玉(@dotey)整理的 Claude Code Token 省钱完整指南。核心洞见：**"活跃会话继续工作"才是默认策略，"开新会话"是特定条件触发的操作**。提示缓存命中率是关键——缓存读取成本只有重新计算的1/10，20轮会话缓存命中可比全价处理低6倍成本。1M上下文慎用（缓存失效后全量重建代价极大）。

## Key Concepts

- **提示缓存** — 模型生成"阅读笔记"后存储，命中时跳过重复计算，成本降至1/10
- **Token优化** — 核心：缓存命中最大化 + 上下文无关内容最小化
- **1M上下文** — 慎用：缓存失效后全量重建代价是200K的5倍
- **缓存命中率** — Claude Code 团队称其为"最重要的指标"
- **会话策略** — 缓存热、任务不变→继续；缓存过期、任务切换→新会话
- **上下文管理** — 路径代替粘贴、精简CLAUDE.md、permissions.deny限制读取范围

## Tags

claude-code, token, prompt-cache, cost-optimization, context-management, tips, 1m-context

## Detailed Content

### 缓存机制关键数字

| 指标 | 数值 |
|------|------|
| 缓存读取 vs 重新计算成本 | 1/10 |
| 20轮缓存命中节省 | 约6倍输入成本 |
| 主智能体缓存存活时间 | 1小时 |
| 子智能体缓存存活时间 | 5分钟 |
| 新会话初始化固定成本 | 约5万Token |
| 智能体团队 vs 标准会话Token消耗 | 约7倍 |

### 继续会话 vs 新会话决策

**继续会话**（默认）：任务没变 + 距上一条消息&lt;1小时 + 上下文仍有用

**新会话**（有条件触发）：任务切换 OR 闲置>1小时 OR 上下文被无关内容塞满

### 六条操作规则（优先级排序）
1. 日常用 Sonnet，Opus 留给复杂架构
2. 不在会话中间换模型（缓存按模型隔离）
3. CLAUDE.md 控制在200行内，技能按需加载
4. 命令行优先于 MCP（Token 消耗少）
5. 复杂任务先计划再执行
6. `permissions.deny` 排除 node_modules/build/secrets

### 1M上下文配置

```json
// 禁用1M
{ "env": { "CLAUDE_CODE_DISABLE_1M_CONTEXT": "1" } }

// 设置自动压缩阈值（推荐200K）
{ "env": { "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "200000" } }
```

### 最便宜的Token
> 永远是根本没进上下文的Token

## Related Topics

- **Claude Code Token 缓存深度解析：缓存命中节省 80% 成本** — Claude Code Token 缓存深度解析（另一篇）
- **Anthropic：AI Agent 有效上下文工程** — Anthropic 官方上下文工程指南
- **Context Engineering 实用指南 - 优化 AI 编码的上下文策略** — Context Engineering 实用指南
- **@lxfater：Claude Code 10 个实用技巧（启动模式+运行时+工具）** — Claude Code 10个实用技巧
- **Claude Code Best Practices - 14 Key Practices** — Claude Code 14个最佳实践
