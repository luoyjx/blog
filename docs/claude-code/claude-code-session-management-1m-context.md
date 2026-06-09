---
title: "Claude Code Session管理：1M上下文的双刃剑"
description: "Claude Code Session管理：1M上下文的双刃剑"
---

## Summary

Thariq（Claude Code团队）梳理了1M token上下文下的Session管理最佳实践。1M窗口让长任务更可靠，但也让context污染风险更大——Context Rot约在300-400K tokens开始出现。核心操作：五个分叉点（Continue/Rewind/Clear/Compact/Subagents）各有适用场景。最重要的习惯：Rewind（不要在失败上叠加修正，直接回滚重试）。坏compact的根因：模型在最不智能的时刻（context rot严重时）自动压缩。Subagents是上下文管理工具，判断标准：我还需要中间输出，还是只需要结论？

## Key Concepts

- **Context Rot** — 上下文增长导致性能退化；1M上下文中约300-400K tokens时出现（任务依赖）
- **Rewind** — Esc Esc回滚到任意之前消息，删除之后的上下文；最重要的单一好习惯
- **Compact vs Clear** — /compact让模型总结（有损，省力）vs /clear自己写摘要重开（有控制，费力）
- **Subagent上下文** — Subagent有独立全新上下文窗口，只返回结论，不污染父上下文
- **Compaction时机** — 主动触发/compact（指定方向）好于等待autocompact（模型最不智能时）
- **Session边界** — 通用规则：新任务=新session；相关任务可判断权衡

## Tags

claude-code, session-management, context-window, compaction, subagents, rewind, context-rot, 1m-context

## Detailed Content

### Context Rot临界点

| 上下文量 | 状态 |
|---------|------|
| &lt;300K tokens | 通常没有明显退化 |
| 300-400K tokens | Context Rot开始出现（任务依赖）|
| 接近1M | 必须compaction才能继续 |

### 五个分叉点

每次Claude完成任务后的决策：

```
刚完成一个任务后
├── Continue → 同session继续（相关后续任务）
├── /rewind → 回滚到之前消息重试（方向不对时）
├── /clear → 新session+自己写的摘要（开始全新任务）
├── /compact → 模型总结+继续（长session减重）
└── Subagents → 委托给独立上下文的子Agent（大量中间输出）
```

### Rewind的核心价值

**❌ 错误习惯**：在失败上叠加指令
```
Claude: [尝试方法A，失败]
You: "那不行，试试X"
→ 失败的工具调用和错误路径留在上下文，污染后续推理
```

**✓ 正确习惯**：Rewind回到分叉前重试
```
[Esc Esc 回到文件读取后]
You: "不要用方法A，foo模块不暴露那个——直接用B"
→ 上下文干净，只有有用信息
```

进阶用法："summarize from here" → Claude生成交接摘要 → Rewind后用摘要重新prompt。

### Compact vs Clear选择

| 维度 | /compact | /clear |
|------|----------|--------|
| 工作量 | 低（模型处理）| 高（你自己写）|
| 控制力 | 低（信任模型判断）| 高（你决定什么重要）|
| 可引导 | 可（带指令）| 完全控制 |
| 适用 | 长session但没精力总结 | 关键任务需要精准上下文 |

引导compact：`/compact focus on the auth refactor, drop the test debugging`

### 坏Compact的根因

**时机问题**：autocompact在Context Rot最严重时触发 = 模型最不智能时做总结决策。

结果：调试session中偶然提及的"bar.ts警告"可能被丢掉，下一条消息"修复那个警告"时Claude不知道你在说什么。

**修复**：1M上下文提供了更多缓冲时间，主动`/compact [方向]`比等autocompact更可靠。

### Subagents：上下文管理工具

判断是否用Subagent的关键问题：**我还需要这些中间输出，还是只需要最终结论？**

只需要结论 → 用Subagent，保护父上下文。
需要中间过程 → 在父session中执行。

典型Subagent场景：
- 验证工作结果（独立评估）
- 研究外部代码库的实现方式
- 基于git变更写文档

### Session边界规则

**硬规则**：新任务 = 新session

**灰色地带判断**：相关任务（如"给刚实现的功能写文档"）
- 开新session：Claude重新读文件，慢且贵
- 保留session：有Context Rot风险，但省去重读开销
- 判断标准：新任务是否"智能敏感"？文档写作智能要求低，保留上下文的效率增益 > Context Rot影响

## Related Topics

- **Claude Code架构拆解：Agent Harness的四层蓝图** — Claude Code架构（compaction在agent loop中的位置）
- **Harness Engineering：7层架构让AI Agent不再崩溃** — Harness Engineering（Context Reset与Compact的关联）
- **我是怎么运作的：内观一个自进化Agent的Harness（yoyo）** — yoyo的三阶段pipeline（context管理的不同视角）
- **Agent记忆三层架构：chunk/task/skill-recipes 压缩与召回策略** — 三层压缩架构（与compact/subagent的记忆管理类比）
