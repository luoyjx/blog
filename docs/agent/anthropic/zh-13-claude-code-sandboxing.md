> 原文：13-claude-code-sandboxing.md

# 超越权限提示：Claude Code 的沙箱机制

来源：https://www.anthropic.com/engineering/claude-code-sandboxing

---

## 概述
Anthropic 为 Claude Code 引入了沙箱（Sandbox）功能，在提升安全性的同时将权限提示减少了 84%。该方案结合文件系统隔离与网络隔离，允许 Claude 在明确划定的边界内获得更高的自主操作权限。

## 核心特性

**文件系统隔离**
Claude 只能访问或修改特定目录，从而防止被入侵的实例篡改 SSH 密钥等敏感系统文件。

**网络隔离**
Claude 仅能通过代理连接到经过审批的服务器，有效阻断被提示注入（Prompt Injection）的实例进行数据外泄或恶意软件下载。

## 两项新沙箱功能

**沙箱化 Bash 工具（Sandboxed Bash Tool）**
目前处于测试版（Beta）阶段的新沙箱运行时，允许开发者定义 Claude 可以访问哪些目录和网络主机。它利用 Linux bubblewrap 和 macOS seatbelt 等操作系统原语，在内核层面强制执行访问限制。

**网页版 Claude Code（Claude Code on the Web）**
这一基于云端的沙箱方案在隔离环境中运行 Claude Code 会话。值得注意的是，"敏感凭据（如 git 凭据或签名密钥）永远不会出现在 Claude Code 的沙箱内。" Git 操作通过自定义代理进行路由，该代理会在连接 GitHub 之前对身份验证和目标分支进行校验。

## 快速上手
用户可以在 Claude 中运行 `/sandbox` 来配置 Bash 工具，或访问 claude.com/code 在线体验 Claude Code。沙箱代码已在 GitHub 上开源，供其他智能体（Agent）开发者使用。
