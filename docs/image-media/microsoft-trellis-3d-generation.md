---
title: "Microsoft TRELLIS大规模3D资产生成模型"
description: "Microsoft TRELLIS大规模3D资产生成模型"
---

## Summary
Microsoft TRELLIS是一个大规模3D资产生成模型，接受文本或图像提示生成高质量3D资产。模型使用统一的Structured Latent (SLAT)表示，支持标准Mesh、Radiance Fields和3D Gaussians多种格式输出。模型系列包含从342M到2.0B参数的四个规格，训练数据集TRELLIS-500K包含50万资产。系统要求Linux + NVIDIA GPU (16GB+ VRAM) + CUDA 11.8+。

## Key Concepts
- **3D Generation** - AI驱动的3D资产自动生成
- **Structured Latent Representation** - SLAT统一3D表示格式
- **Text to 3D** - 文本提示生成3D模型
- **Image to 3D** - 图像提示生成3D模型
- **Radiance Fields** - 辐射场3D表示方法

## Detailed Content

### 核心能力

- **高质量输出**：精细几何和纹理细节
- **格式多样**：标准Mesh、**Radiance Fields**、3D Gaussians
- **灵活编辑**：生成变体和局部3D修改

### 模型规格

| 模型 | 参数量 |
|------|--------|
| TRELLIS-image-large | 1.2B |
| TRELLIS-text-xlarge | 2.0B |
| TRELLIS-text-large | 1.1B |
| TRELLIS-text-base | 342M |

### 训练数据

TRELLIS-500K数据集包含50万3D资产，来源包括Objaverse等开放数据集。

### **Structured Latent Representation**

SLAT是TRELLIS的核心创新，提供统一的潜在空间表示，能够解码为多种3D格式（Mesh、**Radiance Fields**、3D Gaussians），实现一次生成多格式输出。

### 系统要求

Linux + NVIDIA GPU (16GB+ VRAM) + CUDA 11.8+

## Related Topics
- **3D Computer Vision**
- **Generative AI**
- **Neural Radiance Fields**
- **3D Gaussian Splatting**
- **AI Art Generation**
