---
slug: intercepte-request-on-page-with-puppeteer
title: 通过 puppeteer 渲染页面时如何拦截请求或者修改请求 URL
tags: [node.js ,chrome-headless ,puppeteer]
---

```js
const puppeteer = require('puppeteer');
const pageUrl = 'https://some-url.com';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  page.on('request', (interceptedRequest) => {
    // Don't intercept main document request
    if (interceptedRequest.url === pageUrl) {
      interceptedRequest.continue();
      return;
    }

    // Intercept if request url starts with https
    if (interceptedRequest.url.startsWith('https://')) {
      interceptedRequest.continue({
        // Replace https:// in url with http://
        url: interceptedRequest.url.replace('https://', 'http://'),
      });
      return;
    }

    // Don't override other requests
    interceptedRequest.continue();
  })

  await page.goto(pageUrl);
  await browser.close();
})();
```
