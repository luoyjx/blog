---
title: "Resolvers：Agent系统的智能路由表"
description: "'A resolver is a routing table for context. When task type X appears, load document Y first. That's it. One sentence. But that one sentence is the dif"
---

## Summary

Garry Tan（YC总裁）在Thin Harness Fat Skills框架基础上，深度讲解了最被忽视但最关键的组件——Resolver。Resolver是上下文的路由表："任务类型X出现时，先加载文档Y"。他的CLAUDE.md从20,000行压缩到200行决策树，效果立即变好。审计发现13个Skill中只有3个引用Resolver，其余10个硬编码路径 → 知识库变垃圾抽屉。三种Resolver（Skill路由/Filing路由/内部子路由）构成分形架构。Resolver不维护会腐烂（90天内退化），提出用RLM自动修复。Claude Code的Skill描述字段本身就是Resolver。

## Key Concepts

- **Resolver** — 上下文路由表，决定"任务X出现时先加载文档Y"，分形存在于每一层
- **Context Rot** — Resolver随时间腐烂：新Skill不注册、触发描述过期，90天内退化为历史文档
- **不可见Skill问题** — Skill存在但Resolver不知道 = 比没有更糟（illusion of capability）
- **check resolvable** — Meta-skill：遍历整条链找死链，Garry的系统中15%的Skill不可达
- **分形Resolver** — Resolver存在于每一层（Skill层/Filing层/内部子路由层），相同架构可扩展
- **Filing路由** — RESOLVER.md：内容类型→目录映射，防止信息存错位置导致知识库退化

## Tags

resolvers, agent-routing, context-management, skill-discovery, context-rot, check-resolvable, fractal-architecture

## Detailed Content

### 核心洞察

> "A resolver is a routing table for context. When task type X appears, load document Y first. That's it. One sentence. But that one sentence is the difference between an agent that compounds intelligence and an agent that slowly forgets what it knows."

**20,000行 → 200行**：
- 20,000行：把所有知识塞进context，模型变慢变不准
- 200行决策树：按需加载，不污染上下文
- 效果：立即变好（更快、更准、更少幻觉）

原理：不是通过更多信息让模型更聪明，是通过在正确时机给正确的书。

### 三种Resolver（分形）

| Resolver类型 | 位置 | 映射 |
|-------------|------|------|
| Skill Resolver | AGENTS.md | 任务类型 → Skill文件 |
| Filing Resolver | RESOLVER.md | 内容类型 → 目录 |
| 内部Context Resolver | 每个Skill内部 | 子任务 → 处理路径 |

Claude Code的Skill描述字段 = Skill Resolver（模型自动匹配意图到描述）。

### 审计：只有3/13个Skill用Resolver

现象：10个Skill硬编码了路径，各自有"我应该存哪里"的逻辑。

后果：
- 不报错，不崩溃，错误悄悄发生
- 案例：Manidis的政策分析文章被filed到`sources/`而不是`civic/`
- 25,000个文件后，知识库跨文件关联无法建立，变垃圾抽屉

**修复**：不修复10个Skill（打地鼠），而是：
1. `_brain-filing-rules.md`：共享规则 + 常见错误归档模式
2. 强制规则：每个写入Skill先读RESOLVER.md
3. 结果：零误归档

### 不可见Skill问题

签名追踪系统工程精良，但Resolver无触发器 → 系统无法调用。

**比没有这个能力更糟**：没有能力是诚实的（系统说"我做不到"，你知道要构建它）。不可达能力创造错误的能力幻觉（你以为系统能处理签名，实际不能，直到关键时刻才发现）。

### Resolver Eval

50个样本输入 + 预期输出的测试套件：

```
输入："check my signatures"
预期：executive-assistant (signature section)

输入："is my flight delayed?"
预期：flight-tracker

输入："save this article to brain"
预期：idea-ingest + RESOLVER.md
```

失败模式：
- **假阴性**：Skill应触发但没触发（触发描述有误或缺失）
- **假阳性**：错误Skill触发（两个触发器重叠）

修复：编辑Markdown，不需要改代码。

### check-resolvable

Meta-skill：遍历 AGENTS.md → Skill文件 → 代码，找死链。

首次运行：发现6/40+个不可达Skill（15%）。
- 航班追踪器：无法通过"我的航班"触发
- 内容创意生成器：只能cron触发，无法手动调用
- 引用修复器：在skills目录但完全没有Resolver条目

现在每周运行：Resolver的相当于linter。

### Context Rot

Resolver的衰减时间线：
```
Day 1:  完美——每个Skill注册，每个触发准确
Day 30: 3个新Skill没更新Resolver表
Day 60: 触发描述与用户措辞不匹配（"is my flight on time" vs "check my flight"）
Day 90: Resolver是历史文档，不是当前系统能力
```

**自我修复（实验性）**：RLM观察任务调度 → 周期性重写Resolver。800次调度后系统发现触发模式，自动修正描述。Claude Code的AutoDream（空闲时记忆固结）是这个原理的原始版本。

### Resolver的形态

```
缺失    → Skill各自发明归档逻辑，缓慢退化
存在未测  → 能力消失（医院找不到外科医生）
测试未更新 → 90天内腐烂
测试且自愈 → 系统随使用积累智能
```

**分形的意义**：同样架构在每一层，系统从5个Skill可扩展到50个，从1,000文件到25,000文件。

## Related Topics

- **Claude Code架构拆解：Agent Harness的四层蓝图** — Claude Code架构（Skill描述即Resolver）
- **Hermes Agent万字系统提示词深度解析** — Hermes的Skill索引（与Resolver概念对比）
- **我是怎么运作的：内观一个自进化Agent的Harness（yoyo）** — yoyo的不可变文件（类比Resolver的不变量）
- **Harness Engineering：7层架构让AI Agent不再崩溃** — Harness工程（状态外置与Resolver外置上下文的关系）
