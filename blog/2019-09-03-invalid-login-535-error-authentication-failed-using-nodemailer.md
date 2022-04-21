---
slug: invalid-login-535-error-authentication-failed-using-nodemailer
title: nodemailer 使用 126 邮箱时的踩坑，报错 Invalid login 535 Error authentication failed
tags: [node.js]
---

## 错误
如果你在使用 nodemailer smtp 发送邮箱时遇到了以下错误：

```js
Error: Invalid login: 535 Error: authentication failed
```


也许是因为需要使用「客户端授权码」的问题。

## 解决

```js
const _ = require('lodash')
const nodemailer = require('nodemailer')

async function main () {
  const mailer = nodemailer.createTransport({
    host: 'smtp.126.com',
    port: 465,
    pool: true,
    secure: true,
    auth: {
      type: 'login',
      user: 'xxxxx@126.com',
      pass: 'xxxxx'    // 如果开启了客户端授权码，则这里需要填写客户端授权码
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const sendMailOptions = {
    from: 'xxxxxxx@126.com',
    to: 'xxxxxx@163.com',
    subject: ' 测试主题 ',
    html: ' 测试内容 '
  }

  const result = await mailer.sendMail(sendMailOptions)

  if (!_.startsWith(_.get(result, 'response'), '250 Mail OK')) {
    return Promise.reject(new Error('Send mail fail'))
  }

  return result.response
}

main()
```

## 参考

https://cnodejs.org/topic/55b78babf30671210b35fa31
