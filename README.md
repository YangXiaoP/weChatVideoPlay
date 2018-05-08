# weChatVideoPlay

##介绍
1.此项目是从个人做的一块小程序中剥离出来的，因为当时需要做视频播放，后台存放视频文件又不现实。所以，做了这个解析腾讯视频地址的小程序。
2.小程序里的解析腾讯视频地址的代码是参考了一个开源项目[you-get](https://github.com/soimort/you-get)写的，把里面的腾讯视频下载的python代码写成了JS代码。

###如何使用
把项目中最重要的两部分代码拷贝到你的项目中即可,在videoPlay.js中。

* 1 获取视频信息

```javascript
getVideoInfo: function (vid) {
    var that = this;
    var videoUrl = 'https://vv.video.qq.com/getinfo?otype=json&appver=3.2.19.333&platform=11&defnpayver=1&vid=' + vid;
    wx.request({
      url: videoUrl, 
      success: function (res) {
        var dataJson = res.data.replace(/QZOutputJson=/, '') + "qwe";
        var dataJson1 = dataJson.replace(/;qwe/, '');
        var data = JSON.parse(dataJson1);
        var fn_pre = data.vl.vi[0].lnk
        host = data['vl']['vi'][0]['ul']['ui'][0]['url']
        var streams = data['fl']['fi']
        var seg_cnt = data['vl']['vi'][0]['cl']['fc']
        if (parseInt(seg_cnt) == 0) {
          seg_cnt = 1
        }
        var best_quality = streams[streams.length - 1]['name']
        var part_format_id = streams[streams.length - 1]['id']

        for (var i = 1; i < (seg_cnt + 1); i++) {
          var filename = fn_pre + '.p' + (part_format_id % 10000) + '.' + i + '.mp4';
          console.log(filename);
          pageArr.push(i);
          that.requestVideoUrls(part_format_id, vid, filename, 'index' + i);

        }

      }
    })
  },
```
*2 根据视频信息解析视频真正的播放地址

```javascript
requestVideoUrls: function (part_format_id, vid, fileName, index) {
    var keyApi = "https://vv.video.qq.com/getkey?otype=json&platform=11&format=" + part_format_id + "&vid=" + vid + "&filename=" + fileName + "&appver=3.2.19.333"
    var that = this;
    wx.request({
      url: keyApi,
      success: function (res) {
        var dataJson = res.data.replace(/QZOutputJson=/, '') + "qwe";
        var dataJson1 = dataJson.replace(/;qwe/, '');
        var data = JSON.parse(dataJson1);
        if (data.key != undefined) {
          var vkey = data['key']
          var url = host + fileName + '?vkey=' + vkey;
          part_urls[index] = String(url)
          that.setData({
            videUrl: part_urls.index1
          });
        }
      }
    })
  },

```



