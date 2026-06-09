---
title: "5个Agent Skill设计模式 - Google ADK"
description: "5个Agent Skill设计模式 - Google ADK"
---

## Summary
Google ADK团队提出了五大Agent Skill设计模式，解决单体提示词在扩展到10+任务时的token浪费问题。核心方案是**Progressive Disclosure**（渐进式披露），通过L1元数据、L2指令、L3资源三层按需加载，将token消耗减少约90%。五大模式包括Tool Wrapper、Generator、Reviewer、Inversion和Pipeline，覆盖从快速领域专业化到严格多步骤工作流的完整场景。ADK支持四种技能实现：Inline、File-Based、External和Skill Factory，其中Skill Factory是能在运行时生成新技能的元技能。

## Key Concepts
- **Progressive Disclosure** - 三层渐进式披露：L1元数据(~100 tokens) -> L2指令(&lt;5000 tokens) -> L3资源(按需)
- **Tool Wrapper Pattern** - 将库/框架文档打包为Agent可访问的技能
- **Generator Pattern** - 基于模板的结构化内容生成
- **Reviewer Pattern** - 评审标准与评估逻辑分离
- **Inversion Pattern** - Agent先采访用户再行动
- **Pipeline Pattern** - 带检查点的严格多步骤工作流
- **Skill Factory** - 运行时生成新技能的元技能
- **ADK** - Google Agent Development Kit

## Detailed Content

### 单体提示词的困境
大多数AI Agent将领域知识直接嵌入系统提示词，当扩展到10+任务时每次LLM调用消耗数千token。**Progressive Disclosure**通过三层按需加载解决此问题，10个技能的Agent每次调用仅需~1,000 tokens而非10,000 tokens。

### 五大设计模式

****Tool Wrapper Pattern****：最易上手，将库文档打包成技能，使Agent成为特定库的即时专家。

****Generator Pattern****：通过模板强制一致性输出，如SEO检查清单技能规定标题50-60字符、元描述150-160字符等。

****Reviewer Pattern****：将评审标准与评估逻辑分离，按严重程度评分。可启动具有不同"性格"的Agent团队进行深度审查。

****Inversion Pattern****：颠覆典型流程，Agent在执行操作前先采访用户，确保输出符合实际需求。

****Pipeline Pattern****：强制多步骤工作流包含检查点和门控，如限制PR行数 -> TDD -> 代码审查 -> 安全审查。

### 四种技能实现模式
1. **Inline Skills** - 直接在Python代码中定义，适合小型稳定规则
2. **File-Based Skills** - 以目录形式存在，含SKILL.md和references/子目录
3. **External Skills** - 来自社区仓库，可跨平台使用（Gemini CLI、Claude Code、Cursor等40+产品）
4. ****Skill Factory**** - Agent在运行时生成新的SKILL.md文件

### 实践建议
- description字段决定Agent何时激活技能，具体描述引导激活
- 在Skill描述中添加反例，路由准确率从53%提升到85%
- 格式规范已"几乎过时"，真正的挑战是"内容设计"

## Related Topics
- **Agent Skills**
- **Skill Marketplace**
- **Meta Skill**
- **Token Optimization**
- **MCP Protocol**
