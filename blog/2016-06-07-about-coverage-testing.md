---
slug: about-coverage-testing
title: 关于覆盖率测试的概念
tags: [覆盖率测试 ,mocha ,istanbul ,coveralls]
---

## 测试覆盖率
代码覆盖（Code coverage）是软件测试中的一种度量，描述程式中源代码被测试的比例和程度，所得比例称为代码覆盖率。

## 指标
以下是几个覆盖率指标：
* 函数覆盖率（Function coverage）：调用到程式中的每一个Function吗？
* 行覆盖率（Line coverage)：执行到程序中的每一行了吗？
* 语句覆盖率（Statement coverage）：若用控制流图表示程序，执行到控制流图中的每一个节点了吗？
* 分支覆盖率（Branches coverage）：若用控制流图表示程式，执行到控制流图中的每一条边吗？例如控制结构中所有IF指令都有执行到逻辑运算式成立及不成立的情形吗？
* 条件覆盖率（Condition coverage）：也称为谓词覆盖（predicate coverage），每一个逻辑运算式中的每一个条件（无法再分解的逻辑运算式）是否都有执行到成立及不成立的情形吗？

对指标的偏好可说是见仁见智，比如大名鼎鼎的 coveralls.io 就以行覆盖率（Line coverage) 作为给项目颁发badge的首选指标。
