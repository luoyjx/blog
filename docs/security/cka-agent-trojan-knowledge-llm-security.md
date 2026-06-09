---
title: "CKA-Agent: 关联知识攻击 - LLM安全护栏绕过研究"
description: "CKA-Agent: 关联知识攻击 - LLM安全护栏绕过研究"
---

## Summary
Georgia Tech/UIUC/清华等机构的 LLM 安全研究。**Correlated Knowledge Attack** 通过自适应树搜索将有害请求分解为多个无害子查询，对 GPT-5.2/Gemini-3.0-Pro/Claude-Haiku-4.5 达 96-99% **LLM Jailbreak** 成功率。比前方法提升15-21个百分点，上下文感知防御仅造成2-19%性能下降。已 **Responsible Disclosure**。

## Key Concepts
- **Correlated Knowledge Attack** — 利用知识关联将有害请求分解为无害子查询
- **LLM Jailbreak** — 绕过 LLM 安全护栏的攻击方法
- **Safety Guardrails** — 商业 LLM 的安全防护机制
- **Adaptive Tree Search** — 在 LLM 内部知识图谱上的自适应搜索

## Related Topics
- **Prompt Injection**
- **AI Safety**
- **OWASP LLM Top 10**
- **AI/ML安全渗透测试路线图**
