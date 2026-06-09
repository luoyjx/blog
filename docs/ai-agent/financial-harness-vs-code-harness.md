---
title: "双城记：代码 Harness 演进到金融 Harness——Agent 进入价值世界的边界重建"
description: "双城记：代码 Harness 演进到金融 Harness——Agent 进入价值世界的边界重建"
---

## Summary
@wquguru 深度文章，核心论点："Coding Agent 即通用 Agent"混淆了能力通用性与约束通用性——能力可迁移，边界必须重建。Agent 权限每升一级（文件→浏览器→钱包），Harness 必须重写。金融世界的四个本质差异：合法≠正确、验证必须前移、静态规则不够、agent spending ≠ human spending。FluxA 作为金融 Harness 早期样本，AEP2 协议用 Mandate 作沙箱实现"Authorize first, settle later"。

## Key Concepts
- **Financial Harness** — 针对价值转移场景重建的 Agent 约束系统
- **Code Harness** — 代码世界的 Agent 约束：权限/工具/恢复/验证分离
- **Mandate Sandbox** — 用户签名授权凭证，含预算/用途/有效期，是 agent 的金融现实边界
- **Intent Alignment** — 金融场景核心挑战：动作合法但不符合用户意图
- **Payment Agent** — 具备钱包/支付权限的 AI Agent
- **Agent Permission Escalation** — 文件→浏览器→支付：每升级一级约束必须重写
- **FluxA** — 金融 Harness 早期样本，AEP2 协议

## 核心对比

### 代码 vs 金融 Harness
| 代码世界 | 金融世界 |
|---------|---------|
| prompt 控制面 | 用户意图授权输入 |
| allow/deny/ask | budget + purpose + validity + scope |
| query loop | spending loop |
| 事后验证 | 结算前验证 |
| memory | mandate state |
| 重试/回退 | 额度不足/过期/scope不匹配→解释→升级 |

### 四个本质差异
1. **合法 ≠ 正确**：金融错误是语义错误，系统知道"能转"但不知"该不该转"
2. **验证必须前移**：代码可"先做再查"，支付结算后无法"再修"
3. **静态规则不足**：真实边界来自用户授权的任务目标，非静态规则
4. **Agent spending ≠ Human spending**：任务驱动、高频、动态生成，非枚举型

## FluxA / AEP2 协议
- **Mandate**：嵌入 HTTP header，用户签名，含预算上限/purpose/有效期/scope
- **x402 支付**（付费 API）：在 mandate 内自动执行
- **payout**（外部转账）：每笔单独用户授权
- **结算**：24小时窗口批量链上结算

## 三个核心构件
1. **Intent First** — 边界来自授权任务目标
2. **Mandate 沙箱** — 超出 mandate 对 agent 不可达
3. **结算前验证回路** — 失败返回可执行反馈（错在规则/语义/边界）

## Related Topics
- **Anthropic: Harness Design for Long-Running Application Development**
- **Anthropic: Effective Harnesses for Long-Running Agents**
- **LLM 是「缸中之脑」：Harness 作为 Agent 身体的隐喻解释**
- **Anthropic Claude Managed Agents：企业级 AI Agent 云托管服务**
- **你不知道的 Agent：原理、架构与工程实践**
- **Systems Engineering：构建可靠 Agentic 软件的工程原则**
