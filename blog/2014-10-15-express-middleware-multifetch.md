---
slug: express-middleware-multifetch
title: express 批量请求合并中间件 multifetch
tags: [express ,node.js]
---

Express中间件可以进行内部批量GET请求。它允许客户端发送一个HTTP请求，可以在应用程序中获取多个JSON的资源，而没有进行任何多余的请求。&nbsp;

NPM安装multifetch&nbsp;

```shell
npm install multifetch
```

开发和测试的node版本为0.10。&nbsp;

用法&nbsp;

它可以不使用任何配置。&nbsp;
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


执行GET请求/api/multifetch?user=/api/user，将返回用户和一些元数据信息。查询参数应该有一个资源的名称作为键和相对路径的值。该路径可以有其自己的查询，只要它的正确编码。此外，服务端必须返回application/json或text/json（有或没有字符编码）的Content-Type头，否则内容将被忽略。&nbsp;

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

这样我们就可以通过将它们添加到查询获取多个资源。如果我们有更多的路由的定义，这将是可行的。&nbsp;
```shell
GET /api/multifetch?user=/api/user&amp;albums=/api/users/user_1/albums&amp;files=/api/files
```

响应将包含如上所述的所有资源。&nbsp;

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


我们不进行任何额外的HTTP请求，而不是表达“内部路由是用来获取资源，并将它们发送回客户端。 JSON是以流传输到客户端。&nbsp;

另外，也可以配置multifetch忽略一些查询参数，或执行任何内部路由之前提供函数回调，这样在内部请求时设置任何所需的头信息。比如，API访问令牌（cookie头默认设置）。&nbsp;
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


如果request.body可用并且是一个JSON对象，资源也将包括来自这里（body对象与资源名称作为键和路径的值）。这可以通过使用post的路由和bodyParse中间件脱骨。&nbsp;

要求非JSON的资源，在content-type不包含json，则返回null作为body。&nbsp;

传递headers：false作为一个选项，从响应排除StatusCode和headers，仅被返回资源的内容（_error属性仍然是可用的）。

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

作者的Github地址：[multifetch][0]

[0]: https://github.com/e-conomic/multifetch
