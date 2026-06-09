---
title: "OpenBee 实战部署踩坑与 Claude Code Skill 惊艳表现"
description: "OpenBee 实战部署踩坑与 Claude Code Skill 惊艳表现"
---

## Summary

作者 tengyz 记录了使用 **OpenBee** 部署国产大模型（**GLM**、**MiniMax**、**Kimi**）过程中遇到的五个典型问题，包括模型拒绝简单输入、响应命名不一致、任务异常终止、不稳定的 **Tool Calling** 以及工具幻觉问题。这些问题反映了国产大模型在实际部署中的成熟度挑战。与此同时，作者发现 **Claude Code Skill** 功能表现惊艳，仅用十分钟就生成了一个自定义 skill 来自动化带验证码的浏览器登录，解决了困扰两天的难题。

## Key Concepts

- **OpenBee** — 国产大模型部署平台/工具
- **Claude Code Skill** — Claude Code 的自定义技能系统，支持快速生成自动化流程
- **Tool Calling** — LLM 调用外部工具的能力
- **Tool Hallucination** — 模型幻觉性地调用不存在的工具
- **Browser Automation** — 基于浏览器的自动化操作，如自动登录

## Detailed Content

### OpenBee 部署五大坑

1. **模型拒绝简单输入** — 部分国产大模型对如 "hello" 等简单输入拒绝响应
2. **响应命名约定不一致** — 模型返回的字段命名不规范或不一致
3. **不明原因的任务终止** — 任务在没有明确错误的情况下异常中断
4. **不稳定的 **Tool Calling**** — 工具调用成功率不稳定
5. ****Tool Hallucination**** — 模型幻觉性地调用实际不存在的工具

这些问题共同反映了国产大模型在 **AI Agent** 场景中的可靠性不足。

### Claude Code Skill 的突破

**Claude Code Skill** 系统展示了强大的自动化能力。作者通过该功能在约十分钟内生成了一个处理 **Browser Automation** 带验证码登录的自定义 skill，体现了 **Claude Code** 在实际开发效率上的显著优势。

## Related Topics

- **Claude Code**
- **AI Agent**
- **国产大模型**
- **Tool Calling**
- **Browser Automation**
- **OpenBee**
