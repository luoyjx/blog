---
title: "多平台数据抓取与收藏导出：无Token方法集"
description: "多平台数据抓取与收藏导出：无Token方法集"
---

## Summary

逸尘（@gengdaJ）整理的两套互补方案：（1）无需API Token的多平台内容抓取（X/微信/小红书/即刻/抖音）；（2）三平台书签/收藏数据导出（微信收藏+聊天记录、X书签、小红书收藏夹）。核心原则：数据自由、无Token、免费优先。

## Key Concepts

- **nitter** — X的开源前端，将推文转为静态页面，配合xcrawl使用
- **xcrawl** — 通用爬取工具，支持X、即刻等平台
- **Headless Chromium抓取** — 拦截aweme/detail等内部API响应（抖音）
- **window.INITIAL_STATE解析** — 小红书笔记通过JS全局变量提取数据
- **微信数据导出** — GitHub工具导出收藏/朋友圈/聊天记录

## Tags

web-scraping, data-freedom, no-token, nitter, xcrawl, wechat, xiaohongshu, tiktok

## Detailed Content

### 内容抓取方法表

| 平台 | 方法 | 工具 | 难度 |
|------|------|------|------|
| X (Twitter) | nitter转静态页 + xcrawl | nitter + xcrawl | 低 |
| 微信公众号 | URL编码 + 第三方API端点 | 第三方API | 低 |
| 小红书笔记 | meta标签 + window.INITIAL_STATE | HTML解析 | 中 |
| 即刻文章 | xcrawl获取互动数据 | xcrawl | 低 |
| 抖音视频 | 拦截aweme/detail API | Headless Chromium | 高 |

### 书签/收藏导出

| 平台 | 数据范围 | 来源 |
|------|---------|------|
| 微信 | 收藏、朋友圈、聊天记录 | GitHub专用工具 |
| X/Twitter | 书签 | Claude Skills仓库 |
| 小红书 | 收藏夹 | Claude Skills仓库 |

### nitter的作用

nitter将X的动态渲染页面转为静态HTML，使xcrawl等工具可以直接解析，无需认证token。

## Related Topics

- **微信公众号爬取研究：四大方案对比与 Mitmproxy 实践** — 微信公众号爬取专项研究
- **wechat-agent-channel - 微信接入AI编码助手的消息桥接** — 微信Agent通道
- **Anthropic Knowledge Work Plugins - 11个领域专家插件** — 知识工作插件
