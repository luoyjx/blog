---
slug: upload-image-using-qiniu-node-sdk
title: 折腾七牛 Node-sdk 的图片上传
tags: [node.js ,七牛]
---

 之前是在sdk下面的评论看到[fengmk2][0]大神的qn三方sdk，结果用着用着，我本地的可以上传，但是放到阿里云上就传不了了。

今天回来直接用了官方的sdk，可以了。

分享下过程：

官方文档 ：`http://developer.qiniu.com/docs/v6/sdk/nodejs-sdk.html#sdk-usage`

这里是官方的nodejs sdk的上传文档了。

 因为我的富文本编辑器是用的kindediter，有个上传的UI，于是我就懒得去改界面了。

 所以我采取的策略是：

 客户端 -&gt; 业务服务器 -&gt; 七牛服务器

 我先把文件上传到业务服务器（就是我的服务器）之后，再来读二级制流上传到七牛服务器去。

 直接贴代码吧：
```js
    /**
     * 上传请求
     * @param req
     * @param res
     */
    exports.doUpload = function(req, res){
    	//console.log(req.files);
        if(req.files['imgFile'].size == 0){
            //使用同步方式删除一个文件
            fs.unlinkSync(req.files[i].path);
            console.log(' Successsfully removed an empty file!');
        } else {
            var target_path = '&lt; 我本地存图片的路径 &gt;' + req.files['imgFile'].name;
            console.log(target_path);
            //使用同步方式重命名一个文件
            var readStream = fs.createReadStream(req.files['imgFile'].path);
            var writeStream = fs.createWriteStream(target_path);
            readStream.pipe(writeStream, function(){
                fs.unlinkSync(req.files[i].path);
            });
            qiniu.conf.ACCESS_KEY = qiniu_config.AK;//qiniu_config是我的配置文件
            qiniu.conf.SECRET_KEY = qiniu_config.SK;
            var uptoken = new qiniu.rs.PutPolicy(qiniu_config.bucket).token();
            var extra = new qiniu.io.PutExtra();
            console.log( "file is exists ? " + fs.existsSync(target_path));
            fs.readFile(target_path, function(err, data){
                console.log("data length is " + data.length);
                qiniu.io.put(uptoken, 'img/' + req.files['imgFile'].name, data, extra, function(err, ret) {
                    if(!err) {
                        // 上传成功， 处理返回值
    //                    console.log(ret.key, ret.hash);
                        res.write(JSON.stringify({
                            "error" : 0,
                            "url" : qiniu_config.domain + ret.key
                        }));
                        console.log("上传成功！");
                    } else {
                        // 上传失败， 处理返回代码
    //                    console.log(err);
                        // http://developer.qiniu.com/docs/v6/api/reference/codes.html
                        res.write(JSON.stringify({
                            "error" : 1,
                            "message" : "上传失败"
                        }));
                        console.log("上传失败！");
                    }
                    res.end();
                    fs.unlinkSync(target_path);
                });
            });
        }
    };
```

然后在文本编辑器中就可以看到你上传的图片了。

 顺便推荐一下，七牛是注册后上传手持身份证照，可以变成标准用户。

 福利：

1. 免费存储空间10GB
1. 免费每月下载流量10GB
1. 免费每月PUT/DELETE 10万次请求
1. 免费每月GET 100万次请求

 对于刚开始的小站来说应该是够用了。

 贴上邀请地址：[**https://portal.qiniu.com/signup?code=3l9nuugzositu**][1]

[0]: https://cnodejs.org/user/fengmk2
[1]: https://portal.qiniu.com/signup?code=3l9nuugzositu
