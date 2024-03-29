---
slug: variable-hoisting-in-js
title: javascript变量声明提升--hoisting
tags: [javascript ,hoisting]
---

javascript的变量声明具有hoisting机制，JavaScript引擎在执行的时候，会把所有变量的声明都提升到当前作用域的最前面。

先看一段代码
```
var v = "hello";
(function(){
  console.log(v);
  var v = "world";
})();
```
这段代码运行的结果是什么呢？
答案是：undefined
这段代码说明了两个问题，
第一，function作用域里的变量v遮盖了上层作用域变量v。代码做少些变动
```
var v = "hello";
if(true){
  console.log(v);
  var v = "world";
}
```
输出结果为"hello",说明**javascript是没有块级作用域的。函数是JavaScript中唯一拥有自身作用域的结构**。

第二，在function作用域内，变量v的声明被提升了。所以最初的代码相当于：
```
var v = "hello";
(function(){
  var v; //declaration hoisting
  console.log(v);
  v = "world";
})();
```

## 声明、定义与初始化
声明宣称一个名字的存在，定义则为这个名字分配存储空间，而初始化则是为名字分配的存储空间赋初值。
用C++来表述这三个概念
```
extern int i;// 这是声明，表明名字 i 在某处已经存在了
int i;// 这是声明并定义名字 i, 为 i 分配存储空间
i = 0;// 这是初始化名字 i, 为其赋初值为 0
```
javascript中则是这样
```
var v;// 声明变量 v
v = "hello";//(定义并) 初始化变量 v
```
**因为javascript为动态语言，其变量并没有固定的类型，其存储空间大小会随初始化与赋值而变化**，所以其变量的“定义”就不像传统的静态语言一样了，其定义显得无关紧要。

## 声明提升
当前作用域内的声明都会提升到作用域的最前面，包括变量和函数的声明
```
(function(){
  var a = "1";
  var f = function(){};
  var b = "2";
  var c = "3";
})();
```
变量a,f,b,c的声明会被提升到函数作用域的最前面，类似如下：
```
(function(){
  var a,f,b,c;
  a = "1";
  f = function(){};
  b = "2";
  c = "3";
})();
```
请注意函数表达式并没有被提升，这也是函数表达式与函数声明的区别。进一步看二者的区别：
```
(function(){
  //var f1,function f2(){}; //hoisting, 被隐式提升的声明

  f1(); //ReferenceError: f1 is not defined
  f2();

  var f1 = function(){};
  function f2(){}
})();
```
上面代码中函数声明f2被提升，所以在前面调用f2是没问题的。虽然变量f1也被提升，但f1提升后的值为undefined,其真正的初始值是在执行到函数表达式处被赋予的。所以只有声明是被提升的。

## 名字解析顺序
javascript中一个名字(name)以四种方式进入作用域(scope)，其优先级顺序如下：
1、语言内置：所有的作用域中都有 this 和 arguments 关键字
2、形式参数：函数的参数在函数作用域中都是有效的
3、函数声明：形如function foo() {}
4、变量声明：形如var bar;

名字声明的优先级如上所示，也就是说如果一个变量的名字与函数的名字相同，那么函数的名字会覆盖变量的名字，无论其在代码中的顺序如何。但名字的初始化却是按其在代码中书写的顺序进行的，不受以上优先级的影响。看代码：
```
(function(){
    var foo;
    console.log(typeof foo); //function

    function foo(){}

    foo = "foo";
    console.log(typeof foo); //string
})();
```
如果形式参数中有多个同名变量，那么最后一个同名参数会覆盖其他同名参数，即使最后一个同名参数并没有定义。

以上的名字解析优先级存在例外，比如可以覆盖语言内置的名字arguments。

## 命名函数表达式

可以像函数声明一样为函数表达式指定一个名字，但这并不会使函数表达式成为函数声明。命名函数表达式的名字不会进入名字空间，也不会被提升。
```
f();//TypeError: f is not a function
foo();//ReferenceError: foo is not defined
var f = function foo(){console.log(typeof foo);};
f();//function
foo();//ReferenceError: foo is not defined
```
命名函数表达式的名字只在该函数的作用域内部有效。

> 文章来自 [http://openwares.net/](http://openwares.net/js/javascript_declaration_hoisting.html)
