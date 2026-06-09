---
title: "Anthropic官方：揭秘AI Agent评测 - 从设计到实施的完整指南"
description: "Anthropic官方：揭秘AI Agent评测 - 从设计到实施的完整指南"
---

## Summary
Anthropic 官方发布的 AI Agent 评测完整指南，定义了 Eval 的核心概念（Task、Trial、Grader）和度量指标（pass@k 衡量能力探索、pass^k 衡量一致性）。介绍了代码评分、模型评分和人工评分三种评分器类型，以及针对编码、对话、研究和计算机使用四类 Agent 的评测策略。提出"瑞士奶酪模型"的多层质量保证理念，强调早期投资 eval 加速长期开发。

## Key Concepts
- **Eval** - 给 AI 输入，对输出应用评分逻辑衡量成功
- **pass@k** - k 次中至少一次正确的概率（能力探索）
- **pass^k** - k 次全部成功的概率（一致性，面向客户关键）
- **Grader Types** - 代码评分（快速客观）、模型评分（灵活）、人工评分（金标准）
- **Swiss Cheese Model** - 多层质量保证，没有单层能捕获所有问题

## Detailed Content

### 按 Agent 类型的评测策略

#### 编码 Agent
确定性评分：代码能否运行？测试能否通过？**SWE bench** 验证方式。

#### 对话 Agent
结果验证 + 交互质量评估。通常需要"第二个 LLM 模拟用户"压力测试。

#### 研究 Agent
主观质量判断 + 不断变化的基准真相。组合评分：接地性检查、覆盖度检查、LLM 评分连贯性。

#### 计算机使用 Agent
沙箱环境检查界面导航和后端状态变化。

### 实施路线图
1. **起步**：从 20-50 个简单任务开始，来自真实用户失败案例
2. **设计**：评估结果而非步骤序列，"Agent 经常找到设计者未预见的有效路径"
3. **维护**：定期阅读 transcript，监控 eval 饱和

### 关键洞察
- 前沿模型可能超越静态 eval 约束
- 避免"类别不平衡 eval" -- 同时测试正例和反例
- "0% 通过率通常是任务问题而非模型无能"
- 早期投资 eval 加速长期开发

### **Swiss Cheese Model** 瑞士奶酪模型
自动 eval + 生产监控 + A/B 测试 + 用户反馈 + 人工 transcript 审查 + 系统性人类研究

## Related Topics
- **Building Effective Agents**
- **Agent Design Patterns**
- **SWE bench**
- **Quality Assurance**
- **AI Testing**
