---
title: "OSGym：1024 并行 OS 沙箱训练 Computer Use Agents"
description: "OSGym：1024 并行 OS 沙箱训练 Computer Use Agents"
---

## Summary
专为训练 Computer Use Agents（GUI 操作 Agent）设计的并行 OS 沙箱基础设施。支持 1024 个并行沙箱，$0.23/天/沙箱，较原方案降低 90% 成本。大规模 RL 训练 Agent 的基础设施。

## Key Concepts
- **Computer Use Agent** — GUI 操作 Agent，通过截图+操作与 OS 交互
- **Parallel Sandboxes** — 1024 并行 OS 环境，大规模训练
- **Agent Training Infrastructure** — Agent RL 训练的基础设施层
- **RL Environment** — 强化学习环境，OS 作为 gym 环境

## Cost Profile
| 指标 | 数值 |
|------|------|
| 并行数 | 1024 沙箱 |
| 成本 | $0.23/天/沙箱 |
| 成本降低 | 90% |

## Related Topics
- **agent-infra/sandbox - AI Agent 一体化沙盒环境**
- **SKILL-0：无梯度更新的 In-Context Agentic RL 技能内化**
- **Scaling Agent Systems - Google/MIT 多Agent扩展量化规律**
