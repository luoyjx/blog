---
slug: nodejs-download-file-to-local-using-axios
title: axios 下载文件并保存到本地
tags: [node.js ,axios]
---

```js
const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

async function downloadImage () {
  const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
  const path = Path.resolve(__dirname, 'images', 'code.jpg')
  const writer = Fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

downloadImage()
```

主要注意的是
* responseType: 'stream'
* response.data.pipe(writer)
