---
id: how-to-resolve-163-mail-anti-spam
title: 网易 163 邮箱在 smtp 发送时被认为是垃圾邮件的解决办法
---

发送邮件时，将自己的邮箱加入抄送列表中，应该可以解决


以 Node.js 的 nodemailer 库 SMTP 为例
```js
const from = 'abc@xxx.com'
const to = 'def@xxx.com'

const sendMailOptions = {
  from: from,
  to: to,
  cc: from,
  subject: 'this is a subject',
  html: 'hello !'
};

client.sendMail(sendMailOptions)
```
