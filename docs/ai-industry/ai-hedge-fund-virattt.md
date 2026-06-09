---
title: "AI Hedge Fund - 多Agent模拟对冲基金（教育用途）"
description: "AI Hedge Fund - 多Agent模拟对冲基金（教育用途）"
---

## Summary

virattt 开源的 AI 对冲基金 PoC 项目，用 19 个 AI Agent 模拟对冲基金的投资决策流程。13 个投资大师风格 Agent（Buffett/Munger/Graham/Burry 等）+ 4 个分析 Agent（估值/情绪/基本面/技术）+ 风险管理 + 投资组合管理 Agent 协作运作。支持 CLI 和 Web 界面，支持 OpenAI/Claude/DeepSeek/Ollama 多种 LLM。仅供教育用途，不执行实际交易。

## Key Concepts

- **多智能体系统** — 19个 Agent 协作的完整 multi-agent 实现案例
- **对冲基金** — 模拟真实对冲基金的投资决策流程
- **价值投资** — Graham/Buffett/Munger 等大师风格的 Agent 实现
- **Agent协作** — 调度-子智能体模式的实际金融应用
- **风险管理** — Risk Manager Agent 计算指标、设置仓位限制
- **回测** — 内置 backtester 验证策略历史表现

## Tags

ai-agent, multi-agent, finance, hedge-fund, trading, python, open-source, backtesting

## Detailed Content

### 架构设计（19个Agent）

**投资大师 Agent（13个）**：Damodaran（估值）、Graham（价值）、Ackman（激进）、Wood（成长）、Munger（品质）、Burry（逆向）、Pabrai（低风险翻倍）、Taleb（尾部风险）、Lynch（十倍股）、Fisher（成长研究）、Jhunjhunwala（印度视角）、Druckenmiller（宏观）、Buffett（优质价值）

**分析 Agent（4个）**：估值（内在价值）、情绪（市场情绪）、基本面（财务数据）、技术（技术指标）

**管理 Agent（2个）**：Risk Manager（风险控制）、Portfolio Manager（最终决策）

### 运行方式
```bash
# CLI 分析
poetry run python src/main.py --ticker AAPL,MSFT,NVDA

# 回测
poetry run python src/backtester.py --ticker AAPL,MSFT,NVDA

# 本地 LLM
poetry run python src/main.py --ticker AAPL --ollama
```

### 技术栈
- Python + Poetry
- 支持 LLM：OpenAI / Anthropic Claude / Groq / DeepSeek / Ollama
- 数据源：Financial Datasets API

## Related Topics

- **Anthropic官方：多智能体协作5种主流模式怎么选、怎么用（宝玉译）** — 对应"调度-子智能体"模式的实际应用
- **All Agentic Architectures - 17种AI Agent架构完整实现** — 17种 Agent 架构，本项目是多 Agent 协作的典型案例
- **双城记：代码 Harness 演进到金融 Harness——Agent 进入价值世界的边界重建** — 金融 Harness 与代码 Harness 的对比
- **你不知道的 Agent：原理、架构与工程实践** — Agent 架构与工程实践
