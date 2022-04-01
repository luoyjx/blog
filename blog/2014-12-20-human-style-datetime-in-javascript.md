---
slug: human-style-datetime-in-javascript
title: 让你的时间格式更加人性化(Javascript版)
tags: [javascript]
---

   这里分享下怎么样将时间显示的更加人性化。

通常我们在页面上显示日期时间的时候，通常是yyyy-MM-dd HH:mm:ss，也就是年月日时分秒的格式，这样确实比较规范，但是这样的时间在社交类或博客类网站中是否有好处呢？

  答案也不是一定的，也许有人说我就喜欢这样的格式！

  但是，在数据爆发的这个时代，我们总会想看一些最新的消息，比如：

  当我们百度搜某个新闻的时候，我们通常会在结果中查找比较新的，后面的人性化时间会给我们指导作用。



  举个例子：

  2014年感动中国十大人物  刚刚

 2014年感动中国十大人物出炉 3分钟前

  看看 2014年感动中国十大人物  2014-12-27 12:28

  这几个结果中，相信一般的老百姓大都会从第一个开始点吧，不多说废话了，看看Javascript代码如何实现的：





    function hommizationTime(dateTimeStamp){
        var result;
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if(diffValue &lt; 0){
            //非法操作
            //alert("结束日期不能小于开始日期！");
        }
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;

        if(monthC&gt;=1){
            result="" + parseInt(monthC) + "个月前发表";
        }
        else if(weekC&gt;=1){
            result="" + parseInt(weekC) + "个星期前发表";
        }
        else if(dayC&gt;=1){
            result=""+ parseInt(dayC) +"天前发表";
        }
        else if(hourC&gt;=1){
            result=""+ parseInt(hourC) +"个小时前发表";
        }
        else if(minC&gt;=1){
            result=""+ parseInt(minC) +"分钟前发表";
        }else
            result="刚刚发表";
        return result;
    }

原理就是根据不同的时间单位用当前和发表时的时间差来相除，看，是不是so easy！


