---
title: "Harness Engineering：7层架构让AI Agent不再崩溃"
description: "'The most successful builders of the next decade won't be the ones who write the best code. They'll be the ones who engineer the best harnesses.'"
---

## Summary

若石（ltbase.dev）的Harness Engineering完整指南，宝玉(@dotey)推荐。核心论点：AI Agent失败的根因是系统设计而非模型能力——"不是马不行，是缰绳没拴好"。从Prompt Engineering→Context Engineering→Harness Engineering的三代演进，Harness增加了多步执行控制层。四大原则：约束而非指令、外置状态、每步可验证、局部失败。7层架构从Cognition到Constraints覆盖完整执行系统。三个反直觉陷阱：上下文焦虑（>70%时模型跳步骤）、自评骗局、记忆整理周期。最小可行版本4个组件，一个下午可落地。

## Key Concepts

- **Harness Engineering** — 系统设计约束层，解决AI Agent多步自主执行的意外，第三代AI工程范式
- **7层Harness架构** — Cognition/Tools/Contracts/Orchestration/Memory-State/Evaluation/Constraints
- **状态外置** — state.json跟踪所有子任务状态，中途崩了可恢复，不让模型在上下文里憋着
- **Context Reset** — 上下文超70%时存盘→清空→重启干净实例，解决"上下文焦虑症"
- **Sprint Contract** — Generator+独立Evaluator模式，Evaluator用干净上下文+实际执行验证
- **幂等性** — 失败步骤可独立重试，不污染整体状态，不导致重复操作
- **最小可行Harness** — state.json + retry wrapper + schema validator + tool截断，一天落地

## Tags

harness-engineering, agent-design, state-management, evaluation, context-reset, idempotency, 7-layer-stack

## Detailed Content

### 三代范式演进

| 时代 | 关注点 | 局限 |
|------|--------|------|
| Prompt Engineering | 怎么问 | 脆弱，零持久化 |
| Context Engineering | 喂什么料（RAG） | 无状态，无法控制执行流 |
| **Harness Engineering** | **系统设计约束** | **解决多步自主执行的意外** |

Harness不替代前两者，它添加了执行控制层。

### 四大设计原则

**1. 约束，不要指令（Constrain, Don't Instruct）**
- ✗ 在提示词里苦口婆心："请输出合法的JSON格式"
- ✓ 上Schema验证器：非法输出直接回炉重试

**2. 外置状态（Externalize State）**
- 所有中间状态写入 `state.json`，不依赖模型上下文保持
- 中途崩了 → 重启后从 state.json 恢复接着干

**3. 每步可验证（Make Every Step Verifiable）**
- 独立Evaluator不看原始思考过程，只对结果验收
- 必须真正执行：跑编译器、打开页面看UI，不靠想象力评价

**4. 局部失败（Fail Locally, Not Globally）**
- 工具调用失败 → 这一步重试，不拖累整体流程

### 7层Harness架构

```
1. Cognition      — 局部化任务上下文 + 负向约束（职责说明书）
2. Tools          — 排序+去重+token预算截断中间件
3. Contracts      — 严格JSON Schema + 类型边界
4. Orchestration  — DAG/状态机，定义合法步骤转换
5. Memory & State — 工作记忆(当前上下文) + 持久状态(state.json)
6. Evaluation     — 规则检查 + 工具执行 + LLM-as-judge(仅主观)
7. Constraints    — 幂等性保证，失败步骤独立重试
```

### 三个反直觉陷阱

**陷阱1：上下文焦虑症（Context Anxiety）**
- 症状：上下文超70%，模型跳步骤、草草收尾
- 根因：模型"感知到"空间不足，开始走捷径
- 解法：**Context Reset** — 存盘 → 清空上下文 → 重启干净实例继续执行

**陷阱2：自评骗局（Self-Grading Illusion）**
- 症状：模型把稀烂代码夸成"结构清晰、可读性佳"
- 根因：生成者和评价者是同一个模型
- 解法：**Sprint Contract** — Generator生成，独立Evaluator（干净上下文）真实执行验证

**陷阱3：记忆整理周期（Memory Consolidation Cycle）**
- 症状：长期运行日志凌乱，新旧信息打架，浪费token
- 解法：定期压缩整理，案例：32K token → 7K，零关键信息损失

### 最小可行Harness（Day 1）

从第7层倒着搭，一个下午可落地：

```python
# 1. state.json — 任务状态持久化
state = load_state("state.json")

# 2. Retry wrapper — 指数退避
@retry(max_attempts=3, backoff=exponential)
def call_tool(name, args): ...

# 3. Schema validator — 非法输出触发重试
output = model.generate(...)
validate_schema(output, schema=EXPECTED_SCHEMA)

# 4. Tool output truncation — 硬性token预算
truncated = truncate_to_token_budget(tool_result, max_tokens=3000)
```

### 核心结论

> "The most successful builders of the next decade won't be the ones who write the best code. They'll be the ones who engineer the best harnesses."

Agent失败率高的根本原因：没有约束层（任模型自发失败），没有状态管理（崩了重来），没有独立验证（自评骗局），没有局部恢复（一人出错全家连坐）。

## Related Topics

- **我是怎么运作的：内观一个自进化Agent的Harness（yoyo）** — yoyo的Harness实践（CI门控+不可变文件+修复循环）
- **为什么你的'AI优先'战略可能是错的：CREAO的Harness工程实践** — CREAO的Harness工程（六阶段CI/三Pass AI审查）
- **Anthropic: Effective Harnesses for Long-Running Agents** — Anthropic官方Harness设计
- **AI Native Human：认知暴力重装——三次基因突变** — AI Native视角下Harness的必要性
