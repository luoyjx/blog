---
title: "OpenClaw-RPA：AI 录制→编译为确定性 Playwright 脚本，回放零 Token"
description: "OpenClaw-RPA：AI 录制→编译为确定性 Playwright 脚本，回放零 Token"
---

## Summary
"RPA 编译器"：AI 驱动真实浏览器录制工作流，编译为纯 Playwright Python 脚本。回放时零 Token 消耗、无幻觉风险（确定性执行）。支持浏览器操作、HTTP API、Excel/Word 自动化、Cookie 注入登录。可作为 OpenClaw 生态 Skill 使用。

## Key Concepts
- **RPA Compiler** — AI 录制工作流→编译为确定性 Python 脚本
- **Zero Token Replay** — 录制用 AI，回放纯脚本，不消耗 LLM Token
- **Playwright Automation** — 编译目标为 Playwright Python 脚本
- **OpenClaw Ecosystem** — 可作为 OpenClaw Agent 的 Skill

## Architecture
```
AI 驱动录制（消耗 Token）
    ↓ 编译
纯 Playwright Python 脚本
    ↓ 回放
确定性执行（零 Token，无幻觉）
```

## Capabilities
| 功能 | 说明 |
|------|------|
| 浏览器操作 | Playwright 录制回放 |
| HTTP API | API 调用自动化 |
| Excel/Word | 办公文档处理 |
| 自动登录 | Cookie 注入 |

## Related Topics
- **OpenClaw Agent System Prompt 架构详解（9层）**
- **PinchTab AI Agent浏览器自动化工具**
- **AutoCLI v0.3：Chrome 扩展精准爬虫 + AI 适配器生成**
