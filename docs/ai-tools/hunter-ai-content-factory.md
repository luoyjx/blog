---
title: "Hunter AI Content Factory - 多平台热点聚合自动化内容生产系统"
description: "Hunter AI Content Factory - 多平台热点聚合自动化内容生产系统"
---

## Summary
Hunter AI Content Factory 是一个自动化内容生产系统，从 GitHub Trending、Twitter、Reddit、HackerNews 和小红书等多平台聚合热点内容，通过 AI 6-Skill 管道（选题、调研、结构、写作、包装、发布）自动生成可发布文章。系统核心理念是"好文章的 80% 在于选题"，采用 Gemini 2.0 Flash 作为 AI 引擎，ChromaDB 进行语义去重，支持 Hugging Face Spaces 一键部署。

## Key Concepts
- **Content Pipeline** - 选题 -> 调研 -> 结构 -> 写作 -> 包装 -> 发布的 6-Skill 管道
- **Trending Aggregation** - 多平台热点内容聚合
- **Semantic Deduplication** - 基于 ChromaDB 的语义去重
- **AI Content Generation** - 去除 AI 痕迹，确保"观点、经验、可操作"

## Detailed Content

### 数据源
系统聚合五大平台：GitHub Trending / Twitter(X) / Reddit / HackerNews / 小红书

### 五种内容模板
| 模板 | 数据源 | 输出 | 适用人群 |
|------|--------|------|----------|
| github | GitHub Trending | 微信文章 | 技术博主 |
| pain | Twitter + Reddit | 诊断报告 | 产品经理 |
| news | 全部5平台 | 新闻速递 | 科技媒体 |
| xhs | 小红书 | 生活内容 | 生活创作者 |
| auto | 全平台 | 生活技巧 | 全栈创作者 |

### 技术栈
- AI 引擎：**Gemini** 2.0 Flash
- 浏览器自动化：**Playwright**
- 向量库：**ChromaDB**（语义去重）
- 关系库：SQLite
- 分发：PushPlus（微信通知）

### 部署方式
支持 Hugging Face Spaces 一键部署、GitHub Codespaces 和本地 `bash run.sh` 运行。

## Related Topics
- **AI Writing**
- **Content Marketing Automation**
- **Web Scraping**
- **Vector Database**
