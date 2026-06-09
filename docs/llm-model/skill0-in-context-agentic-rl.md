---
title: "SKILL-0：无梯度更新的 In-Context Agentic RL 技能内化"
description: "SKILL-0：无梯度更新的 In-Context Agentic RL 技能内化"
---

## Summary
LongCat 团队论文，In-Context Agentic RL for Skill Internalization。无需权重更新，通过上下文内 RL 信号让 Agent 习得新技能。结合自动技能发现（Automated Skill Discovery）。探索 Agent 自主学习的新范式。

## Key Concepts
- **In Context RL** — 在上下文窗口内进行强化学习，不更新权重
- **Skill Internalization** — 将技能内化为 In-Context 能力，非外部工具
- **Agentic RL** — Agent 在环境中交互获取奖励的 RL 设置
- **Automated Skill Discovery** — 自动发现有用技能的机制

## Key Distinction
| 方法 | 权重更新 | 技能习得方式 |
|------|---------|------------|
| 传统 RL | 需要 | 梯度更新 |
| SKILL-0 | 不需要 | In-Context RL |

## Related Topics
- **Self-Improving Agent跨会话持续自我改进**
- **OSGym：1024 并行 OS 沙箱训练 Computer Use Agents**
- **大型多模态推理模型综述（arXiv 2505.04921）**
