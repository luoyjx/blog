---
title: "Context Engineering 实用指南 - 优化 AI 编码的上下文策略"
description: "'Good vibe coding is about optimizing for value-dense context.'"
---

## Summary
Jarrod Watts 的 **Context Engineering** 实操指南。核心观点："AI slop 是用户的错，不是模型的错"——目标是找到最小高信号 token 集。Claude Code 200k 窗口实际可用约 120k。基础工作流占80%效果：明确目标、Plan mode、消除歧义、多次审查。进阶策略：MCP 实现 **Just in Time Context**（推荐 exa.ai/context7/grep.app）；**Librarian SubAgent** 用 Sonnet 做研究返回简洁摘要给 Opus 主 Agent，节省上下文和成本；Skills 按需引入专业知识。关键原则：陷入 slop 时立即 /rewind 或 /new，不要在污染的上下文中挣扎。

## Key Concepts
- **Context Engineering** — 优化提供给 LLM 的信息集，最大化输出质量
- **Value Dense Context** — 每个 token 都应有助于 LLM 回答下一个请求
- **Just in Time Context** — Agent 在需要时自行通过工具查找信息的策略
- **Librarian SubAgent** — 用便宜模型做研究、返回简洁摘要的子 Agent 模式
- **Context Window Management** — /compact、/rewind、/new 等上下文管理手段
- **Slop Avoidance** — 识别并及时退出低质量输出循环

## Detailed Content

### 上下文窗口分配
200k 总量 → 22.5% 保留 + 10.2% 系统提示 + MCP/rules → 实际约 120k 可用

### 三层策略
1. **基础**（80%效果）：明确目标 + Plan mode + 消除歧义
2. **MCP**：Just-in-Time 获取文档和代码
3. **SubAgent**：独立窗口 + 便宜模型做研究 → 摘要返回主 Agent

### 关键引用
> "Good vibe coding is about optimizing for value-dense context."

## Related Topics
- **Context Management**
- **SubAgent**
- **Agent Skills**
- **Claude Code**
- **Progressive Disclosure**
- **MCP Integration**
