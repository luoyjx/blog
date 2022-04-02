---
slug: custom-json-parse-before-ie9
title: IE9 以下不支持 JSON.parse 的一些解决方案
tags: [javascript]
---

 在 IE9 以下是不支持 `JSON.parse` 方法来解析 JSON 字符串的。

 原来，在IE8中使用原生JSON对象是有条件的。微软在介绍JSON对象时也有下面的一段注释：

> Starting with JScript. 5.8, by default, the JScript. scripting engine supports the language feature set as it existed in version 5.7. This is to maintain compatibility with the earlier versions of the engine. To use the complete language feature set of version 5.8, the Windows Script. interface host has to invoke IActiveScriptProperty::SetProperty.

> Internet Explorer 8 opts into the JScript. 5.8 language features when the document mode for Internet Explorer 8 is "Internet Explorer 8 Standards" mode. For other document modes, Internet Explorer uses the version 5.7 feature set.

> JScript. 5.8 includes native JavaScript. Object Notation (JSON) support and the accessor methods for Document Object Model (DOM) prototypes.

 由于 JSON 对象是在 JScript. 5.8 及其以后的版本引入的，所以，默认情况下，IE8 使用的是 JScript. 5.7 版本，所以，原生 JSON 对象是无法使用的。

## 1.eval方式解析，恐怕这是最早的解析方式了

```js
    function strToJson(str){
        var json = eval('(' + str + ')');
        return json;
    }
```

但是出于安全性的考虑，建议尽量不要使用eval，如果从第三方获取数据进行解析，会存在恶意脚本代码的风险。

## 2.new Function形式，比较怪异。

```js
    function strToJson(str){
        var json = (new Function("return " + str))();
        return json;
    }
```

