> 原文：03-advanced-tool-use.md
> 来源：https://www.anthropic.com/engineering/advanced-tool-use

# Claude 开发者平台高级工具使用

发布于 2025 年 11 月 24 日

我们新增了三项 beta 功能，让 Claude 能够动态地发现、学习并执行工具。

AI Agent 的未来是模型能在数百乃至数千个工具之间无缝工作。比如一个 IDE 助手集成 git 操作、文件操作、包管理器、测试框架和部署管线；一个运维协调员同时连接 Slack、GitHub、Google Drive、Jira、公司数据库和数十个 MCP 服务器。

要构建有效 Agent，它们需要在不预先把每个定义都塞进上下文的情况下使用无限工具库。我们之前关于"用 MCP 做代码执行"的文章讨论过：工具结果和定义有时在 Agent 读取请求之前就消耗了 50,000+ token。**Agent 应该按需发现和加载工具**，只保留与当前任务相关的部分。

Agent 还需要从代码中调用工具的能力。使用自然语言工具调用时，每次调用都需要一次完整推理，中间结果不论是否有用都会堆积在上下文中。代码天然适合做编排逻辑（循环、条件、数据变换）。Agent 需要根据任务在代码执行和推理之间灵活选择。

Agent 还需要从示例中学习正确的工具用法，而不仅仅从 schema 定义。JSON Schema 定义了什么是结构上有效的，但无法表达使用模式：什么时候带可选参数、哪些组合合理、API 期望什么约定。

今天我们发布三项功能：

- **工具搜索工具（Tool Search Tool）**：让 Claude 通过搜索访问数千个工具，不消耗上下文窗口
- **程序化工具调用（Programmatic Tool Calling, PTC）**：让 Claude 在代码执行环境中调用工具，降低对模型上下文窗口的影响
- **工具使用示例（Tool Use Examples）**：提供演示如何有效使用某个工具的通用标准

在内部测试中，这些功能让我们做出了过去用传统工具使用模式做不到的东西。例如 **Claude for Excel** 用程序化工具调用读取和修改数千行的电子表格而不耗尽模型上下文窗口。

---

## 工具搜索工具（Tool Search Tool）

### 挑战

MCP 工具定义提供了重要的上下文，但随着接入更多服务器，这些 token 会快速累积。看一个五服务器的设置：

- GitHub：35 个工具（约 26K token）
- Slack：11 个工具（约 21K token）
- Sentry：5 个工具（约 3K token）
- Grafana：5 个工具（约 3K token）
- Splunk：2 个工具（约 2K token）

那是 58 个工具消耗了约 55K token——对话还没开始就消耗了。再加上 Jira（光它就用约 17K token），很快就接近 100K+ token 的开销。Anthropic 内部曾见过工具定义在优化前消耗 134K token。

但 token 成本并不是唯一问题。最常见的失败是**工具选择错误**和**参数错误**——尤其是工具名相似时，比如 `notification-send-user` 和 `notification-send-channel`。

### 解决方案

不在前期加载所有工具定义，**Tool Search Tool 按需发现工具**。Claude 只看到当前任务真正需要的工具。

**传统方法**：
- 所有工具定义前期加载（50+ MCP 工具约 72K token）
- 对话历史和系统提示与剩余空间竞争
- 总上下文消耗：开工前约 77K token

**用 Tool Search Tool**：
- 只加载 Tool Search Tool 本身（约 500 token）
- 工具按需发现（3-5 个相关工具，约 3K token）
- 总上下文消耗：约 8.7K token，保留 95% 的上下文窗口

这是 **token 使用减少 85%**，同时保持对完整工具库的访问能力。在大工具库的 MCP 评估中，内部测试显示准确率显著提升：Opus 4 从 49% 提升到 74%，Opus 4.5 从 79.5% 提升到 88.1%。

### 工作机制

你把所有工具定义提供给 API，但用 `defer_loading: true` 标记可按需发现的工具。被推迟的工具初始不会加载到 Claude 上下文里。Claude 只看到 Tool Search Tool 本身，加上任何 `defer_loading: false` 的工具（你最常用、最关键的工具）。

当 Claude 需要特定能力时，它搜索相关工具。Tool Search Tool 返回匹配工具的引用，引用在 Claude 上下文中展开为完整定义。

例如 Claude 需要与 GitHub 交互时，搜索 "github"，只有 `github.createPullRequest` 和 `github.listIssues` 被加载——而不是来自 Slack、Jira、Google Drive 的其他 50+ 个工具。

**Prompt 缓存说明**：Tool Search Tool 不会破坏 prompt 缓存，因为被推迟的工具完全被排除在初始 prompt 之外。它们只在 Claude 搜索后才被加入上下文，所以系统提示和核心工具定义保持可缓存。

**实现示例**：

```json
{
  "tools": [
    {"type": "tool_search_tool_regex_20251119", "name": "tool_search_tool_regex"},
    {
      "name": "github.createPullRequest",
      "description": "Create a pull request",
      "input_schema": {...},
      "defer_loading": true
    }
  ]
}
```

对于 MCP 服务器，可以推迟加载整个服务器同时保留特定高频工具：

```json
{
  "type": "mcp_toolset",
  "mcp_server_name": "google-drive",
  "default_config": {"defer_loading": true},
  "configs": {
    "search_files": {"defer_loading": false}
  }
}
```

Claude 开发者平台开箱即用提供基于 regex 和 BM25 的搜索工具，你也可以用 embedding 等策略实现自定义搜索工具。

### 何时使用

**适合**：
- 工具定义消耗 >10K token
- 出现工具选择准确率问题
- 构建多服务器 MCP 系统
- 10+ 个工具可用

**不太适合**：
- 小工具库（<10 个工具）
- 每个会话都频繁使用所有工具
- 工具定义紧凑

---

## 程序化工具调用（Programmatic Tool Calling）

### 挑战

随着工作流变复杂，传统工具调用产生两个根本问题：

1. **中间结果污染上下文**：Claude 分析 10MB 日志找错误模式时，整个文件进入上下文，即使 Claude 只需要错误频率摘要。跨多张表抓客户数据时，每条记录都会累积在上下文中，无论是否相关。这些中间结果消耗大量 token 预算，可能把重要信息挤出上下文窗口。

2. **推理开销与人工综合**：每次工具调用都需要一次完整模型推理。收到结果后，Claude 必须"目测"数据提取相关信息、推理各部分如何组合、决定下一步——全部通过自然语言处理。一个五工具流意味着五次推理加上 Claude 解析每个结果、对比数值、综合结论。慢且易错。

### 解决方案

PTC 让 Claude 通过代码而非逐次 API 往返来编排工具。Claude 不再一次请求一个工具，等结果回到上下文，而是写代码调用多个工具、处理它们的输出、控制什么信息真正进入上下文窗口。

Claude 擅长写代码——让它用 Python 表达编排逻辑而非通过自然语言工具调用，能获得更可靠、精确的控制流。循环、条件、数据变换、错误处理在代码中显式存在，而非隐含在 Claude 的推理里。

#### 示例：预算合规检查

业务任务："Q3 出差预算超支的团队成员有哪些？"

可用工具：
- `get_team_members(department)` — 返回团队成员列表
- `get_expenses(user_id, quarter)` — 返回某用户的支出条目
- `get_budget_by_level(level)` — 返回某员工级别的预算上限

**传统方法**：
- 取团队成员 → 20 人
- 对每个人取 Q3 支出 → 20 次工具调用，每次返回 50-100 条目
- 取员工级别预算上限
- 全部进入 Claude 上下文：2000+ 条支出（50KB+）
- Claude 手动对每个人求和、查预算、对比
- 大量模型往返、显著上下文消耗

**用 PTC**：

Claude 写一段 Python 脚本编排整个流程，脚本在 Code Execution 工具（沙箱环境）中运行，需要工具结果时暂停。当你通过 API 返回工具结果时，结果由脚本处理，而非模型消耗。脚本继续执行，Claude 只看到最终输出。

Claude 的编排代码大致这样：

```python
team = await get_team_members("engineering")

levels = list(set(m["level"] for m in team))
budget_results = await asyncio.gather(*[
    get_budget_by_level(level) for level in levels
])
budgets = {level: budget for level, budget in zip(levels, budget_results)}

expenses = await asyncio.gather(*[
    get_expenses(m["id"], "Q3") for m in team
])

exceeded = []
for member, exp in zip(team, expenses):
    budget = budgets[member["level"]]
    total = sum(e["amount"] for e in exp)
    if total > budget["travel_limit"]:
        exceeded.append({
            "name": member["name"],
            "spent": total,
            "limit": budget["travel_limit"]
        })

print(json.dumps(exceeded))
```

Claude 上下文只收到最终结果——超预算的两三个人。2000+ 条目、中间求和、预算查询都不影响 Claude 上下文，把消耗从 200KB 原始支出数据降到 1KB 结果。

**效率收益**：
- **Token 节省**：复杂研究任务平均使用从 43,588 降到 27,297，**减少 37%**
- **延迟降低**：每次 API 往返需要模型推理（数百毫秒到秒级）。Claude 在单个代码块中编排 20+ 工具调用，消除 19+ 次推理
- **准确率提升**：内部知识检索从 25.6% 提升到 28.5%；GIA 基准从 46.5% 到 51.2%

### 工作机制

**1. 把工具标记为可从代码调用**：

```json
{
  "tools": [
    {"type": "code_execution_20250825", "name": "code_execution"},
    {
      "name": "get_team_members",
      "description": "...",
      "input_schema": {...},
      "allowed_callers": ["code_execution_20250825"]
    }
  ]
}
```

API 把这些工具定义转换为 Claude 可调用的 Python 函数。

**2. Claude 写编排代码**，作为 `code_execution` 工具调用提交给你。

**3. 工具执行不进入 Claude 上下文**：当代码调用 `get_expenses()` 时，你收到带有 `caller` 字段的工具请求，结果在代码执行环境而非 Claude 上下文中处理。

**4. 只有最终输出进入上下文**：代码运行完成后，只把 stdout 返回给 Claude。

### 何时使用

**最有用**：
- 处理大数据集但只需要聚合或摘要
- 多步工作流（3+ 个相关工具调用）
- 在 Claude 看到之前过滤、排序或变换工具结果
- 中间数据不应影响 Claude 推理的任务
- 跨大量元素的并行操作（比如检查 50 个端点）

**不太适合**：
- 简单单工具调用
- Claude 应该看到并推理所有中间结果的任务
- 响应小的快速查询

---

## 工具使用示例（Tool Use Examples）

### 挑战

JSON Schema 擅长定义结构（类型、必填字段、枚举值），但无法表达**使用模式**：什么时候带可选参数、哪些组合合理、API 约定是什么。

考虑一个支持工单 API：模式定义了什么有效，但留下关键问题没回答：
- **格式歧义**：`due_date` 应该用 "2024-11-06"、"Nov 6, 2024" 还是 "2024-11-06T00:00:00Z"？
- **ID 约定**：`reporter.id` 是 UUID、"USR-12345" 还是 "12345"？
- **嵌套结构使用**：什么时候 Claude 应该填充 `reporter.contact`？
- **参数关联**：`escalation.level` 与 `escalation.sla_hours` 与 priority 如何关联？

### 解决方案

工具使用示例让你直接在工具定义中提供示例工具调用：

```json
{
  "name": "create_ticket",
  "input_schema": {...},
  "input_examples": [
    {
      "title": "Login page returns 500 error",
      "priority": "critical",
      "labels": ["bug", "authentication", "production"],
      "reporter": {
        "id": "USR-12345",
        "name": "Jane Smith",
        "contact": {"email": "jane@acme.com", "phone": "+1-555-0123"}
      },
      "due_date": "2024-11-06",
      "escalation": {"level": 2, "notify_manager": true, "sla_hours": 4}
    },
    {
      "title": "Add dark mode support",
      "labels": ["feature-request", "ui"],
      "reporter": {"id": "USR-67890", "name": "Alex Chen"}
    },
    {"title": "Update API documentation"}
  ]
}
```

从这三个示例中，Claude 学到：
- **格式约定**：日期用 YYYY-MM-DD，用户 ID 用 USR-XXXXX，标签用 kebab-case
- **嵌套结构模式**：如何构建 reporter 对象及嵌套的 contact 对象
- **可选参数关联**：严重 bug 有完整联系信息+严格 SLA 升级；功能请求有 reporter 但无 contact/escalation；内部任务只有 title

内部测试中，工具使用示例把复杂参数处理的准确率从 **72% 提升到 90%**。

### 何时使用

**最有用**：
- 复杂嵌套结构，有效 JSON 不等于正确用法
- 工具有多个可选参数，包含模式重要
- 有 schema 无法表达的领域专属约定的 API
- 类似工具需要示例区分（如 `create_ticket` vs `create_incident`）

**不太适合**：
- 简单单参数工具，用法显而易见
- URL、email 等 Claude 已经熟悉的标准格式
- 用 JSON Schema 约束更适合处理的验证问题

---

## 最佳实践

### 按瓶颈分层使用

不是每个 Agent 都需要使用全部三个特性。从最大瓶颈开始：

- 工具定义带来的上下文膨胀 → Tool Search Tool
- 大量中间结果污染上下文 → Programmatic Tool Calling
- 参数错误和格式错误的调用 → Tool Use Examples

它们互补：Tool Search Tool 确保找到正确的工具，PTC 确保高效执行，Tool Use Examples 确保正确调用。

### Tool Search Tool 设置

工具搜索基于名称和描述匹配，所以**清晰、描述性强**的定义提升发现准确率：

```
// 好
{"name": "search_customer_orders",
 "description": "Search for customer orders by date range, status, or total amount. Returns order details including items, shipping, and payment info."}

// 差
{"name": "query_db_orders", "description": "Execute order query"}
```

在系统提示中加入指引让 Claude 知道有什么可用：

```
You have access to tools for Slack messaging, Google Drive file management,
Jira ticket tracking, and GitHub repository operations. Use the tool search
to find specific capabilities.
```

保持 3-5 个最常用工具始终加载，其余推迟。

### Programmatic Tool Calling 设置

由于 Claude 写代码解析工具输出，**清晰记录返回格式**很关键：

```
{
  "name": "get_orders",
  "description": "Retrieve orders for a customer.
Returns:
    List of order objects, each containing:
    - id (str): Order identifier
    - total (float): Order total in USD
    - status (str): One of 'pending', 'shipped', 'delivered'
    - items (list): Array of {sku, quantity, price}
    - created_at (str): ISO 8601 timestamp"
}
```

opt-in 的工具最好是：
- 可并行运行（独立操作）
- 重试安全（幂等）

### Tool Use Examples 设置

- 用真实数据（真实城市名、合理价格，不是 "string" 或 "value"）
- 展示从最简到完整的多种规格模式
- 简洁：每个工具 1-5 个示例
- 聚焦于歧义（只为 schema 看不出正确用法的地方加示例）

---

## 开始使用

beta 头部加上 `advanced-tool-use-2025-11-20`：

```python
client.beta.messages.create(
    betas=["advanced-tool-use-2025-11-20"],
    model="claude-sonnet-4-5-20250929",
    max_tokens=4096,
    tools=[
        {"type": "tool_search_tool_regex_20251119", "name": "tool_search_tool_regex"},
        {"type": "code_execution_20250825", "name": "code_execution"},
        # 你的工具，带 defer_loading、allowed_callers、input_examples
    ]
)
```

这些功能让工具使用从简单的函数调用走向智能编排。当 Agent 处理跨数十个工具和大数据集的复杂工作流时，**动态发现、高效执行、可靠调用**成为基础。
