---
slug: async-in-javascript-promise
title: JavaScript 异步编程的 Promise 模式
tags: [javascript , 异步 ,promise]
---

作者 [崔康][0]

异步模式在 web 编程中变得越来越重要，对于 web 主流语言 Javascript 来说，这种模式实现起来不是很利索，为此，许多 Javascript 库（比如 jQuery 和 Dojo）添加了一种称为 promise 的抽象（有时也称之为 deferred）。通过这些库，开发人员能够在实际编程中使用 promise 模式。IE 官方博客最近发表了一篇 [文章][1]，详细讲述了如何使用 [XMLHttpRequest2][2] 来实践 promise 模式。我们来了解一下相关的概念和应用。

考虑这样一个例子，某网页存在异步操作（通过 [XMLHttpRequest2][2] 或者 [Web][3][Workers][4]）。随着 Web 2.0 技术的深入，浏览器端承受了越来越多的计算压力，所以“并发”具有积极的意义。对于开发人员来说，既要保持页面与用户的交互不受影响，又要协调页面与异步任务的关系，这种非线性执行的编程要求存在适应的困难。先抛开页面交互不谈，我们能够想到对于异步调用需要处理两种结果——成功操作和失败处理。在成功的调用后，我们可能需要把返回的结果用在另一个 Ajax 请求中，这就会出现“函数连环套”的情况（在笔者的另一篇文章《[NodeJS 的异步编程风格][5]》中有详细的解释）。这种情况会造成编程的复杂性。看看下面的代码示例（基于 XMLHttpRequest2）：
```js
    function searchTwitter(term, onload, onerror) {

         var xhr, results, url;
         url = 'http://search.twitter.com/search.json?rpp=100&amp;q=' + term;
         xhr = new XMLHttpRequest();
         xhr.open('GET', url, true);

         xhr.onload = function (e) {
             if (this.status === 200) {
                 results = JSON.parse(this.responseText);
                 onload(results);
             }
         };

         xhr.onerror = function (e) {
             onerror(e);
         };

         xhr.send();
     }

     function handleError(error) {
         /* handle the error */
     }

     function concatResults() {
         /* order tweets by date */
     }

     function loadTweets() {
         var container = document.getElementById('container');

         searchTwitter('#IE10', function (data1) {
             searchTwitter('#IE9', function (data2) {
                 /* Reshuffle due to date */
                 var totalResults = concatResults(data1.results, data2.results);
                 totalResults.forEach(function (tweet) {
                     var el = document.createElement('li');
                     el.innerText = tweet.text;
                     container.appendChild(el);
                 });
             }, handleError);
         }, handleError);
     }
```

上面的代码其功能是获取 Twitter 中 hashtag 为 IE10 和 IE9 的内容并在页面中显示出来。这种嵌套的回调函数难以理解，开发人员需要仔细分析哪些代码用于应用的业务逻辑，而哪些代码处理异步函数调用的，代码结构支离破碎。错误处理也分解了，我们需要在各个地方检测错误的发生并作出相应的处理。

为了降低异步编程的复杂性，开发人员一直寻找简便的方法来处理异步操作。其中一种处理模式称为 promise，它代表了一种可能会长时间运行而且不一定必须完整的操作的结果。这种模式不会阻塞和等待长时间的操作完成，而是返回一个代表了承诺的（promised）结果的对象。

考虑这样一个例子，页面代码需要访问第三方的 API，网络延迟可能会造成响应时间较长，在这种情况下，采用异步编程不会影响整个页面与用户的交互。promise 模式通常会实现一种称为 then 的方法，用来注册状态变化时对应的回调函数。比如下面的代码示例：

```js
    searchTwitter(term).then(filterResults).then(displayResults);
```

promise 模式在任何时刻都处于以下三种状态之一：未完成（unfulfilled）、已完成（resolved）和拒绝（rejected）。以 CommonJS Promise/A 标准为例，promise 对象上的 then 方法负责添加针对已完成和拒绝状态下的处理函数。then 方法会返回另一个 promise 对象，以便于形成 promise 管道，这种返回 promise 对象的方式能够支持开发人员把异步操作串联起来，如 then(resolvedHandler, rejectedHandler); 。resolvedHandler 回调函数在 promise 对象进入完成状态时会触发，并传递结果；rejectedHandler 函数会在拒绝状态下调用。

有了 promise 模式，我们可以重新实现上面的 Twitter 示例。为了更好的理解实现方法，我们尝试着从零开始构建一个 promise 模式的框架。首先需要一些对象来存储 promise。
```js
    var Promise = function () {
            /* initialize promise */
        };
```

 接下来，定义 then 方法，接受两个参数用于处理完成和拒绝状态。
 ```js
 Promise.prototype.then = function (onResolved, onRejected) {
         /* invoke handlers based upon state transition */
     };
```

同时还需要两个方法来执行理从未完成到已完成和从未完成到拒绝的状态转变。

```js
    Promise.prototype.resolve = function (value) {
         /* move from unfulfilled to resolved */
     };

     Promise.prototype.reject = function (error) {
         /* move from unfulfilled to rejected */
     };
```

 现在搭建了一个promise的架子，我们可以继续上面的示例，假设只获取IE10的内容。创建一个方法来发送Ajax请求并将其封装在promise中。这个promise对象分别在xhr.onload和xhr.onerror中指定了完成和拒绝状态的转变过程，请注意searchTwitter函数返回的正是promise对象。然后，在loadTweets中，使用then方法设置完成和拒绝状态对应的回调函数。

```js
    function searchTwitter(term) {

        var url, xhr, results, promise;
        url = 'http://search.twitter.com/search.json?rpp=100&amp;q=' + term;
        promise = new Promise();
        xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function (e) {
            if (this.status === 200) {
                results = JSON.parse(this.responseText);
                promise.resolve(results);
            }
        };

        xhr.onerror = function (e) {
            promise.reject(e);
        };

        xhr.send();
        return promise;
    }

    function loadTweets() {
        var container = document.getElementById('container');
        searchTwitter('#IE10').then(function (data) {
            data.results.forEach(function (tweet) {
                var el = document.createElement('li');
                el.innerText = tweet.text;
                container.appendChild(el);
            });
        }, handleError);
    }
```

 到目前为止，我们可以把promise模式应用于单个Ajax请求，似乎还体现不出promise的优势来。下面来看看多个Ajax请求的并发协作。此时，我们需要另一个方法when来存储准备调用的promise对象。一旦某个promise从未完成状态转化为完成或者拒绝状态，then方法里对应的处理函数就会被调用。when方法在需要等待所有操作都完成的时候至关重要。

```js
    Promise.when = function () {
        /* handle promises arguments and queue each */
    };
```

 以刚才获取IE10和IE9两块内容的场景为例，我们可以这样来写代码：

```js
    var container, promise1, promise2;
    container = document.getElementById('container');
    promise1 = searchTwitter('#IE10');
    promise2 = searchTwitter('#IE9');
    Promise.when(promise1, promise2).then(function (data1, data2) {

        /* Reshuffle due to date */
        var totalResults = concatResults(data1.results, data2.results);
        totalResults.forEach(function (tweet) {
            var el = document.createElement('li');
            el.innerText = tweet.text;
            container.appendChild(el);
        });
    }, handleError);
```

分析上面的代码可知，when函数会等待两个promise对象的状态发生变化再做具体的处理。在实际的Promise库中，when函数有很多变种，比如 when.some()、when.all()、when.any()等，读者从函数名字中大概能猜出几分意思来，详细的说明可以参考CommonJS的一个promise实现[when.js][6]。

除了CommonJS，其他主流的Javascript框架如jQuery、Dojo等都存在自己的promise实现。开发人员应该好好利用这种模式来降低异步编程的复杂性。我们选取Dojo为例，看一看它的实现有什么异同。

Dojo框架里实现promise模式的对象是Deferred，该对象也有then函数用于处理完成和拒绝状态并支持串联，同时还有resolve和reject，功能如之前所述。下面的代码完成了Twitter的场景：

```js
    function searchTwitter(term) {

        var url, xhr, results, def;
        url = 'http://search.twitter.com/search.json?rpp=100&amp;q=' + term;
        def = new dojo.Deferred();
        xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function (e) {
            if (this.status === 200) {
                results = JSON.parse(this.responseText);
                def.resolve(results);
            }
        };

        xhr.onerror = function (e) {
            def.reject(e);
        };

        xhr.send();
        return def;
    }

    dojo.ready(function () {
        var container = dojo.byId('container');
        searchTwitter('#IE10').then(function (data) {
            data.results.forEach(function (tweet) {
                dojo.create('li', {
                    innerHTML: tweet.text
                }, container);
            });
        });
    });
```

 不仅如此，类似dojo.xhrGet方法返回的即是dojo.Deferred对象，所以无须自己包装promise模式。

 ```js
    var deferred = dojo.xhrGet({
        url: "search.json",
        handleAs: "json"
    });

    deferred.then(function (data) {
        /* handle results */
    }, function (error) {
        /* handle error */
    });
```

 除此之外，Dojo 还引入了 dojo.DeferredList, 支持开发人员同时处理多个 dojo.Deferred 对象，这其实就是上面所提到的 when 方法的另一种表现形式。

```js
    dojo.require("dojo.DeferredList");
    dojo.ready(function () {
        var container, def1, def2, defs;
        container = dojo.byId('container');
        def1 = searchTwitter('#IE10');
        def2 = searchTwitter('#IE9');

        defs = new dojo.DeferredList([def1, def2]);

        defs.then(function (data) {
            // Handle exceptions
            if (!results[0][0] || !results[1][0]) {
                dojo.create("li", {
                    innerHTML: 'an error occurred'
                }, container);
                return;
            }
            var totalResults = concatResults(data[0][1].results, data[1][1].results);

            totalResults.forEach(function (tweet) {
                dojo.create("li", {
                    innerHTML: tweet.text
                }, container);
            });
        });
    });
```

上面的代码比较清楚，不再详述。

说到这里，读者可能已经对 promise 模式有了一个比较完整的了解，异步编程会变得越来越重要，在这种情况下，我们需要找到办法来降低复杂度，promise 模式就是一个很好的例子，它的风格比较人性化，而且主流的 JS 框架提供了自己的实现。所以在编程实践中，开发人员应该尝试这种便捷的编程技巧。需要注意的是，promise 模式的使用需要恰当地设置 promise 对象，在对应的事件中调用状态转换函数，并且在最后返回 promise 对象。

技术社区对异步编程的关注也在升温，国内社区也发出了自己的声音。资深技术专家老赵就发布了一套开源的异步开发辅助库 Jscex，它的设计很巧妙，抛弃了回调函数的编程方式，采用一种“线性编码、异步执行”的思想，感兴趣的读者可以查看 [这里][7]。

不仅仅是前端的 JS 库，如今火热的 NodeJS 平台也出现了许多第三方的 promise 模块，具体的清单可以访问 [这里][8]。

注：本文中的所有代码示例均来自于 IE 官方博客。

原文来自 InfoQ :http://www.infoq.com/cn/news/2011/09/js-promise/

[0]: http://www.infoq.com/cn/author/%E5%B4%94%E5%BA%B7
[1]: http://blogs.msdn.com/b/ie/archive/2011/09/11/asynchronous-programming-in-javascript-with-promises.aspx
[2]: http://www.w3.org/TR/XMLHttpRequest2/
[3]: http://blogs.msdn.com/b/ie/archive/2011/07/01/web-workers-in-ie10-background-javascript-makes-web-apps-faster.aspx
[4]: http://blogs.msdn.com/b/ie/archive/2011/07/12/debugging-web-workers-in-ie10.aspx
[5]: http://www.infoq.com/cn/news/2011/09/nodejs-async-code
[6]: https://github.com/briancavalier/when.js
[7]: http://www.infoq.com/cn/articles/jscex-javascript-asynchronous-programming
[8]: https://github.com/joyent/node/wiki/modules#wiki-async-flow
