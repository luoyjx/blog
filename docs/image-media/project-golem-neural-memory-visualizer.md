---
title: "Project Golem - 向量数据库 3D 可视化工具"
description: "Project Golem - 向量数据库 3D 可视化工具"
---

## Summary
Project Golem 是一个开源工具，将高维向量（768维）通过 **UMAP** 降维投影到交互式 3D "大脑皮层"中，实现向量数据库的实时查询和语义关系探索。技术栈包括 embedding-gemma-300m 生成嵌入、**UMAP** 降维、**LanceDB** + NumPy 存储、Three.js + WebGL 前端渲染和 Flask 后端。用户输入查询即可看到对应的"神经通路"激活。该工具支持将数据源替换为 PDF、Obsidian 笔记库或自定义文档集合。

## Key Concepts
- **Vector Database** - 高维向量存储与检索
- **UMAP** - 768D 到 3D 的降维算法
- **Embeddings** - 使用 embedding-gemma-300m 生成语义向量
- **LanceDB** - 向量数据库存储方案
- **Three.js** - WebGL 3D 渲染引擎

## Detailed Content

### 技术架构
| 组件 | 技术 |
|------|------|
| 嵌入 | embedding-gemma-300m (sentence-transformers) |
| 降维 | **UMAP** (768D -> 3D) |
| 存储 | **LanceDB** + NumPy |
| 前端 | **Three.js** + WebGL |
| 后端 | Flask |

### 使用流程
1. 安装依赖
2. `ingest.py` 从 20 个 Wikipedia 领域采集内容并向量化
3. `GolemServer.py` 启动 Flask 服务
4. 浏览器访问 localhost:8000 交互

### 可定制性
数据源可替换为 PDF、Obsidian 笔记库或自定义文档集合。支持集成 Qdrant 或 Pinecone 等外部 **Vector Database**。

## Related Topics
- **Karpathy LLM Wiki**
- **DeepSeek Engram**
- **RAG**
- **Semantic Search**
