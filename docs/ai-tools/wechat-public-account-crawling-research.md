---
title: "微信公众号爬取研究：四大方案对比与 Mitmproxy 实践"
description: "微信公众号爬取研究：四大方案对比与 Mitmproxy 实践"
---

## Summary
本文对比了微信公众号爬取的四大方案：基于搜狗入口（受限于验证码和数据不全）、网页微信端（已不支持公众号获取）、中间人攻击/Mitmproxy（可获取完整数据但需实体手机）、Hook 微信（需逆向工程能力）。项目最终采用 Mitmproxy 中间人方案，通过在手机微信和服务器间建立 HTTPS 代理拦截流量并注入自动翻页脚本，实现完整的公众号文章数据采集。

## Key Concepts
- **Mitmproxy** - HTTPS 中间人代理工具
- **MITM Attack** - 中间人攻击技术用于数据拦截
- **WeChat Crawling** - 微信公众号数据采集方法
- **Anti Crawling** - 反爬虫对抗技术
- **Web Scraping** - 网页数据抓取技术栈

## Detailed Content

### 四大爬取方案对比

#### 方案一：基于搜狗入口
- 流程：搜狗微信搜索 -> 公众号历史文章列表 -> 解析入库
- 缺点：频繁触发验证码、效率低、无法获取阅读数/点赞数、只能获取最近十条

#### 方案二：网页微信端
- 利用网页版微信的 HTTPS 通信，通过 itchat 等工具实现
- 缺点：新账号无法登入、需手机在线、已不支持公众号获取

#### 方案三：**Mitmproxy** 中间人攻击（推荐方案）
- 核心：在手机微信和服务器间建立 HTTPS 代理
- 使用 **Mitmproxy** 拦截流量并注入自动翻页 JavaScript
- 优势：可获取点赞数、阅读数等完整数据
- 缺点：需实体手机、代理设置工作量大、接口变更风险

#### 方案四：Hook 微信
- 通过逆向工程拦截微信内部调用
- 优点：被动获取、请求量少
- 缺点：需 C 语言和逆向知识、版本适配困难

### Mitmproxy 实现流程

1. 获取公众号 ID 并构造历史文章列表请求
2. 代理拦截响应并注入自动翻页脚本
3. 通过 JavaScript `setTimeout` 实现自动页面跳转
4. 递归爬取所有历史文章和详情页
5. 数据存储到数据库

### 爬虫学习路径

涵盖数据获取、数据解析（正则、**BeautifulSoup**、**XPath**）、数据存储（**MySQL**、**MongoDB**）、**Anti Crawling**、效率优化（多线程、异步、**Scrapy**）及可视化。

## Related Topics
- **Web Scraping Techniques**
- **Proxy and Network Interception**
- **WeChat Ecosystem**
- **Data Pipeline Architecture**
