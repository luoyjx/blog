---
id: nodejs-email-example
title: 用 nodejs 做一下发送邮件例子
---

偶尔有用发个 email 的需求，以前写过，现在是自己的需求，一切以简洁为主。

像以往一样在命令行输入 `npm search xxx`，只不过这次的 xxx 是 mail，一切以简洁为主嘛，之后我就在长长的搜索结果中看到了 `nodemailer`，简介为 `“Easy to use module to send e-mails, supports unicode and SSL/TLS”`。安装完试用一下，能满足需求。

同样也是在 readme 中找如何使用。简单写个例子如下

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

transport.sendMail({
    from : "11111111@qq.com  <system@gaoqixhb.com>",
    to : "22222222@qq.com",
    subject: "邮件主题",
    generateTextFromHTML : true,
    html : "&lt;p&gt;这是封测试邮件&lt;/p&gt;"
}, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
    transport.close();
});
```
