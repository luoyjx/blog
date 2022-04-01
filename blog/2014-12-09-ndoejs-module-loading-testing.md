---
slug: ndoejs-module-loading-testing
title: nodejs 模块加载机制的测试结果
tags: [node.js]
---

   关于上篇看到InfoQ和cnblog上的博文后，做了个简单的测试。

  建立global目录和test目录以及启动的index.js，global中用module.exports导出一个只有a属性并且a属性的值为一个空对象的json对象。

    module.exports = {
        a : {}
    };

然后在根目录的index.js中引入这个模块，只需要require('./global'）即可，由于默认会在包下找到index.js作为入口。

  引入后打印出此对象，然后为a属性中的json对象追加一个键值对a=111,再打印此时，对象中的值已经与开始导出时不同，如果每次加载模块时都直接加载的话那么在其他模块加载肯定与当前不同。

  根目录的index.js代码

    var context = require('./global');
    var test = require('./test');
    console.log(context.a);
    context.a['a'] = 111;
    console.log("当前context内容");
    console.log(context.a);
    console.log("从其他模块引入的global");
    test.getContext();


  test包中的index.js代码

    var context = require('../global');
    exports.getContext = function(){
        console.log(context.a);
    };

  执行后的结果，如下：

    {}
    当前context内容
    { a: 111 }
    从其他模块引入的global
    { a: 111 }

由此可见，我们在改变了global模块中的值的时候，后续在其他模块引用这个模块，它没有直接加载这个模块，而是从require的cache中读取的缓存的内容。

  这样的话，我在之前文章[《nodejs通讯在工作中的思考和改进》][0]中提到的全局变量的问题，可以通过封装一个global模块来实现全局变量了。

  不过我突然怀疑了一下，如果在test模块中改变下global中的值，这边是否也改变了呢，修改了下test中的代码，如下：



    var context = require('../global');
    exports.getContext = function(){
        console.log(context.a);
    };
    exports.changeContext = function(){
        context.a['b'] = 222;
    };

  看看是否是引用的相同对象，虽然这理论上就是这样，不过亲手证实了比较放心。

  根目录的index中如下：



    var context = require('./global');
    var test = require('./test');
    console.log("初始值");
    console.log(context.a);
    context.a['a'] = 111;
    console.log("当前context内容");
    console.log(context.a);
    console.log("从其他模块引入的global");
    test.getContext();
    console.log("在test模块中改变global中a添加属性b值");
    test.changeContext();
    console.log("改变后的值");
    console.log(context.a);

  再看看结果：



    初始值
    {}
    当前context内容
    { a: 111 }
    从其他模块引入的global
    { a: 111 }
    在test模块中改变global中a添加属性b值
    改变后的值
    { a: 111, b: 222 }

  恩，答案令人满意，确实是在缓存中共享的对象，这样就可以放心的封装为global模块了（可能在项目中叫做applicationContext比较贴切）。

[0]: http://blog.gaoqixhb.com/p/54859f77e5cd3c2f35320ebf
