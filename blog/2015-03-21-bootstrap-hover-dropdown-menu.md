---
slug: bootstrap-hover-dropdown-menu
title: bootstrap 鼠标 hover 下拉菜单
tags: [bootstrap]
---

Bootstrap 的导航条下拉菜单为了适应移动设备没有鼠标 hover 的状态，都是点击弹出下拉菜单，为了适应一般网站使用，我稍作了一些修改，鼠标 hover 时就弹出二级菜单。

需要添加的 CSS 样式如下：

```css
    .navbar .nav &gt; li .dropdown-menu {
    	margin: 0;
    }
    .navbar .nav &gt; li:hover .dropdown-menu {
    	display: block;
    }
```

这样就可以在 Bootstrap 中实现鼠标悬停的下拉菜单了！

源码下载及 Demo 演示 [http://runjs.cn/detail/ph5xdsde][0]

[0]: http://runjs.cn/detail/ph5xdsde
