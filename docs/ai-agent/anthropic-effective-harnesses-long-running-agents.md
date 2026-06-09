---
title: "Anthropic: Effective Harnesses for Long-Running Agents"
description: "Anthropic: Effective Harnesses for Long-Running Agents"
---

## Summary
Anthropic 工程师 Justin Young 探讨了 AI Agent 在多个上下文窗口之间保持一致进度的核心挑战。文章揭示了两大失败模式：过度野心（Agent 一次尝试完成全部工作导致上下文耗尽）和过早完成（后续 Agent 实例误判项目已完成）。提出了 Initializer Agent + Coding Agent 的两部分架构，通过功能列表、增量进度和会话初始化协议来确保跨会话的连贯开发。该方法的本质类似于"工程师轮班交接"问题的系统化解决方案。

## Key Concepts
- **Over ambition**：Agent 试图一次完成整个应用，上下文耗尽留下半成品
- **Premature Completion**：后续 Agent 误判项目已完成而过早停止
- **Initializer Agent**：首个会话建立基础环境和全面功能列表
- **Coding Agent**：后续会话专注增量功能开发
- **Feature List**：JSON 结构的需求文件，跟踪功能通过/失败状态
- **Incremental Progress**：每个会话处理一个功能，配合 git 提交和进度摘要
- **Session Continuity**：跨会话保持进度连贯的机制

## Detailed Content

### 两大失败模式

****Over ambition****：Agent 试图一次完成整个应用，在实现中途耗尽上下文窗口，留下未文档化的半成品功能。

****Premature Completion****：后续 Agent 实例观察到已有进展后，在未实现所有必要功能的情况下宣布项目完成。

### 两部分架构

****Initializer Agent****（首次会话）：
- 建立 `init.sh` 脚本运行开发服务器
- 创建 `claude-progress.txt` 记录 Agent 活动
- 初始 git 提交显示新增文件
- 全面的功能列表（示例中 claude.ai 克隆有 200+ 功能）

****Coding Agent****（后续会话）：
- 专注增量进度
- 保持可合并到主分支的干净代码状态

### 环境管理策略

****Feature List****：JSON 结构的需求文件，跟踪功能通过/失败状态，防止 Agent 删除或修改测试。

****Incremental Progress****：每个会话处理一个功能，配合 git 提交和进度摘要，使 Agent 能回滚失败的更改。

**测试策略**：明确提示使用浏览器自动化工具（Puppeteer MCP）确保端到端验证。

### 会话初始化协议
1. 检查工作目录
2. 读取进度文件和 git 日志
3. 查看功能列表确定下一优先级
4. 运行基本端到端测试
5. 开始增量功能开发

### 未来展望
专门的多 Agent 架构（测试 Agent、QA Agent、清理 Agent）可能优于单一通用 Agent，且原则可扩展到科学研究和金融建模场景。

## Related Topics
- **Harness Design for Long Running Application Development**
- **Multi Agent Architecture**
- **Context Management**
- **Git Based Workflow**
- **Test Driven Development**
