---
title: "GPT-5.6 + Claude Jupiter 同时曝光：模型迭代从大版本发布转向持续部署"
description: "不再满足于发布一个对话框，要的是一个能接管所有数字化生存空间的超级 Agent。"
---

## Summary

48 小时内两家巨头的下一代模型同时被曝光：OpenAI Codex 内部日志中出现 `gpt-5.6` 路由（金丝雀测试，绝大多数仍走 GPT-5.5），同时 `@Leaks Ping` 在 Claude Code 源代码泄露中发现新代号 **claude-jupiter**（"太阳系最大行星"暗号），与此前已曝光的 Sonnet 4.8、Opus 4.7、Mythos、Capybara 同处源码。**核心信号**：硅谷大厂的模型迭代正在从「大版本发布」变成「持续部署」——大版本间隔在压缩，金丝雀测试与内部代号在加速流转。Anthropic 模型矩阵比外界认知更深（Opus/Sonnet/Haiku 三条线并行多版本迭代），Jupiter 据传将于 5 月 6 日「Code with Claude」开发者大会亮相。**对开发者的含义**：今天基于 GPT-5.5 或 Opus 4.6 的架构决策，可能两个月后就要面对下一代模型的能力跃迁。

## Key Concepts

- **金丝雀测试** — 用极小比例真实流量打到新版本，观察稳定性，不对外公开。谷歌/Anthropic/OpenAI 都用过
- **Claude Jupiter** — Anthropic 内部代号，"太阳系最大行星"线索，可能是 Sonnet 后续型号或新分支，传 5/6 发布
- **持续部署 vs 大版本发布** — 行业从"半年一个里程碑"转向"后台持续金丝雀化迭代"，外部感知滞后
- **源码泄露作为情报源** — Claude Code 源代码、Codex 日志成为模型矩阵的非官方曝光渠道
- **Anthropic 三线模型矩阵** — Opus（高端推理）/ Sonnet（性能成本平衡）/ Haiku（轻量部署），每条线多版本并行
- **Codex 通用桌面 Agent** — Codex 完成从编码工具到通用桌面 Agent 升级，奥特曼推"非编码电脑工作"
- **模型能力天花板持续抬高** — API 接口可能不变但模型能力在持续抬升，架构决策的时间贴现率提高

## Tags

openai, anthropic, gpt-5-6, claude-jupiter, sonnet-4-8, opus-4-7, model-leak, canary-testing, continuous-deployment, codex

## Detailed Content

### 时间线（半年回顾）

| 时间 | 事件 | 间隔变化 |
|------|------|---------|
| GPT-5 → GPT-5.5 | 缩短 | — |
| GPT-5.5 发布几天后 | 后台日志出现 gpt-5.6 | 进一步缩短 |
| Opus 4.6 发布 | — | — |
| Opus 4.6 发布后 | 4.7 + Sonnet 4.8 已在源码 | 几乎并行迭代 |
| 2026-04-30 ± | claude-jupiter 代号被扒 | 全新分支 |

**模式识别**：大版本之间不再是"几个月间隔"，而是"几天内已有下一代"。

### 两个证据源

#### 1. Codex 日志中的 GPT-5.6 路由

```
大量记录: model = "gpt-5.5"
异常一条: model = "gpt-5.6"
```

**判断**：金丝雀测试（受控后端）而非误标——OpenAI 在用真实流量喂养下一代模型。

#### 2. Claude Code 源码泄露的模型矩阵

| 代号 | 推测定位 |
|------|---------|
| Sonnet 4.8 | Sonnet 线下一代 |
| Opus 4.7 | Opus 线下一代 |
| Mythos | 未知（可能是新方向）|
| Capybara | 未知（可能是新方向）|
| **Jupiter** | 全新分支或 Sonnet 级别后续 |

`@Leaks Ping` 的暗号推文："hmm, i wonder what the biggest planet in the solar system is?" → Jupiter

**Jupiter V1 仅为内部使用代号，预计不会出现在任何公开**——所以 Code with Claude 大会上可能用别的产品名。

### 战略观察

#### 为什么节奏在加速

1. **后台已成熟**：金丝雀基础设施成型后，新版本上线成本极低
2. **竞争压力**：两家公司互相参考，节奏被对方拉快
3. **产品不再是模型本身**：Codex 通用桌面 Agent + Claude Code 等产品需要持续模型能力支持
4. **能力跃迁外部不可见**：大量改进发生在小数点后版本中

#### 奥特曼的野心信号

> 不再满足于发布一个对话框，要的是一个能接管所有数字化生存空间的超级 Agent。

GPT-5.6 + Codex 通用桌面 Agent 升级 + 总裁 Greg "Codex 适用于所有人，所有电脑任务"——三件事时间相邻，**指向同一个产品方向**。

#### 对开发者的含义

| 旧思维 | 新现实 |
|--------|--------|
| "等下个大版本再升级" | 没有大版本了，只有持续部署 |
| "稳定性优先，慢点跟" | 慢两个月就被对手按住 |
| "API 接口稳定 = 能力稳定" | API 接口稳定 ≠ 能力稳定 |
| "做一次架构决策用一年" | 做架构决策需要假设两个月后能力跃迁 |

### 用户反馈中的信号

- "opus 4.7 太让人失望"——说明 4.7 已发但不及预期
- "降智的 Gemini 和似了似的"——多家厂商都在做"动态模型能力"调度
- "这个是中转站自己升了一个版本吧"——市场对版本号的不信任

这些反馈说明**模型迭代不只是版本号增加**，可能伴随能力曲线的非线性变化（甚至"降智"的反向波动）。

### 5 月 6 日「Code with Claude」前瞻

如果 Jupiter 真在该大会发布：
- 预期定位：Sonnet 4.8 之上、Opus 之下，或全新产品线
- 预期方向：可能强调长任务、Agent 能力、或多模态（DeepSeek Visual Primitives 倒逼）
- 与已有泄露代号（Mythos / Capybara）可能形成新矩阵

## Related Topics

- **Karpathy 2025年度回顾：RLVR、Cursor、Claude Code与Vibe Coding** — Karpathy 对 LLM 一年进展的回顾
- **Anthropic Claude Managed Agents：企业级 AI Agent 云托管服务** — Anthropic Managed Agents（Code with Claude 同源）
- **Claude Code架构拆解：Agent Harness的四层蓝图** — Claude Code 架构（源码泄露的宿主）
- **GPT-4.5 vs Claude Opus 4.6：逆向工程任务基准对比** — GPT-5 vs Claude 基准对比
- **Anthropic 发布 Claude 新宪法 - 从规则到推理的 AI 对齐转变** — Claude 新宪法
- **Dario Amodei访谈：接近指数增长的尽头** — Dario 关于指数增长是否终结的访谈
- **Claude Code Session管理：1M上下文的双刃剑** — Claude Code 1M context（模型能力提升的应用层体现）
