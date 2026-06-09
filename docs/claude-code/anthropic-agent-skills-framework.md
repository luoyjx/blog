---
title: "Anthropic Agent Skills - 为真实世界任务装备AI Agent的技能框架"
description: "Anthropic Agent Skills - 为真实世界任务装备AI Agent的技能框架"
---

## Summary
Anthropic 官方发布的 Agent Skills 框架，将专业知识打包为可组合资源，让通用 Agent（如 Claude Code）变为领域专用工具。每个 Skill 是一个包含 YAML frontmatter 的 `SKILL.md` 文件目录，采用三层渐进式披露设计：元数据层（启动预加载）、核心层（判断适用时加载）、详细层（按需加载引用文件）。Skills 可包含可执行代码，确定性操作用传统脚本而非 token 生成。

## Key Concepts
- **Agent Skills** - 将专业知识打包为可组合资源的框架
- **Progressive Disclosure** - 三层渐进式信息披露设计
- **SKILL.md** - 带 YAML frontmatter 的技能定义文件
- **Domain Knowledge Packaging** - 类似入职文档的程序性知识捕获
- **Composable Resources** - 可组合的领域专用资源

## Detailed Content

### Skill 架构
每个 Skill 是一个目录，包含带 YAML frontmatter 的 `**SKILL.md**` 文件。

### **Progressive Disclosure** 三层设计
1. **元数据层**：名称和描述在启动时预加载到 system prompt
2. **核心层**：Claude 判断 Skill 适用时加载完整 SKILL.md
3. **详细层**：引用的额外文件（forms.md、reference.md）仅在需要时加载

### 实践示例
PDF 技能实现文档操作：表单填写指令单独存放，仅在相关操作时加载。Skills 可包含可执行代码 -- 确定性操作用传统脚本而非 token 生成。

### 开发最佳实践
- 先评估 Agent 性能识别能力缺口
- 分离互斥上下文以最小化 token 使用
- 精心设计名称和描述（Claude 依赖这些做触发决策）
- 用 Claude 反馈迭代发现实际上下文需求

### 安全考虑
仅安装可信来源的 Skills，审计代码依赖和外部网络连接指令。

### 可用平台
Claude.ai / **Claude Code** / Claude Agent SDK / Developer Platform

## Related Topics
- **Building Effective Agents**
- **Knowledge Work Plugins**
- **Context Management**
- **Agent Design Patterns**
- **MCP Protocol**
