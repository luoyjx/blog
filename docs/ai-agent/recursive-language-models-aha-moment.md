---
title: "Recursive Language Models - 终于让我顿悟的时刻"
description: "'RLM 按选择加载上下文，而非像 ReAct 或 CodeAct 那样被迫加载'"
---

## Summary
AVB 通过从零实现 RLM 并回答100+社区问题后，系统对比了 Direct Generation、RAG、ReAct、CodeAct、CodeAct+Subagents 与 **Recursive Language Model** 六种架构。RLM 的核心创新在于：LLM 在持久化 **REPL Sandbox** 中工作，通过 **Programmatic Exploration** 按需加载上下文而非被迫全量加载，**Recursive Subagents** 的输出作为变量符号返回而非注入上下文，且支持通过 Python 变量构建任意长度输出。这使 RLM 在聚焦注意力、成本控制、**Context Management**、并行化和噪声鲁棒性上全面优于传统方案。

## Key Concepts
- **Recursive Language Model** — 通过 REPL 环境让 LLM 递归调用子 Agent 的脚手架架构
- **REPL Sandbox** — 类似 Jupyter Notebook 的持久化 Python 环境（Deno + pyodide），强制截断输出防止上下文过载
- **Programmatic Exploration** — LLM 像数据科学家一样用代码探索数据，创建变量保存中间结果
- **Recursive Subagents** — `llm_query()` 创建全新 REPL，输出作为变量返回父 Agent，无需加载完整结果
- **CodeAct** — LLM 编写任意代码在沙箱执行的架构，RLM 在此基础上增加了递归和变量返回
- **Context Management** — RLM 按选择加载上下文，而非被迫加载，避免注意力稀释
- **Composable Results** — 子 Agent 结果作为 Python 变量组合，支持任意长输出

## Detailed Content

### 六种架构对比
1. **Direct Generation** — 无验证，易幻觉
2. **RAG** — 仅适用检索，非通用
3. **ReAct** — 需预定义工具，上下文膨胀
4. **CodeAct** — 任意代码但主 Agent 独揽所有工作
5. **CodeAct + Subagents** — 子 Agent 不共享状态，但仍需读取全部输出
6. **RLM** — REPL + 递归子 Agent + 变量返回，全面突破

### RLM 双模式输出
- **编程式**：通过 `FINAL(variable)` 返回 REPL 变量，不受上下文长度限制
- **自回归**：传统 LLM token-by-token 生成，适合摘要等任务

### 核心优势
聚焦注意力、多步推理、噪声鲁棒、可组合结果、任意长输出、KV Cache 命中率高、关注点分离（规划/执行可用不同模型）、并行化

### 关键引用
> "RLM 按选择加载上下文，而非像 ReAct 或 CodeAct 那样被迫加载"

## Related Topics
- **Agent Architecture**
- **SubAgent**
- **Context Engineering**
- **Sandbox Execution**
- **Agent Loop**
- **Progressive Disclosure**
