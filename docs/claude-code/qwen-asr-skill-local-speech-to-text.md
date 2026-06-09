---
title: "qwen-asr-skill - Claude Code本地语音转文字技能"
description: "qwen-asr-skill - Claude Code本地语音转文字技能"
---

## Summary
qwen-asr-skill 是一个 Claude Code 技能，基于 Qwen3-ASR-1.7B 模型提供本地语音转文字能力。支持 52 种语言和 22 种中文方言，兼容 WAV、MP3、FLAC 等多种音频格式。系统能自动检测硬件并适配 GPU/CPU，使用 silero-vad 进行静音检测和自然断句分块转录，输出结构化 JSON 格式结果。

## Key Concepts
- **ASR (Automatic Speech Recognition)** - 自动语音识别技术
- **Qwen3 ASR** - 阿里通义千问 1.7B 参数语音识别模型
- **VAD (Voice Activity Detection)** - silero-vad 静音检测，自然断句分块
- **Claude Code Skill** - 安装到 `~/.claude/skills/` 的技能扩展
- **Hardware Adaptation** - 自动尝试 GPU (float16)，VRAM 不足回退 CPU (float32)

## Detailed Content

### 核心特性
- **多语言**：52 种语言 + 22 种中文方言
- **格式支持**：WAV / MP3 / FLAC / M4A / OGG 等
- **智能硬件适配**：自动尝试 GPU (float16)，VRAM 不足回退 CPU (float32)
- **长音频处理**：**VAD (Voice Activity Detection)** 静音检测，自然断句分块转录
- **结构化输出**：JSON 格式

### 安装使用
```bash
uv venv --python 3.12
pip install qwen-asr soundfile silero-vad
# 复制到 ~/.claude/skills/asr
python qwen-asr-skill/scripts/transcribe.py <audio_path>
```

参数：`--language` / `--device` / `--model-path` / `--max-chunk-sec`

## Related Topics
- **Agent Skills Framework**
- **Local AI Models**
- **Claude Code**
- **Speech Processing**
