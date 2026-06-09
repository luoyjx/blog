---
title: "App Store Screenshots Generator Skill"
description: "App Store Screenshots Generator Skill"
---

## Summary
一个为AI编码Agent设计的**Agent Skills**，自动生成生产级App Store截图。通过搭建Next.js项目，生成符合Apple所有分辨率要求的广告风格截图。支持智能问询、多语言、RTL布局和批量导出，可通过`npx skills add`安装到**Claude Code**、Cursor、Windsurf等40+Agent产品中。技术栈为Next.js + TypeScript + Tailwind CSS + html-to-image，遵循营销优先的设计原则。这是**Agent Skills**生态中面向非开发场景（营销）的典型应用。

## Key Concepts
- **Agent Skills** - 可跨40+Agent平台使用的技能生态
- **App Store Optimization** - 符合Apple合规要求的截图生成
- **Automated Screenshot Generation** - AI驱动的批量截图自动化
- **Cross Platform Skills** - 跨Agent平台的技能复用
- **Marketing Automation** - 营销素材自动化生成

## Detailed Content

### 核心功能
- **智能问询**：**Inversion Pattern**的实践，生成前收集应用品牌、功能和视觉偏好
- **Apple合规导出**：生成四种必需显示尺寸（6.9"/6.5"/6.3"/6.1"）的PNG
- **多语言支持**：支持特定地区的截图集和本地化文案
- **RTL布局**：支持阿拉伯语、希伯来语等从右到左语言
- **批量导出**：处理语言 x 设备 x 主题的组合导出矩阵
- **主题预设**：可复用设计Token，测试多种视觉方向

### 安装方式
```bash
npx skills add ParthJadhav/app-store-screenshots
```
支持全局安装、指定Agent安装和手动clone安装。

### 设计原则
- 营销优先：每张幻灯片传达一个价值主张
- 一秒可读性：缩略图尺寸下文案仍可读
- 布局多样性：相邻幻灯片使用不同构图
- 用户驱动美学：无硬编码配色

### 技术栈
Next.js + TypeScript + Tailwind CSS + html-to-image + React

## Related Topics
- **Agent Skills**
- **Inversion Pattern**
- **Cross Platform Skills**
- **Skill Marketplace**
