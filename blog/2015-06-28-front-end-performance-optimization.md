---
slug: front-end-performance-optimization
title: 前端优化之观察新浪微博
tags: [前端优化 , 新浪微博]
---

## dns-prefetch

什么是 DNS Prefetch ?

DNS Prefetch 是一种 DNS 预解析技术。当你浏览网页时，浏览器会在加载网页时对网页中的域名进行解析缓存，这样在你单击当前网页中的连接时就无需进行 DNS 的解析，减少用户等待时间，提高用户体验。

## font 12px/1.3
代表什么意思呢，那就是字体大小是 12px，后面的是行高 1.3 倍

## 针对 IE7 以下的背景图片缓存
```js
try{
  document.execCommand("BackgroundImageCache", false, true);
}catch(e){

}
```

## 页面样式分块分层渲染
我们通常都会想，尽量的把 css，js 等静态文件压缩合并，是的，这种思路是没有错的，但是，这只能说针对于在 css、js 文件的内容不多，压缩之后不是很大的情况下才算是较优的策略，然而当合并起来也较大时，其实应该分层次的将 css 拆开成不多的几个文件，让用户的首屏不会出现很长时间的空白。
其实这也是看了[扑灵](http://weibo.com/shyvo)大大的博客[《谈新浪微博的前端重构中的 CSS 请求数问题及优化策略 》](http://blog.sina.com.cn/s/blog_67fd85270100u25l.html)之后才明白的一个问题。
 ![css](https://static.gaoqixhb.com/Fivda7jvWmzqbU6sMcS2bigfpYlL)

 ## 我产生了一个问题
 这个 link 标签中的 includes 属性哪来的？从后面的内容来看像是把各个区域分块加载出来的。

参考地址：
http://skyhome.cn/div_css/301.html
http://www.jb51.net/article/26422.htm
