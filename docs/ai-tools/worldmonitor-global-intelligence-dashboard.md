---
title: "World Monitor实时全球情报仪表盘"
description: "World Monitor实时全球情报仪表盘"
---

## Summary
World Monitor是由Elie Habib开发的AI驱动实时全球情报仪表盘，聚合435+策划新闻源覆盖15个类别，提供双地图系统（3D地球仪+WebGL平面可视化）及45个数据层。系统集成Ollama实现本地AI处理无需外部API，支持国家情报指数（12维信号综合风险评分）和金融雷达（92个证券交易所）。技术栈涵盖Vanilla TypeScript、Tauri 2桌面应用、Protocol Buffers API和Vercel Edge Functions部署，支持21种语言和多变体架构（world/tech/finance/commodity/happy）。

## Key Concepts
- **Intelligence Dashboard** - 统一态势感知界面
- **News Aggregation** - AI驱动的多源新闻聚合
- **Geopolitical Monitoring** - 地缘政治信号追踪与关联
- **3D Visualization** - globe.gl + Three.js 3D地球仪可视化
- **Ollama** - 本地AI模型推理引擎

## Detailed Content

### 核心功能

- **435+策划新闻源**：AI综合15个类别的**News Aggregation**
- **双地图系统**：3D地球仪（globe.gl）+ WebGL平面可视化（deck.gl），45个数据层
- **信号关联**：追踪军事、经济、灾害和升级指标，实现**Geopolitical Monitoring**
- **国家情报指数**：12维信号的综合风险评分
- **金融雷达**：覆盖92个证券交易所、大宗商品、加密货币
- ****Ollama**集成**：本地AI处理，无需API密钥
- **多变体架构**：world / tech / finance / commodity / happy
- **桌面应用**：Tauri 2（macOS / Windows / Linux）
- **21种语言**：原生源 + RTL文字支持

### 技术栈

| 类别 | 技术 |
|------|------|
| 前端 | Vanilla TypeScript, Vite, globe.gl + Three.js, deck.gl |
| 桌面 | Tauri 2 (Rust) + Node.js sidecar |
| AI/ML | **Ollama** / Groq / OpenRouter, Transformers.js |
| API | Protocol Buffers (92 protos, 22 services) |
| 部署 | Vercel Edge Functions (60+), Railway, PWA |
| 缓存 | Redis (Upstash), 3层缓存, CDN |

### 数据源

65+外部数据提供商，覆盖地缘政治、金融、能源、气候、航空、网络安全、军事、基础设施和情报新闻。

## Related Topics
- **Geopolitical Analysis**
- **Data Visualization**
- **2026 China Government Work Report**
- **Real time Monitoring**
