---
title: "少即是多：高效 Agent 构建方法——Skills 优于 agent.md，先干活再封装"
description: "少即是多：高效 Agent 构建方法——Skills 优于 agent.md，先干活再封装"
---

## Summary
@SaitoWu 总结 Ras Mic 播客的 Agent 构建实操方法论。核心：模型已够强，输出质量取决于 Context 和 Harness 而非模型本身。四个关键实践：① 95% 的人不需要 agent.md（浪费 token）；② Skills 用 progressive disclosure 按需加载，远优于全量 context；③ 建 skill 的唯一正确方法是先带 agent 走完 workflow 再封装成功经验；④ 从 1 个主 agent 开始，workflow 跑顺后再自然扩展。

## Key Concepts
- **Progressive Disclosure** — Skills 的核心：名称+描述常驻（几十 token），完整内容按需加载
- **Skills over agent.md** — agent.md 每次塞几千 token；Skills 只在需要时加载
- **Workflow First Skill Creation** — 先一起干活→成功→封装 SOP→生成有真实上下文的 skill
- **Recursive Skill Building** — 失败→修复→更新 skill→下次不重犯，递归改进
- **Less is More Agent** — 先 1 个主 agent + 少量 skills，workflow 跑顺再扩展

## 核心方法论

### Skills 创建流程
```
1. 带 agent 手把手走完 workflow
2. 出错一起 debug
3. 成功后封装为 skill
4. 失败时递归更新 skill
```

### Anti-patterns（反模式）
- 疯狂塞 agent.md / claude.md（浪费 token）
- 下载别人的 skills（无你的 workflow 上下文，有安全风险）
- 一上来堆 15 个子代理 + 30 个 skills（scale 前先跑顺）

### 正确 Scale 路径
```
1 主 agent + 自己的 skills
→ workflow 跑顺
→ 自然增加子代理（Ras: 5 个就够）
→ 生产力 > "看起来很强"的 setup
```

## Related Topics
- **Anthropic Agent Skills - 为真实世界任务装备AI Agent的技能框架**
- **Anthropic官方完整指南：构建Claude Skills**
- **Context Engineering 实用指南 - 优化 AI 编码的上下文策略**
- **Caveman：极简模式节省 75% Token 的 Claude Code Skill**
- **5个Agent Skill设计模式 - Google ADK**
- **Claude Code Best Practices - 14 Key Practices**
