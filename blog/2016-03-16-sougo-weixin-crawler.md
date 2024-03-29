---
slug: sougo-weixin-crawler
title: 记搜狗微信号搜索反爬虫
tags: [微信 ,爬虫]
---

## 反爬虫
RSS Factory前段时间又出问题了，访问微信公众号RSS一直500，完全没法用了。
经调试，发现由于爬取数据太频繁，触发了搜狗微信公众号的反爬虫，探索了下反爬虫的规则:

没有带Cookie的情况下，频繁访问触发反爬虫
* 带Cookie的情况下，频繁访问偶尔触发反爬出，偶现500错误
* 不带Cookie情况下，隔几个小时范围一下不会触发反爬虫
* Cookie有几个关键字段用于识别爬虫，SUID，SNUID，SUV。
不带Cookie请求任意搜狗微信公众号页面，应答set-cookie会带SUID，SNUID字段，SUV由JavaScript生成。

## 应对反爬虫
基于以上探索的反爬虫措施，制定应对反爬虫的策略。

* 维护一个Cookie池
* 爬取数据时随机取Cookie
* 定时更新Cookies池
## 实现

```
@tornado.gen.coroutine
def get_cookies():
    cookies = []
    client = tornado.httpclient.AsyncHTTPClient()
    for i in xrange(10):

        url = 'http://weixin.sogou.com/weixin?query=%s' % random.choice('abcdefghijklmnopqrstuvwxyz')

        # 获取 SNUID
        cookie_request = tornado.httpclient.HTTPRequest(url=url, method='HEAD')
        cookie = yield client.fetch(cookie_request)
        SUID = re.findall(r'(SUID=\S+?);', cookie.headers['set-cookie'])[0]
        m = re.findall(r'(SNUID=\S+?);', cookie.headers['set-cookie'])
        if m:
            SNUID = m[0]
            headers = {'Cookie:': '; '.join([SUID, getSUV(), SNUID])}
            cookies.append(headers)

    mc = memcache.Client(['%s:15211' % IP])

    if cookies:
        mc.set('cookie', cookies)
```

用到了tornado的协程，使用异步httpClient，发送请求时使用HEAD方法，只请求头部，通过解析set-cookie生成自己的Cookie头，连续不带Cookies访问1-次，生成Cookie池，并且保存在memcached中。

在调用tornado.ioloop.IOLoop.instance().start()之前，调用get_cookies()，任务就能正常运行了，但是我们需要定时更新Cookie池，所以还要添加定时任务。

tornado有两种方式可以定时运行可调用对象：
```
# 延时运行，接受 delta 延时时间间隔为 datetime.delta 对象，func 为可调用对象，但是只能调用一次，所以如果用 add_timeout 还需要在 func 中显式的再 add_timeout 才能实现定时调用
tornado.ioloop.IOLoop.instance().add_timeout(delta, func)

# 定时回调，以毫秒为单位，每 6 个小时调用一次
tornado.ioloop.PeriodicCallback(get_cookies, 6*60*60*1000).start()
```

## 效果
实现了定时任务后每6个小时会更新一次Cookie池，产生10个新的Cookie，爬取数据时使用随机Cookie明显降低了产生500的概率，效果良好。

欢迎使用RSS Factory。
