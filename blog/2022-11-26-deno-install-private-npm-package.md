---
slug: deno-install-private-npm-package
title: 如何在 Deno 中引入私有 npm 模块
tags: [deno ,npm, registry]
---

这篇文章我们会来讨论一下如何在 Deno 中引入私有的 npm 模块。如果还不了解 deno 背景的童鞋可以先到官网 ( https://deno.land ) 了解一下。
也可以通过这篇讲 [Deno 是什么？](./2022-11-24-what-is-deno.md) 的文章了解一下一下 Deno 出现的背景。

<!--truncate-->

### Deno 默认的 import 用法

Deno 官方对于模块的说明:

https://deno.land/manual@v1.28.2/basics/modules#modules

:::note 原文引用

### Modules Concepts

- import allows you to include and use modules held elsewhere, on your local file system or remotely.
- Imports are `URLs` or `file system paths`.
- export allows you to specify which parts of your module are accessible to users who import your module.

:::

意思是，引用其他模块提供 `URL` 或者 `file system paths` 两种方式。

- URL
  - `import { add, multiply} from "https://x.nest.land/ramda@0.27.0/source/index.js";`
- file system paths
  - `import { add, multiply } from "./arithmetic.ts";`

我们可以理解为：
- `URL` 指向了引用的远程代码模块
- `file system paths` 指向了一个相对地址的模块，通常是本地的其他代码，当然，远程的代码模块中也是可以有相对地址引用。

### Deno 中实现简单 HTTP Server

例如我们来实现一个简单的 HTTP Web Server。

参考 [Using the `std/http` library](https://deno.land/manual@v1.28.2/examples/http_server#using-the-stdhttp-library)

```ts
// webserver.ts

// 模块以 URL 的形式导入
import { serve } from "https://deno.land/std@0.166.0/http/server.ts";

const port = 8080;

const handler = (request: Request): Response => {
  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });
```

运行

```bash
deno run --allow-net webserver.ts
```

### 美中不足，但会好起来的

这看起来非常不错，很快就能跑起来一个简单的 HTTP Server，并且不需要安装太多依赖。

如果我们需要构建能在生产环境运行的程序，这看起来还不够，由于大部分接触 Deno 的朋友都有过 Node.js 的开发经验或者说相当丰富的开发经验。
对于 Node.js 生态中比较常见的一些库、框架、工具比如 `express`、`koa`、`lodash` 等等都比较熟悉了，那么我们更希望不要再造一次轮子，如果能直接使用 npm 中发布的这些库，那真是太棒了！

也正是在这样的强烈需求的背景下，Deno 开发团队从 `1.25` 版本就开始了实验性质的特性：**支持引用 npm 模块**，这个特性在 `1.28` 版本中正式发布。

原博客地址：[Big Changes Ahead for Deno](https://deno.com/blog/changes)

:::note 原文引用
#### Compatibility with Node and npm

Maybe not too surprisingly, Deno users have been a bit split on the best level of compatibility with Node. A large number of you have called out how refreshing it is to get away from all the pain of Node – from the antiquated and non-standard APIs to the odd module loading heuristics. We hear you, and these were some of the main reasons that our team created Deno in the first place.

Still, a fair number of you just want an easier way to interoperate with JavaScript written for Node and distributed as an npm package. We want Deno to be accessible and solve people's problems, and so we've been working on some updates that will allow Deno to easily import npm packages and make 80-90% of npm packages work in Deno within the next three months.

The way this will work is with special npm URLs. It's best explained with an example:

```ts
import express from "npm:express@5";
```

Within the next three months, most npm modules can be pulled in as a dependency like this. There will be no node_modules folder, no npm install; the packages will be automatically downloaded in the Deno cache. All the Deno tooling will work with this, from type checking, to the LSP, to deno vendor.

:::


### Deno 1.28 开始支持引用 npm modules

Deno 在 1.28 版本支持了通过 `npm:express@^4.18.2` 这种方式引用 npm 模块。

官方目前提供了两种方式来实现对 npm 模块的引用：
- 通过 `npm:<package-name>` 的方式引用
- 通过 CDN 上分发的 npm 包来引用，这种方式其实是和 URLs 方式类似，引用的是 ESM 的模块

#### 通过 `npm:<package-name>` 的方式引用

文档地址：[Using npm packages with npm specifiers](https://deno.land/manual@v1.28.2/node/npm_specifiers)

包引用的格式为

```
npm:<package-name>[@<version-requirement>][/<sub-path>]
```

例如

```ts
// main.ts
import express from "npm:express@^4.18";
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
console.log("listening on http://localhost:3000/");
```

是不是和 Node.js 的开发体验比较接近了呢？

##### `npm:` 如何找到对应的模块的呢

第一次运行以上代码时，我们可以看到其实是 Deno 拼接了 `https://registry.npmjs.org` 地址来下载对应的模块，这个 registry 目前看起来似乎是没有办法指定的。
猜测可能 Deno 并不打算去支持各种各样不完全符合 npm 规范的第三方 registry 把。

#### 通过 CDN 上分发的 npm 包来引用

文档地址：[Using npm packages with CDNs](https://deno.land/manual@v1.28.2/node/cdns#esmsh)

例如

```ts
import React from "https://esm.sh/react";

export default class A extends React.Component {
  render() {
    return <div>Hello world</div>;
  }
}
```

如果模块的版本号遵循 sermver 规范，你也可以通过一下方式：

```ts
import React from "https://esm.sh/react@17.0.2";
```

或者

```ts
import React from "https://esm.sh/react@~16.13.0";
```

获取引用一个子模块

```ts
import { renderToString } from "https://esm.sh/react-dom/server";
```

或者只引用一个 css 文件

```ts
import "https://esm.sh/tailwindcss/dist/tailwind.min.css";
```

到这感觉离复用 Node.js 生态中的库已经基本不远了，但是还有一些问题没有解决，那就是怎么引入私有模块呢。

### 引用私有 npm 模块

体验了一下通过 `npm registry` 引入 npm 模块的方式，但是仅支持通过 npm 官方的 registry 引入。
而在国内环境下，很多朋友开发 Node.js 程序多多烧好都会使用私有仓库维护的模块，那么怎么引入私有仓库的模块呢？

#### 覆盖 npm registry 地址

尝试搜索了一下 issue，目前也没有找到怎么指定私有的 npm registry 的方法。

- https://github.com/denoland/dotland/issues/406

#### CDNs 的方式

首先通过公开的 CDNs 肯定是不可能引用到私有的库，这样不就泄漏了源码么。

天无绝人之路，偶然发现 `esm.sh` ( https://github.com/ije/esm.sh ) 这个是开源的，并且提供了自己部署的方式，而且好消息是支持指定 npm registry 地址！

本地化部署参考 [Self-Hosting](https://github.com/ije/esm.sh/blob/main/HOSTING.md) 文档。

注意需要本地环境满足以下条件：
- Golang 1.16+
- Node.js 16+ TLS

我们首先 clone 代码到本地

```bash
git clone https://github.com/ije/esm.sh
cd esm.sh
```

本地跑起来，假设我们本地已经有自己的私有 npm 仓库，地址是 `http://registry.luoyjx.org/`，而我们已有的 npm 模块是 `@luoyjx/my-package`。

```bash
go run main.go --dev --npm-registry=http://registry.luoyjx.org/
```

启动后我们可以看到以下控制台输出

```bash
➜  esm.sh git:(main) ✗ go run main.go --dev --npm-registry=http://registry.luoyjx.org/
2022/11/25 10:25:47 [info] nodejs v16.14.2 installed, registry: http://registry.luoyjx.org/, yarn: 1.22.19
2022/11/25 10:25:47 [debug] Server is ready on http://localhost:80
2022/11/25 10:25:47 [debug] Testing page at http://localhost:80?test
2022/11/25 10:25:47 [debug] node services process started, pid is 24258
```

这时候我们就可以通过私有的 `esm.sh` 去访问我们的私有 npm 仓库中的模块了！

我们的私有的 CDN 服务地址是 `http://localhost:80`，端口可以省略。

代码中我们就可以这样引用了:

```ts
// main.ts

import myPackage from "http://localhost/@luoyjx/my-package";
myPackage.doSomething();
```

不过，我也仅是在自己本地环境做了一些测试，并未在生产环境实际测试过，所以这个方式仅作为一种参考，不知道大家有没有更好的方式呢，如果你有其他方式也欢迎和我分享。

