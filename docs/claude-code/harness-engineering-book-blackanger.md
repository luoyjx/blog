---
title: "驾驭工程：从Claude Code源码到AI编码最佳实践（blackanger著）"
description: "'CC 源码最佳食用姿势：转化为书'"
---

## Summary

AlexZ（@blackanger）基于 Claude Code v2.1.88 公开发布包与 source map 逆向分析，编写了《驾驭工程》（别名《马书》）——一本系统提炼 AI 编码 Agent 架构模式、上下文策略、权限体系和生产实践的中文技术书。全书7篇正文+4附录，在线开源阅读。书的创作本身也是一次 AI 协作工程实践的示范。

## Key Concepts

- **Harness工程** — 驾驭工程，AI Agent 的工程收束层
- **Claude Code** — v2.1.88，分析基础
- **Agent Loop** — 核心执行循环架构
- **上下文管理** — 自动压缩、微压缩、Token 预算、Prompt Cache
- **权限体系** — 权限模式、规则系统、YOLO 分类器、Hooks
- **源码分析** — 基于 source map 的逆向工程分析方法
- **AI编码** — AI Coding Agent 的工程实现与最佳实践

## Tags

harness, claude-code, architecture, source-analysis, book, ai-coding, context-management, permissions

## Detailed Content

### 书籍结构（7篇+4附录）
1. **架构** — 整体架构、Agent Loop、工具执行编排
2. **提示工程** — 系统提示词、工具提示词、模型特定调优
3. **上下文管理** — 自动/微压缩、Token 预算
4. **提示词缓存** — Prompt Cache 策略
5. **安全与权限** — 权限模式、YOLO 分类器、Hooks
6. **高级子系统** — 多 Agent 编排、技能系统、Feature Flags、未发布能力
7. **AI Agent 构建者的经验教训** — 生产实践与局限

### 创作工程方法
> "CC 源码最佳食用姿势：转化为书"

流程：源码 → DESIGN.md 大纲 → 每章 spec（agent-spec）→ plan → 技术写作 skill → AI 写作 → 开源共建

### 在线资源
- 在线阅读：https://zhanghandong.github.io/harness-engineering-from-cc-to-ai-coding/
- 交流：GitHub Discussions

## Related Topics

- **两本Harness工程书：Claude Code设计指南 & Codex对比（wquguru）** — wquguru 的同主题 Harness 书籍
- **Anthropic: Effective Harnesses for Long-Running Agents** — Anthropic 官方 Harness 设计思想
- **8 个 Claude Code Hooks 自动化实践** — Claude Code Hooks 实践
- **Anthropic官方：构建有效AI Agent的设计模式与实践指南** — Agent 工程构建实践
