---
title: "Anthropic官方完整指南：构建Claude Skills"
description: "Anthropic官方完整指南：构建Claude Skills"
---

## Summary

Anthropic 官方 33 页指南详细阐述了 **Skills** 的设计与构建方法。Skill 是包含指令的文件夹，教 Claude 一致地处理特定任务。核心设计原则包括 **Progressive Disclosure**（三级加载：YAML frontmatter 始终加载约 50-100 tokens、SKILL.md 在相关时加载、链接文件按需加载）、可组合性和可移植性。指南定义了五大设计模式（顺序工作流编排、多 MCP 协调、迭代细化、上下文感知工具选择、领域特定智能）和三层测试体系（手动/脚本/编程测试）。Description 是触发的关键，结构为"做什么 + 何时使用 + 关键能力"。

## Key Concepts

- **Skills** - 包含指令的文件夹，教 Claude 处理特定任务
- **SKILL.md** - Skill 的核心指令文件，必须大小写精确
- **Progressive Disclosure** - 三级加载系统优化 token 消耗
- **YAML Frontmatter** - Skill 的元数据定义，始终加载
- **MCP Enhancement** - 为 MCP 服务器工具提供工作流指导
- **Design Patterns** - 五大 Skill 设计模式

## Detailed Content

### Skill 结构

```
skill-folder/
├── SKILL.md        # 必需 - 核心指令
├── scripts/        # 可选 - 可执行代码
├── references/     # 可选 - 参考文档
└── assets/         # 可选 - 模板和资源
```

### 设计原则

****Progressive Disclosure****：三级加载——**YAML Frontmatter** 始终加载（~50-100 tokens/skill）、**SKILL.md** 在相关时加载、链接文件仅在需要时加载。

**可组合性**：多个 **Skills** 同时工作，每个 Skill 应与其他 Skill 并行运作。

**可移植性**：在 Claude.ai、**Claude Code** 和 API 中无修改即可使用。

### YAML Frontmatter

Description 是触发的关键，结构为：[做什么] + [何时使用] + [关键能力]。名称使用 kebab-case，不含 claude/anthropic。

### 三类常见 Skill

1. **文档和资产创建** — 一致、高质量输出
2. **工作流自动化** — 多步骤流程的一致方法论
3. ****MCP Enhancement**** — 为 MCP 服务器工具提供工作流指导

### 五大设计模式

1. **顺序工作流编排**：显式步骤依赖和验证门控
2. **多 MCP 协调**：跨服务工作流，分阶段数据传递
3. **迭代细化**：质量标准和验证脚本
4. **上下文感知工具选择**：决策树与选择透明度
5. **领域特定智能**：嵌入专业知识与合规检查

### 测试三层级

1. **手动测试** — Claude.ai 中快速迭代
2. **脚本测试** — **Claude Code** 自动化
3. **编程测试** — API 评估套件

测试覆盖：触发测试（正向/负向）、功能测试（输出/错误/边缘）、性能对比（有/无 Skill）。

### 分发与安全限制

个人用户通过 Claude.ai 上传 .zip，组织可部署到工作区。无 XML 尖括号，文件夹名 kebab-case，SKILL.md 大小写精确。

## Related Topics

- **Claude Code**
- **Model Context Protocol**
- **AGENTS.md**
- **Prompt Engineering**
- **SubAgent**
