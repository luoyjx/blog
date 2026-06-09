---
title: "Telegram插件多实例冲突问题排查与解决"
description: "Telegram插件多实例冲突问题排查与解决"
---

## Summary
记录了**Claude Code** Telegram插件多实例冲突的排查与解决过程。问题表现为重启后发完一条消息后续无响应，根本原因是全局启用插件导致Cursor的每个项目窗口都启动bot实例，而Telegram Bot API的**Long Polling**机制只允许一个消费者。排查方法论包括检查进程状态、追溯父进程定位来源。解决方案是通过**Configuration Isolation**策略：全局保持启用，在每个Cursor项目中单独禁用，确保只有CLI终端运行唯一实例。

## Key Concepts
- **Long Polling** - Telegram Bot API的getUpdates方法，只允许一个消费者
- **Configuration Isolation** - 全局设置与项目级设置的隔离策略
- **Plugin Architecture** - Claude Code插件在CLI和IDE扩展中共享配置的特性
- **Process Management** - 僵尸进程和孤儿进程的识别与清理
- **Debugging Methodology** - 系统化的多实例问题排查方法

## Detailed Content

### 问题现象
**Claude Code**的Telegram插件每次重启后，发完一条消息后续消息就没反应。

### 排查过程
1. **检查进程状态**：`ps aux | grep telegram` 发现7个bot进程同时运行
2. **追溯父进程**：`ps -o ppid=` 定位到Cursor编辑器的extension-host进程（5个）、孤儿进程（1个）和当前终端CLI（1个正常实例）

### 根本原因
Telegram Bot API使用**Long Polling**的`getUpdates`方法，只允许一个消费者。多实例竞争时：
- 只有一个能成功轮询，其他收到409 Conflict
- 消息被随机路由到不同实例
- 大多数实例的MCP连接已断开，消息丢失

**核心原因**：`~/.claude/settings.json`中全局启用了Telegram插件，**Plugin Architecture**使得Cursor的Claude Code扩展在每个项目窗口都启动一个bot实例。

### 解决方案

**临时修复**：`pkill -f "telegram/0.0.4"` 清理僵尸进程后`/reload-plugins`

**永久修复**（**Configuration Isolation**策略）：
- 全局保持启用插件
- 在每个Cursor项目的`.claude/settings.json`中显式禁用
- 修改后需重启Cursor窗口生效

**注意**：项目级`enabledPlugins`无法覆盖全局设置中的`false`，因此"全局禁用+项目启用"方案不可行。

### 经验总结
1. 遇到间歇性无响应，先用`ps aux | grep`检查多实例
2. 用`ps -o ppid=`追溯父进程定位来源
3. Telegram Bot API的单消费者限制是关键约束
4. **Claude Code**插件在CLI和IDE扩展中共享配置，需注意**Configuration Isolation**

## Related Topics
- **Claude Code**
- **MCP Protocol**
- **Cursor IDE**
- **Plugin Architecture**
