---
slug: nodejs-module-exports-and-exports-usage
title: nodejs 扫盲 module.exports 与 exports
tags: [node.js]
---

在 nodejs 模块中，如果希望向外暴露出模块中的方法和变量，需要使用 module.exports 或者 exports，但是他们的意义却不同。

## module.exports

module 表示该模块对象，在 module 对象中有个 exports 的属性，**默认值为空对象{}**；exports 是模块往外暴露方法或者变量的接口，可以暴露变量或者方法：

```js
    var a =  10;
    module.exports = a;

    var a =  10;
    var b = 'hello';
    module.exports = {age:a,name:b};

    var a =  {
        name : 'hello',
        age: 10
    }
    module.exports = a;

    function a(){
        console.log('hello')
    }
    module.exports = a;

    var a = function (){
        console.log('hello')
    }
    module.exports = a;

    var a = {
        name : 'hello',
        getName : function(){
            console.log(this.name)
        }
    }
    module.exports = a;
```

## exports

exports 是 module.exports 的一个**引用**，可以为 exports 添加属性，但**不能直接赋值**，那样就会**失去对 module.exports 的引用**，便不会暴露出所的值。

```js
    exports.name = 'hello';

    exports.getName = function(){
        console.log(this.name)
    }
```

因为是 module.exports 的引用，所以每次为 exports 赋值的时候，就是为 module.exports 赋值。
如果直接为 exports 赋值：

```js
    exports = 'hello';
```

即改变了 exports 对 module.exports 的引用，所以所赋的值无法通过 module.exports 暴露出去。

## exports = module.exports = xxx

可以在很多项目中看到这句，当模块要输出一个非 Object 时（比如一个 Function），可以使用

```js
    module.exports = function () {}
```

此时 module.exports 被覆盖了，而 exports 还是原来的对像的引用，为了避免在后面的代码中仍然使用 exports.xx = yy 而导致不能正确输出，需要把 exports 变量也重新设置为新的 module.exports 的引用，所以一般习惯写成

```js
    exports = module.exports = xxx
```