---
slug: what-is-deno
title: Deno 是什么?
tags: [deno , nodejs]
---

### 十个 Node.js 的设计错误

Node.js 最初设计者 Ryan Dahl 2018 年在 JS Conf Berlin 的分享

#### 沒有坚持使用 Promise
- 在 2009 年六月在 Node 中开始引入 JavaScript 的 Promises，但又在 2010年二月就移除掉了。

	结果，随着日子久远，Node 里面就遍布着 async/await 和 promise 的不同 async API 设计，直至现时都极难整合
#### 看轻了安全性（Security）
<!--truncate-->
- JavaScript Engine V8 本身有很好的 sandbox 架构，但是有时候 Node.js 本身没有好好善用到，例如有可以直接读取 Memory 的 例子、或者 linter 可以直接使用网络功能等的漏洞。

#### 没有从 GYP 建构系统转到 GN
- Node.js 用到的 JavaScript Engine V8 一开始是使用 GYP 来建构的，Node 理所当然也跟随；后来 V8 转用了 GN (Generate Ninja)，只剩下Node 成为唯一的用家。 GN 比用 Python 写的 GYP 快近起码 20倍，对于使用者来说，简直是天渊之别。

	Ryan 更这样说：

	继续使用 GYP 该是Node 核心的最大失误。

	The continued usage of GYP is the probably largest failure of Node core.

#### 继续使用 GYP，没有提供 FFI
- 继续用 GYP 引伸到另一个难题，就是怎样去提供跨程式语言的接口。

	现在Node 只提供了由 C++ 到 V8 的 binding 指南，事实上对开发者来说是严重不足的。很多人建议过转用 Foreign Function Interface (FFI)的模式，但都一一被当时的 Ryan 漠视了。

#### package.json （以及依赖了 npm）
- npm 的 Issac 发明了 package.json，Ryan 认为把 Node 能在 main program 中 用 require() 读取 npm 的 package.json 是一个坏的开始。

	后来，演化至 Node 中包含 npm 作为标准，以致现在Node 的 Module 变成了由 npm「中央集权」了。

	事实上，因为 npm 而引起的「灾难性」事件也有不少，其中最有名的应该算是 2016 年发生的 left-pad chaos。

#### 在任何地方也可以 require(“somemodule”)
- 你可以不必在 package.json 中註明 dependency，在Node 中近乎是任何地方也能夠 require local 或者是 remote 的程式碼。

#### package.json 提供了錯誤的「module」觀念
- 你可以不必在 package.json 中注明 dependency，在Node 中近乎是任何地方也能够 require local 或者是 remote 的代码。

	其实现在package.json并没有「公认标准」，里面可以包含很多毫无关系的资讯，例如名称、版本、 License、详细说明等，以致 package.json 这个档案像是杂物房一样。

	例如我们用 URL 导入档案的话，URL 里就以包含了所需的版本资讯，而不应再写在 package.json 里了。

#### 设计了软件界黑洞 node_modules

https://github.com/tj/node-prune

#### require(“module”) 没有逼人用file extension”.js”
- 不知道为什么要这样「简洁」。

	在浏览器中 `<script>` tag 是不能省略「.js」部分的，这令 Node 要多用几次不必要的档案系统查询，才能猜到工程师想要 import 什么文件。

#### index.js
- 由于 index.html 的传统，「很合理」有 index.js 吧？但其实有了 package.json后， index.js 就变得不必要了。

### Deno 的目标

#### Security
- By default a script should run without any network or file system write access.
	Users can opt in to access via flags: ` — allow-net` ` — allow-write`
	Don’t allow arbitrary native functions to be bound into V8.

#### TypeScript compiler built into the executable
- TypeScript is beautiful
	Finally delivered a practical optionally typed language.
	Allows code to grow seamlessly from quick hacks to large, well structured machinery.
	Normal JS should work too.

#### Simplify the module system
- No compatible with Node modules.
	Imports are relative or absolute URLs ONLY.
	Imports must provide an extension.
	Remote URLs fetched and cached indefinitely on the first load.
	Vendoring can be done by specifying a not-default cache dir.

#### Others
- Ship only a single executable with minimal linkage.
	Bootstrap the runtime bye compiling Node modules with parcel into a bundle.
	Always die immediately on unhandled promises.
	Support top-level await.
	Browser compatible (`window` not `global`)

### deno 的使用场景

#### 边缘计算 (Edge Computing)/ Serverless
- [CloudFlare Workers](https://workers.cloudflare.com/)
- [Netlify]([https://netlify.com/](https://www.netlify.com/products/#netlify-edge-functions))
- [Supabase](https://supabase.com/edge-functions)

#### 沙盒服务
- Google Scripts (maybe)

### 参考资料
- http://tinyclouds.org/jsconf2018.pdf
- 10 Things I regret about Node.js: https://www.youtube.com/watch?v=M3BM9TB-8yA
- Should I run my container on AWS Fargate, AWS lambda, or both: https://awscloudfeed.com/whats-new/architecture/should-i-run-my-containers-on-aws-fargate-aws-lambda-or-both
- Google chrome statistics 2022: https://backlinko.com/chrome-users
- Eliminating cold starts with cloudflare workers: https://blog.cloudflare.com/eliminating-cold-starts-with-cloudflare-workers/
- https://deno.com/blog/series-a