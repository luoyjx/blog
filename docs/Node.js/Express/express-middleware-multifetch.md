---
id: express-middleware-multifetch
title: express 批量请求合并中间件 multifetch
---

Express 中间件可以进行内部批量 GET 请求。它允许客户端发送一个 HTTP 请求，可以在应用程序中获取多个 JSON 的资源，而没有进行任何多余的请求。

NPM 安装 multifetch

```shell
npm install multifetch
```

开发和测试的 node 版本为 0.10。

用法

它可以不使用任何配置。
```js
var multifetch = require('multifetch');
var express = require('express');

var app = express();

app.get('/api/multifetch', multifetch());

app.get('/api/user', function(request, response) {
    response.json({
        name: 'user_1',
        associates: ['user_2', 'user_3']
    });
});

app.listen(8080);
```

执行 GET 请求 /api/multifetch?user=/api/user，将返回用户和一些元数据信息。查询参数应该有一个资源的名称作为键和相对路径的值。该路径可以有其自己的查询，只要它的正确编码。此外，服务端必须返回 application/json 或 text/json（有或没有字符编码）的 Content-Type 头，否则内容将被忽略。

```js
// Response JSON object
{
    user: {
        statusCode: 200,                            // Response code returned by the user route
        headers: {                                  // All response headers
            'content-type': 'application/json',
            ...
        },
        body: {                                     // The actual json body
            name: 'user_1',
            associates: ['user_2', 'user_3']
        }
    },
    _error: false                                   // _error will be true if one of the requests failed
}
```

这样我们就可以通过将它们添加到查询获取多个资源。如果我们有更多的路由的定义，这将是可行的。
```shell
GET /api/multifetch?user=/api/user&amp;albums=/api/users/user_1/albums&amp;files=/api/files
```

响应将包含如上所述的所有资源。

```js
{
    user: {
        statusCode: 200,
        headers: { ... },
        body: { ... }
    },
    albums: {
        statusCode: 200,
        headers: { ... },
        body: [ ... ]
    },
    files: {
        statusCode: 200,
        headers: { ... },
        body: [ ... ]
    },
    _error: false
}
```

我们不进行任何额外的 HTTP 请求，而不是表达“内部路由是用来获取资源，并将它们发送回客户端。 JSON 是以流传输到客户端。

另外，也可以配置 multifetch 忽略一些查询参数，或执行任何内部路由之前提供函数回调，这样在内部请求时设置任何所需的头信息。比如，API 访问令牌（cookie 头默认设置）。
```js
    // Ignore access_token and token in the query
    app.get('/api/multifetch', multifetch({ ignore: ['access_token', 'token'] }));

    // Callback function run before each internal request.
    // The serverRequest argument, is the original request to multifetch,
    // while internalRequest is the fake request generated to get the actual resource.
    app.get('/api/multifetch', multifetch(function(serverRequset, internalRequest, next) {
        if(serverRequest.hasAccess) {
            // Calling next with a truthy value, skips this internal request.
            return next(true);
        }

        // Copy token
        internRequest.headers.token = serverRequest.headers.token || serverRequest.query.token;
        next();
    }));
```

如果 request.body 可用并且是一个 JSON 对象，资源也将包括来自这里（body 对象与资源名称作为键和路径的值）。这可以通过使用 post 的路由和 bodyParse 中间件脱骨。

要求非 JSON 的资源，在 content-type 不包含 json，则返回 null 作为 body。

传递 headers：false 作为一个选项，从响应排除 StatusCode 和 headers，仅被返回资源的内容（_error 属性仍然是可用的）。

```js
    app.get('/api/multifetch', multifetch({ headers: false }));
```

只返回内容。

```js
    {
        user: {
            name: 'user_1',
            associates: ['user_2', 'user_3']
        },
        _error: false
    }
```

作者的 Github 地址：[multifetch][0]

[0]: https://github.com/e-conomic/multifetch
