---
title: "PinchTab AI Agent浏览器自动化工具"
description: "PinchTab AI Agent浏览器自动化工具"
---

## Summary
PinchTab是一个用Go编写的独立HTTP服务器（约15MB单二进制），让AI Agent以Token高效的方式控制Chrome浏览器。每页文本提取约800 tokens，相比截图方式的10,000+ tokens大幅节省。系统采用基于可访问性的元素引用替代脆弱的坐标选择，支持无头/有头Chrome模式、Profile持久化、多实例编排和ARM64优化。通过MCP插件暴露15个浏览器控制工具，默认采用"本地优先"安全策略。

## Key Concepts
- **Browser Automation** - AI Agent控制浏览器的自动化方案
- **Token Efficiency** - 最小化LLM token消耗的优化策略
- **MCP Integration** - Model Context Protocol工具集成
- **Accessibility based Selection** - 基于可访问性树的元素引用方法
- **Profile Persistence** - 浏览器状态跨重启持久化

## Detailed Content

### Token效率优势

**Token Efficiency**是PinchTab的核心差异化：
- 每页文本提取约**800 tokens**，对比截图方式10,000+ tokens
- 基于**Accessibility based Selection**的元素引用，避免脆弱的坐标选择

### 架构

三个核心组件：
- **Server**：主控制面板，管理profiles、实例和路由
- **Bridge**：单实例运行时，由Server生成
- **Profile**：**Profile Persistence**，保持cookie、历史、本地存储

### 部署灵活性

- 无头/有头Chrome模式
- 多实例编排，隔离的浏览器进程
- ARM64优化，支持Raspberry Pi
- 可连接外部Chrome实例

### 安全模型

默认"本地优先"安全策略：绑定`127.0.0.1`，敏感端点默认禁用，IDPI默认仅允许访问本地网站。

### **MCP Integration**

提供SMCP插件，暴露15个浏览器控制工具（导航、快照、点击、填充、文本提取），仅需标准库依赖。

## Related Topics
- **AI Agent Tools**
- **MCP Protocol**
- **Web Scraping**
- **ByteDance DeerFlow**
- **Browser Testing**
