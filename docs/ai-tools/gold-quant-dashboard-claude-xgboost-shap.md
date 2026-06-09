---
title: "黄金量化仪表盘：Claude + XGBoost + SHAP的OPC实践"
description: "'模型是工具，因子是思考，产品是答案'"
---

## Summary

vivienna.btc用Claude Opus 4.6 + Luffa构建黄金量化分析仪表盘：15个原始因子经IC分析精简为8个，多时间框架XGBoost集成（10d/20d/40d），SHAP提供可解释性，Next.js/Vercel做Web端，Luffa Super Box做移动分发。体现OPC（一人公司）方法论：AI让一人完成团队任务。核心哲学："模型是工具，因子是思考，产品是答案。"

## Key Concepts

- **量化因子工程** — IC分析+相关性测试从15因子精简到8因子
- **XGBoost多时间框架** — 10d/20d/40d三个时间框架的集成模型
- **SHAP可解释性** — 使量化黑盒模型可解释，增强决策信任
- **Luffa分发** — Luffa Super Box用于移动端App分发
- **OPC量化实践** — 一人用AI工具完成传统上需要团队的量化工作

## Tags

quant-trading, gold, claude-opus, xgboost, shap, opc, fintech, luffa

## Detailed Content

### 技术架构

```
数据 → 因子工程（15→8因子，IC+相关性）
       ↓
XGBoost集成（10d + 20d + 40d）
       ↓
SHAP解释层
       ↓
Next.js仪表盘（Vercel） + Luffa移动分发
```

### 核心哲学

> "模型是工具，因子是思考，产品是答案"

三层分离：
- 模型（XGBoost）→ 计算工具
- 因子（8个精选）→ 领域思考的凝结
- 产品（仪表盘）→ 可用的答案

### OPC意义

"AI不会替代判断力，但让一个人能完成团队才能完成的事" — 量化领域的OPC典型案例。

## Related Topics

- **AI Hedge Fund - 多Agent模拟对冲基金（教育用途）** — AI对冲基金项目
- **把自己当成一家公司来经营：个人商业画布** — OPC框架
- **Anthropic官方：揭秘AI Agent评测 - 从设计到实施的完整指南** — 模型评估方法
