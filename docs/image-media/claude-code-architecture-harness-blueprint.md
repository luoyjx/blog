---
title: "Claude Code架构拆解：Agent Harness的四层蓝图"
description: "Claude Code架构拆解：Agent Harness的四层蓝图"
---

## Summary

Rohit通过分析Claude Code开源代码（55目录/331模块）发现：业界常说三层框架（Model Weights/Context/Harness），Claude Code揭示了关键的第四层——Infrastructure（多租户、RBAC、资源隔离、状态持久化）。核心设计：Agent循环用async generator而非while loop（5大优势），五阶段循环每个阶段有具体错误恢复路径，工具按并发行为分类（只读并行/写入串行），流式工具执行器在模型生成中就开始执行（隐藏2-5秒延迟），系统提示按缓存边界结构化（降低90%缓存成本），CLAUDE.md四级层次。

## Key Concepts

- **四层架构** — Model Weights / Context / Harness / Infrastructure，第四层是产品存活的关键
- **Async Generator** — async function*替代while loop，提供流式/可取消/可组合/背压/循环内错误恢复
- **流式工具执行** — StreamingToolExecutor在模型生成中就执行工具，隐藏2-5秒延迟
- **Prompt缓存结构** — SYSTEM_PROMPT_DYNAMIC_BOUNDARY分隔稳定区和动态区，降低80%重复tokenize成本
- **工具结果预算** — 超大输出持久化到磁盘，模型收到路径+预览，防止context被垃圾填满
- **CLAUDE.md层级** — Enterprise MDM / Project / User / Session四级，高级别覆盖低级别
- **Infrastructure层** — 多租户、RBAC、资源隔离、分布式协调，被大多数Agent框架忽略

## Tags

harness-engineering, claude-code, agent-architecture, async-generator, tool-execution, prompt-caching, infrastructure

## Detailed Content

### 四层框架

| 层级 | 内容 | 谁关注 |
|------|------|--------|
| Model Weights | 冻结的智能，API调用 | 所有人 |
| Context | 提示词、对话历史、RAG | 大多数人 |
| Harness | 工具、循环、错误处理 | 一些人 |
| **Infrastructure** | **多租户、RBAC、资源隔离、状态持久化** | **Claude Code** |

**SWE-agent数据**：相同模型相同任务，仅改interface设计 → SWE-bench性能提升64%。

### Async Generator vs While Loop

**While loop的5个生产问题**：

1. 无流式：用户看空白屏等待10-30秒
2. 无取消：Ctrl+C需要额外机制
3. 无可组合性：REPL/子Agent/测试各自实现
4. 无背压：长session内存无限增长
5. **无循环内错误恢复**（最严重）

**Generator的对应优势**：
- Yield StreamEvent随token实时输出
- 调用者停止.next()，finally自动清理
- 一个query()函数，三个调用者，零重复
- 消费者停止pull时生产者暂停
- 每个阶段有具体错误恢复路径

### 五阶段循环详解

```
Phase 1: Setup          → 工具结果预算 + compaction策略 + token验证
Phase 2: Model Call     → 依赖注入接口 + 10类错误重试 + 流式工具开始执行
Phase 3: Error Recovery → prompt-too-long/max_tokens/context overflow各有具体恢复
Phase 4: Tool Exec      → 未流式执行的工具 + Haiku异步生成摘要
Phase 5: Continue?      → stop_reason + maxTurns + hooks + abort检查
```

**关键**：错误恢复在循环内，不是在外层try-catch。每个阶段是一等状态。

### 工具并发分类

```
只读工具 (Glob/Grep/Read/WebFetch) → 最多10个并行
写入工具 (Bash写/Edit/Write)       → 串行执行
```

**StreamingToolExecutor**：模型生成中就开始执行。三个工具调用时，第一个工具边模型生成边运行。并行批次中某工具失败 → siblingAbortController杀掉兄弟进程，父控制器存活。

### Prompt缓存架构

```
[稳定区: 约80%]          ← API全局prompt cache命中
SYSTEM_PROMPT_DYNAMIC_BOUNDARY
[动态区]
├── Memoized sections    ← 每session计算一次
└── Volatile sections    ← 每轮重算（尽量最小化）
```

**用户上下文（git status/CLAUDE.md/日期）注入为第一条user message**：放system prompt会每轮失效缓存。放user message保持系统提示稳定。

**成本影响**：设计为缓存高效的提示词：$0.02/session vs. 不设计：$0.20/session（10倍差距）。

### 工具结果预算

```
tool_result.size > maxResultSizeChars
    → 持久化到磁盘
    → 模型收到：文件路径 + 前N字符预览
    
每次API调用前：applyToolResultBudget() 约束总token数
```

### CLAUDE.md四级层次

```
Enterprise MDM → 组织级强制政策
Project CLAUDE.md → 项目约定
User ~/.claude/CLAUDE.md → 个人偏好
Session → 临时覆盖
```

支持`@include`组合，高级别覆盖低级别。

## Related Topics

- **Harness Engineering：7层架构让AI Agent不再崩溃** — 4原则7层Harness完整指南（与Claude Code架构互补）
- **我是怎么运作的：内观一个自进化Agent的Harness（yoyo）** — yoyo的CI门控+修复循环（Harness实践案例）
- **为什么你的'AI优先'战略可能是错的：CREAO的Harness工程实践** — CREAO的六阶段CI+三Pass AI审查（Infrastructure层实践）
- **Resolvers：Agent系统的智能路由表** — Resolver模式（Claude Code Skill描述即Resolver）
