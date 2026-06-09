---
title: "Claude Agent SDK 技术规范 v1.0.0"
description: "Claude Agent SDK 技术规范 v1.0.0"
---

## Summary
**Claude Agent SDK** 技术规范 v1.0.0（Protocol 2024-11-05），提供编程访问 Claude Code Agentic 能力的完整 API 参考。SDK 支持执行自然语言提示、流式响应、内置工具（Read/Write/Edit/Glob/Grep/Bash/WebFetch/WebSearch/Task/TodoWrite）和 **MCP Protocol** 自定义工具。定义了五种消息类型（System/Assistant/User/Result/Stream Event）、四种权限模式（default/acceptEdits/bypassPermissions/plan）和三种 **Session Management** 状态（Start/Active/Ended）。**MCP Protocol** 支持 stdio、SSE、HTTP 三种通信方式，使用 JSON-RPC 2.0 协议。

## Key Concepts
- **Claude Agent SDK** - Claude Code Agentic 能力的编程接口
- **MCP Protocol** - Model Context Protocol（stdio/SSE/HTTP + JSON-RPC 2.0）
- **Message Protocol** - 五种消息类型（System/Assistant/User/Result/Stream Event）
- **Permission System** - 四种权限模式控制工具使用
- **Session Management** - 三种状态的会话生命周期

## Detailed Content

### 核心概念
- **Query**：单次提示执行（可跨多轮）
- **Turn**：一次请求-响应循环（可含工具使用）
- **Message**：离散通信单元
- **Tool**：可调用能力
- **Session**：持久化对话上下文（UUID）

### CLI 接口
```bash
claude --print --output-format stream-json --verbose [OPTIONS] -- "prompt"
```

### **Message Protocol** 五种类型
| 类型 | 说明 |
|------|------|
| System | 会话初始化（模型、工具、MCP 服务器）|
| Assistant | Claude 响应（文本 + 工具调用）|
| User | 工具结果返回给 Claude |
| Result | 查询完成指示器（成本、使用指标）|
| Stream Event | Token 级更新 |

### **MCP Protocol** 集成
三种通信方式：stdio（本地进程）、SSE（流式）、HTTP（请求-响应），使用 JSON-RPC 2.0 协议。

### **Permission System**
| 模式 | 行为 |
|------|------|
| default | 敏感操作需确认 |
| acceptEdits | 自动批准文件修改 |
| bypassPermissions | 跳过所有检查 |
| plan | 仅规划不执行 |

### 错误处理
`error_max_turns` / `error_max_budget_usd` / `error_during_execution` / JSON-RPC 错误

## Related Topics
- **Nader Dabit Claude Agent SDK Guide**
- **Everything Claude Code**
- **Claude Code**
- **API Design**
