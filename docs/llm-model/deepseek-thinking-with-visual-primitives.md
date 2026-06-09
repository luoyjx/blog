---
title: "DeepSeek Thinking with Visual Primitives：边指边想的多模态推理范式"
description: "DeepSeek Thinking with Visual Primitives：边指边想的多模态推理范式"
---

## Summary

DeepSeek 在 2026-05-01 开源新多模态范式 **Thinking with Visual Primitives**。核心命题：当前 MLLM 的瓶颈不是"看不清"（Perception Gap，已被高分辨率裁剪/动态分块解决），而是"指不准"（**Reference Gap**）——自然语言描述空间位置时丢失精确锚点。解法：把**边界框 box 和点 point** 提升为与语言 token 同级的"最小思考单元"，让模型**边推理边指**。基于 DeepSeek-V4-Flash（284B/13B MoE）+ 自研 DeepSeek-ViT，仅用约 90 个视觉 KV 条目就达到 7 项基准 77.2% 的均分（Token 数仅 GPT-5.4 的 1/8）；在拓扑推理（迷宫/路径追踪）上断层领先，66.9% / 56.7% vs 次高 50.6% / 46.5%。

## Key Concepts

- **指代鸿沟** (Reference Gap) — 语言空间连续模糊，视觉空间精确离散；语言锚定丢失导致推理与图像实体脱节，引发级联幻觉
- **视觉基元** (Visual Primitives) — bounding box 与 point 作为推理 token，与语言 token 交错出现在 CoT 中
- **边指边想** (Point While It Reasons) — 区别于"说完再指"，推理过程中实时输出空间锚点
- **Compressed Sparse Attention** (CSA) — KV Cache 层的视觉 token 三级压缩：14×14 patch → 3×3 → CSA
- **五阶段后训练** — Pretraining → Specialized SFT (Box/Point 双专家) → Specialized RL (GRPO) → Unified RFT → On-Policy Distillation
- **拓扑推理盲区** — 所有前沿模型在迷宫导航/路径追踪上接近随机；视觉基元打破此盲区
- **感知 vs 指代鸿沟** — Perception Gap（看不清）已解决；Reference Gap（指不准）才是真瓶颈

## Tags

deepseek, multimodal-llm, visual-primitives, reference-gap, spatial-reasoning, maze-navigation, path-tracing, moe, grpo, kv-cache-compression

## Detailed Content

### 问题诊断的认知升级

| 鸿沟 | 表现 | 解决方案 | 状态 |
|------|------|---------|------|
| Perception Gap（感知鸿沟）| 看不清细节 | 高分辨率裁剪、动态分块 | 已解决 |
| **Reference Gap（指代鸿沟）** | 看清了但描述不准、推理脱节 | 视觉基元（box/point）锚定 | 本论文解决 |

### 为什么"边指边想"有效

**类比人类**：数密集物体或走迷宫时，本能地用手指指向目标——**把抽象语义概念锚定到物理坐标**，降低工作记忆负担。

**模型实现**：
```
推理步骤 N: 让我看左边第二个红球
推理步骤 N+1: <|ref|>左边第二个红球<|/ref|><|box|>x1,y1,x2,y2<|/box|>
推理步骤 N+2: 这个红球的下方是...
```

每个语言 mention 必须配空间锚点，从源头消除"语义漂移"。

### 架构压缩链（756×756 输入示例）

```
571,536 像素
   ↓ 14×14 Patch Embedding
2,916 patch token
   ↓ 3×3 压缩
324 token 送入 LLM
   ↓ Compressed Sparse Attention (CSA)
81 个视觉 KV 条目（最终保留）
```

**Token 效率对比**：
- DeepSeek：~90 视觉 KV / ~361 总 token
- GPT-5.4：~740
- Claude-Sonnet-4.6：~870
- Gemini-3-Flash：~1100

### 五阶段训练范式（先训专家，再合并）

```
Pretraining (数万亿多模态 token)
        ↓
Specialized SFT（双专家分流）
   ├── FTwG (Fine-Tuning with Grounding/Box)
   └── FTwP (Fine-Tuning with Points)
        ↓
Specialized RL（GRPO + 三重 RM）
   每个专家用 Format/Quality/Accuracy RM 独立强化
        ↓
Unified RFT（拒绝采样合并）
   两位专家生成数据 → 训练统一模型
        ↓
On-Policy Distillation（反向 KL 蒸馏）
   弥合专家与统一模型的性能差距
```

**关键设计**：分专家 SFT/RL 避免 box 与 point 模态冲突，最后再融合。

### 四类冷启动数据的精细化设计

| 任务 | 数据来源 | CoT 关键 |
|------|---------|----------|
| 计数 | 真实场景 + GQA 场景图 | 粗粒度（一次框出所有候选）vs 细粒度（属性约束逐个验证）|
| 空间推理 / VQA | GQA + CLEVR | 多跳推理每步必须 `<\|ref\|>...<\|/ref\|><\|box\|>...<\|/box\|>` 锚定 |
| 迷宫导航 | DFS/Prim/Kruskal 算法生成（含不可解迷宫）| `<\|point\|>**x,y**<\|/point\|>` 记录探索-回溯 |
| 路径追踪 | 缠绕贝塞尔曲线 | 自适应密度采样：直线稀疏，交叉/弯曲密集 |

### Reward Model 设计的精细度

| 任务 | RM 核心 |
|------|--------|
| 计数 | 相对误差指数衰减：R = α · exp(-β · 相对误差)|
| 空间推理 / VQA | LLM-based GRM 双评分（CoT + 最终答案）|
| 迷宫导航 | 四维加权：探索进度（截断到首次撞墙）+ 完整度 + 撞墙惩罚 + 路径有效性 |
| 路径追踪 | 双向轨迹对齐 + 端点精度 + 连续性惩罚（禁跳点）|

### 性能数据要点

| 任务 | DeepSeek | 次高 | 优势 |
|------|----------|------|------|
| Pixmo-Count | **89.2%** | &lt; | 全面领先 |
| DS_Spatial_Reasoning | **98.7%** | Claude 97.2% / Qwen3-VL 96.8% | 小幅领先 |
| DS_Maze_Navigation | **66.9%** | 50.6% | **断层式领先** |
| DS_Path_Tracing | **56.7%** | 46.5% | **断层式领先** |

### 可解释性副产物

视觉基元不仅是推理工具，**外化为可视化的"注意力轨迹"**——人类可沿坐标还原模型心路：何时分支、何时发现死胡同、何时回溯。**纯语言 CoT 无法提供这种可解释性**。

### 应用启示

- 计数类业务（库存、人群、物体清点）：可期待显著质量提升
- 拓扑/几何任务（电路、地图、流程图分析）：从不能做到能做
- 多步空间推理（机器人规划、AR 引导）：闭合"语义到物理"的鸿沟
- 可解释 AI：视觉基元天然形成可审计的推理记录

## Related Topics

- **Anthropic：AI Agent 有效上下文工程** — 上下文工程的 token 预算视角
- **多语言LLM：在英语表示空间做关键决策** — 跨模态/跨语言的内部表示研究
- **Anthropic：为 Agent 编写高效工具（用 Agent 优化工具）** — 工具与基元的设计哲学
- **Hermes Agent万字系统提示词深度解析** — Agent 系统提示中的视觉指令设计
