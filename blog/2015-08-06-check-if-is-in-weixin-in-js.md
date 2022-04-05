---
slug: check-if-is-in-weixin-in-js
title: 小技巧：判断是否是微信打开页面
tags: [javascript]
---

```js
	function is_weixn(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }
```
