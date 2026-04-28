> 原文：05-claude-think-tool.md
> 来源：https://www.anthropic.com/engineering/claude-think-tool

# "think" 工具：让 Claude 在复杂工具使用场景中停下来思考

发布于 2025 年 3 月 20 日

> 一个改善 Claude 复杂问题求解能力的新工具

**扩展思考更新（2025-12-15）**：自首发以来，扩展思考（extended thinking）能力已显著提升，**大多数情况下我们建议使用扩展思考而非专用 think 工具**。扩展思考提供类似的好处——给 Claude 推理复杂问题的空间——但集成更好、性能更佳。详见扩展思考文档。

---

随着 Claude 复杂问题求解能力持续提升，我们发现一种特别有效的方法：**"think" 工具**——为复杂任务中的结构化思考创建专门空间。

这个简单但强大的技术——下文会解释，它**与 Claude 的"扩展思考"能力不同**——大幅改善了 Claude 的 Agent 工具使用能力。包括遵守政策、做出一致决策、处理多步问题，且实现开销极小。

---

## 什么是 "think" 工具？

它给 Claude 一个能力：在得出最终答案前，加入一个带专属空间的额外思考步骤。

听起来与扩展思考相似，但是不同概念：
- **扩展思考**：Claude 开始生成响应**之前**深入考虑并迭代它的计划
- **"think" 工具**：Claude 一旦**开始**生成响应，能加一个步骤停下来思考"我是否有足够信息推进"

这在执行长链工具调用或与用户的长多步对话中特别有用。

**"think" 工具更适合**：Claude 仅凭用户查询无法得出全部回答信息、需要处理外部信息（例如工具调用结果）的场景。"think" 工具下的推理不如扩展思考那样全面，**更聚焦于模型新发现的信息**。

我们建议：
- **简单工具使用场景**（非顺序工具调用、直接指令遵循） → 用扩展思考
- 不需要工具调用的编码、数学、物理用例 → 用扩展思考
- **复杂工具调用、长链中需要仔细分析工具输出、政策密集环境（带详细指南）、顺序决策（每步建立在前步之上、错误代价高）** → 用 "think" 工具

τ-Bench 中的标准工具规格：

```json
{
  "name": "think",
  "description": "Use the tool to think about something. It will not obtain new information or change the database, but just append the thought to the log. Use it when complex reasoning or some cache memory is needed.",
  "input_schema": {
    "type": "object",
    "properties": {
      "thought": {
        "type": "string",
        "description": "A thought to think about."
      }
    },
    "required": ["thought"]
  }
}
```

---

## 在 τ-Bench 上的表现

我们用 τ-bench（tau-bench）评估 "think" 工具——一个全面基准，测试模型在真实客服场景中使用工具的能力。

τ-bench 评估 Claude 能否：
- 与模拟用户进行真实对话
- 一致地遵循复杂客服 Agent 政策指南
- 用各种工具访问和操作环境数据库

主要指标是 **pass^k**：在给定任务上 *k* 次独立试运行**全部成功**的概率，跨所有任务取平均。这与常见的 pass@*k*（*k* 次试运行**至少一次**成功）不同——pass^k 评估**一致性和可靠性**，对客服应用至关重要。

### 性能分析

四种配置对比：
- 基线（无 think 工具，无扩展思考）
- 仅扩展思考
- 仅 think 工具
- think 工具 + 优化提示（针对航空领域）

结果（Claude 3.7 Sonnet）：

**航空领域**：think + 优化提示在 pass^1 上达到 0.570，相对基线 0.370 **相对提升 54%**

**零售领域**：仅 think 工具达到 0.812，相对基线 0.783

| 配置 | k=1 | k=2 | k=3 | k=4 | k=5 |
|------|-----|-----|-----|-----|-----|
| Think + Prompt | 0.584 | 0.444 | 0.384 | 0.356 | 0.340 |
| Think | 0.404 | 0.254 | 0.186 | 0.140 | 0.100 |
| 扩展思考 | 0.412 | 0.290 | 0.232 | 0.192 | 0.160 |
| 基线 | 0.332 | 0.206 | 0.148 | 0.116 | 0.100 |

航空领域最佳表现来自 think + 优化提示——提示中给出分析客户请求时的推理示例：

```
## 使用 think 工具

收到工具结果后、采取任何动作或回应用户前，把 think 工具当作草稿本：
- 列出当前请求适用的具体规则
- 检查是否已收集所有必需信息
- 验证计划动作是否符合所有政策
- 在工具结果上迭代检查正确性

think 工具内部迭代示例：

<think_tool_example_1>
用户想取消航班 ABC123
- 需验证：用户 ID、预订 ID、原因
- 检查取消规则：
  * 是否在预订 24 小时内？
  * 否则检查机票等级和保险
- 验证无段已飞或在过去
- 计划：收集缺失信息，验证规则，获得确认
</think_tool_example_1>

<think_tool_example_2>
用户想订 3 张去 NYC 的票，每人 2 件托运行李
- 需要用户 ID 检查：
  * 会员等级以确定行李额
  * 档案中存在哪些支付方式
- 行李计算：
  * 经济舱 × 3 名乘客
  * 普通会员：每人 1 件免费 → 3 件额外 = $150
  * 银卡：每人 2 件免费 → 0 件额外 = $0
  * 金卡：每人 3 件免费 → 0 件额外 = $0
- 支付规则验证：
  * 最多 1 张旅行券、1 张信用卡、3 张礼品卡
  * 所有支付方式必须在档案中
  * 旅行券余额作废
- 计划：
1. 获取用户 ID
2. 验证会员等级以确定行李费
3. 检查档案中的支付方式及组合是否允许
4. 计算总价：票价 + 行李费
5. 获得明确订票确认
</think_tool_example_2>
```

特别有意思的是不同方法的对比：think + 优化提示**显著优于扩展思考**（扩展思考表现与无提示的 think 工具相似）。仅用 think（无提示）相对基线有改善但低于优化方案。

**think + 优化提示组合表现差距明显**——可能因为基准的航空政策部分高度复杂，模型从"如何思考"的示例中受益最多。

零售领域三种配置对比：

| 配置 | k=1 | k=2 | k=3 | k=4 | k=5 |
|------|-----|-----|-----|-----|-----|
| Think（无提示）| 0.812 | 0.735 | 0.685 | 0.650 | 0.626 |
| 扩展思考 | 0.770 | 0.681 | 0.623 | 0.581 | 0.548 |
| 基线 | 0.783 | 0.695 | 0.643 | 0.607 | 0.583 |

think 工具即使无额外提示也达到最高 pass^1 0.812。零售政策比航空领域显著更易导航，仅有思考空间就能让 Claude 改善。

### 关键洞察

- **困难领域中提示至关重要**：仅让 think 可用可能略有改善，但**搭配优化提示在困难领域带来戏剧性提升**。容易领域可能仅有 think 访问就够了
- **跨试运行的一致性提升**：think 的改善在 pass^k 上一直保持到 k=5，说明工具帮助 Claude 更好处理边缘和异常场景

---

## 在 SWE-Bench 上的表现

类似的 think 工具被加入我们的 SWE-bench 评估设置中，对 Claude 3.7 Sonnet 达到 SOTA 0.623 有贡献。改编版定义：

```json
{
  "name": "think",
  "description": "Use the tool to think about something. It will not obtain new information or make any changes to the repository, but just log the thought. Use it when complex reasoning or brainstorming is needed. For example, if you explore the repo and discover the source of a bug, call this tool to brainstorm several unique ways of fixing the bug, and assess which change(s) are likely to be simplest and most effective. Alternatively, if you receive some test results, call this tool to brainstorm ways to fix the failing tests.",
  "input_schema": {
    "type": "object",
    "properties": {"thought": {"type": "string", "description": "Your thoughts."}},
    "required": ["thought"]
  }
}
```

实验（带 think n=30，不带 n=144）显示包含此工具的孤立效应平均提升 **1.6%**（Welch's t 检验：`t(38.89)=6.71, p<.001, d=1.47`）。

---

## 何时使用 "think" 工具

最受益场景：

- **工具输出分析**：Claude 需要在动作前仔细处理上一次工具调用的输出，可能需要回溯
- **政策密集环境**：Claude 需遵守详细指南并验证合规
- **顺序决策**：每个动作建立在前一动作之上，错误代价高（常见于多步领域）

---

## 实施最佳实践

### 1. 配合领域特定示例做策略性提示

最有效的方法是清晰指示何时及如何使用 think 工具，类似 τ-bench 航空领域的做法。提供针对你具体用例的示例显著提升模型对 think 工具的有效使用：

- 推理过程期望的细节级别
- 如何把复杂指令拆为可执行步骤
- 处理常见场景的决策树
- 如何检查所有必要信息已收集

### 2. 把复杂指引放在系统提示中

我们发现，当指令长且复杂时，把 think 工具的使用指令放在**系统提示**中比放在工具描述里更有效。这种做法提供更广泛上下文，帮助模型把思考过程更好融入整体行为。

---

## 何时**不**用 "think" 工具

它能带来显著提升，但**不适用于所有工具使用场景**，且代价是更长的 prompt 和输出 token。以下场景没有改善：

- **非顺序工具调用**：仅需要单次或多次并行调用完成任务时
- **简单指令遵循**：约束不多、Claude 默认行为已足够时

---

## 开始使用

- **从有挑战的 Agent 工具使用场景测试**：选择 Claude 当前在政策合规或长工具调用链中复杂推理上挣扎的用例
- **加入工具定义**：定制到你的领域。代码极少，但启用更结构化的推理。考虑在系统提示中加入何时及如何使用工具的指令，配合领域相关示例
- **监控并优化**：观察 Claude 实际怎么用，调整提示鼓励更有效的思考模式

最大的好处：**性能上几乎没有下行风险**。除非 Claude 决定用，否则它不改变外部行为，也不干扰现有工具或工作流。
