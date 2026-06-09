---
title: "Video Use：Claude Code驱动的开源AI视频编辑"
description: "Video Use：Claude Code驱动的开源AI视频编辑"
---

## Summary

Browser Use开源的 Video Use 项目，让Claude Code直接成为专业视频编辑器。核心功能：录制说话 → 自动剪填充词+调色+字幕+动画效果 → 输出final.mp4。集成Manim（数学动画）和Remotion（React视频），渲染前自我评估质量。100%开源免费，是HyperFrames（HTML-based视频）之外的另一种AI Agent视频编辑路径。

## Key Concepts

- **AI视频编辑** — Claude Code作为视频编辑器，从录制到成片的自动化流程
- **Video Use** — Browser Use出品的开源视频技能，github.com/browser-use/video-use
- **填充词剪辑** — 自动检测和剪掉"嗯"、"啊"等填充词
- **Manim** — 数学/教学动画库，集成到视频生成流程
- **Remotion** — React-based视频生成框架，集成到视频生成流程

## Tags

video-editing, claude-code, browser-use, open-source, ai-video, manim, remotion, self-evaluation

## Detailed Content

### 完整工作流

```
1. 对着镜头录制（说话）
   ↓
2. 自动剪填充词（嗯/啊/停顿）
   ↓
3. 自动调色
   ↓
4. 添加字幕
   ↓
5. 可选：集成Manim或Remotion动画
   ↓
6. 渲染前自我评估质量
   ↓
7. 输出final.mp4
```

### 与HyperFrames对比

| 维度 | Video Use | HyperFrames |
|------|-----------|-------------|
| 来源 | Browser Use开源 | Bin Liu开源 |
| 输入 | 录制视频（说话）| HTML场景 |
| 核心能力 | 剪辑+字幕+调色 | AI写HTML生成视频 |
| 动画 | Manim + Remotion | CSS/JS动画 |
| 适用场景 | 演讲/教学视频 | Agent自主创建视频 |

两者都是让AI Agent具备视频能力，路径不同：Video Use从录制内容出发，HyperFrames从HTML生成出发。

### 项目信息

- GitHub：github.com/browser-use/video-use
- 出品方：Browser Use（开源自动化工具的知名项目）
- 费用：100%开源免费

## Related Topics

- **HyperFrames：以HTML为基础的AI Agent视频编辑框架** — HyperFrames：另一种HTML-based AI Agent视频编辑路径
- **为什么你的'AI优先'战略可能是错的：CREAO的Harness工程实践** — CREAO的AI优先工程（Agent作为主要构建者）
