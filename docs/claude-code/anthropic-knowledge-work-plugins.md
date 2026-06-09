---
title: "Anthropic Knowledge Work Plugins - 11个领域专家插件"
description: "Anthropic Knowledge Work Plugins - 11个领域专家插件"
---

## Summary
Anthropic 官方发布的知识工作插件集，包含 11 个领域专用插件，适用于 Claude Cowork 和 Claude Code。每个插件捆绑 Skills、连接器、斜杠命令和子 Agent，将 Claude 转化为特定角色的领域专家。插件架构采用纯 Markdown + JSON 的文件化设计，无需代码和构建步骤。涵盖生产力、销售、客户支持、产品管理、营销、法务、财务、数据、企业搜索、生物研究等领域。

## Key Concepts
- **Plugin Architecture** - Skills + Commands + Connectors + 文件化设计的四大组件
- **Skills** - 编码领域专长，自动在相关时触发
- **Commands** - 用户显式触发的斜杠命令（如 `/sales:call-prep`）
- **MCP Connector** - 通过 MCP 连接外部工具（Slack, Notion, Jira 等）
- **Progressive Disclosure** - 领域知识按需加载

## Detailed Content

### 11 个可用插件
- **productivity**：任务/日历/工作流管理（Slack, Notion, Asana, Linear, Jira）
- **sales**：客户研究、电话准备、管道审查（HubSpot, Close, Clay）
- **customer-support**：工单分类、草拟回复（Intercom, HubSpot, Guru）
- **product-management**：写 spec、规划路线图（Linear, Figma, Amplitude）
- **marketing**：内容草拟、品牌语调（Canva, Figma, HubSpot, Ahrefs）
- **legal**：合同审查、NDA 分类（Box, Egnyte, Jira）
- **finance**：日记账、对账、财务报表（Snowflake, BigQuery）
- **data**：SQL 查询、统计分析（Snowflake, Databricks, BigQuery）
- **enterprise-search**：跨邮件/聊天/文档统一搜索
- **bio-research**：临床前研究（PubMed, ChEMBL, Benchling）
- **cowork-plugin-management**：创建或定制插件

### 插件架构
```
plugin-name/
├── .claude-plugin/plugin.json   # 清单
├── .mcp.json                    # MCP 工具连接
├── commands/                    # 斜杠命令
└── skills/                      # 领域知识
```

### 定制化路径
替换连接器、添加公司上下文、调整工作流、构建新插件。全部 Markdown + JSON，无代码无构建。

## Related Topics
- **Agent Skills Framework**
- **MCP Protocol**
- **Claude Code**
- **Enterprise AI**
- **Building Effective Agents**
