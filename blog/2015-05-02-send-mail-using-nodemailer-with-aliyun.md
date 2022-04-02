---
slug: send-mail-using-nodemailer-with-aliyun
title: nodemailer 使用阿里云邮箱发送邮件(2016.10.28更新)
tags: [node.js ,nodemailer]
---

本示例已于2016-10-18更新。github demo也同时更新。

在网上搜索nodemailer发送邮件的例子，大多是通过Gmail、QQ等的私人邮箱来发送邮件的，smtp服务器也是平台上的。

而可能我们在自己开发过程中的场景是自有的企业邮箱，比如我就是用的阿里云的企业邮箱免费版，而绑定的域名是我自己的 `smtp.gaoqixhb.com`。

那么要怎么设置呢，做了个例子。


注意：这里用的 `nodemailer` 包的版本不是最新的，是2.5.0(<del>0.3.43</del>已升级)。


github地址：`https://github.com/luoyjx/nodemailer-demo`


先是创建一个transport：

```js
var mailer        = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transport = mailer.createTransport(smtpTransport({
    host: 'smtp.gaoqixhb.com',
    port: 25,
    auth: {
        user: 'system@gaoqixhb.com',
        pass: 'your password'
    }
}));
```
然后接着就是要发送的邮件数据：

```js
var mailOptions = {
    from: '搞起博客 <system@gaoqixhb.com>', // 如果不加<xxx@xxx.com> 会报语法错误
    to: '1111@xx.com,222@xx.com,333@xx.com', // list of receivers
    subject: '这是一封测试邮件', // Subject line
    html: 'Hello world ！     <p> 这是一封用nodejs的nodemailer发送的测试邮件。</p> ' +
	'<p> 示例分享到了github上：<a href=\"https://github.com/luoyjx/nodemailer-demo\">https://github.com/luoyjx/nodemailer-demo</a></p>'// html body
};
```
最后是发送：

```js
transport.sendMail(data, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
```
