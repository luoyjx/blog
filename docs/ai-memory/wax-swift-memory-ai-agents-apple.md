---
title: "Wax - Swift原生AI Agent高性能本地记忆引擎"
description: "Wax - Swift原生AI Agent高性能本地记忆引擎"
---

## Summary
Wax 是一个面向 Apple 平台的 AI Agent 持久化记忆引擎，采用 Swift 原生开发。它将文档、嵌入和结构化知识打包到单个可移植的 `.wax` 文件中，无需 Docker 或独立数据库服务。核心采用 BM25 文本索引与 Metal 加速 HNSW 向量搜索的混合搜索架构，在 M3 Max 上实现 P95 延迟约 6.1ms 的高性能表现。支持通过 MCP Server、CLI 和 Swift Package Manager 多种方式集成。

## Key Concepts
- **Hybrid Search** - BM25 文本索引（SQLite FTS5）+ Metal 加速 HNSW 向量搜索
- **Memory Engine** - AI Agent 的持久化记忆层
- **MCP Server** - 兼容 Claude Code 和其他 MCP Agent 的集成方式
- **Single File Design** - 一个 `.wax` 文件包含所有数据和索引
- **Local First AI** - "用户数据属于用户设备"理念

## Detailed Content

### 架构设计
Wax 采用单文件设计理念，将所有数据结构封装在一个 `.wax` 文件中。文件格式包含双头页（A/B）原子崩溃恢复、WAL 写前日志、LZ4 压缩数据帧，以及嵌入的 **SQLite FTS5** 和 **Metal HNSW** 索引。

### 性能表现
在 M3 Max 芯片上的基准测试显示：
- 混合搜索 P95 延迟：~6.1ms
- 冷启动时间：9.2ms
- 摄入吞吐量：85.9 文档/秒

### 集成方式
- ****MCP Server****：兼容 Claude Code 和其他 MCP Agent
- **CLI**：`wax-cli` 守护进程，JSON-line 命令
- **Swift Package Manager**：v0.1.8+
- **WaxRepo**：语义 Git 历史搜索

## Related Topics
- **AI Agent Memory**
- **Vector Database**
- **Apple Silicon Optimization**
- **MCP Protocol**
- **Local First Architecture**
