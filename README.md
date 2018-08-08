# weChatVideoPlay

###1.介绍

1.此项目是从个人做的一块小程序中剥离出来的，因为当时需要做视频播放，后台存放视频文件又不现实。所以，做了这个解析腾讯视频地址的小程序。
2.小程序里的解析腾讯视频地址的代码是参考了一个开源项目[you-get](https://github.com/soimort/you-get)写的，把里面的腾讯视频下载的python代码写成了JS代码。

###2.腾讯视频ID从哪获取

1.一般播放一个腾讯视频的时候播放地址为`https://v.qq.com/x/page/w0647n5294g.html`。
`.html`到最后一个`/`之间的字符串即为腾讯视频id。如`https://v.qq.com/x/page/w0647n5294g.html`的id为`w0647n5294g`。

###3.如何使用
 1.把项目的utils文件夹的`qqVideo.js`文件导入你自己的项目的utils文件夹中

2.在需要播放视频界面的js文件里导入`qqVideo.js`文件：`import qqVideo from "../../utils/qqVideo.js"`

3.调用获取视频列表的方法

```javascript
//vid是需要传的视频id
//返回值 response为返回的播放列表
 qqVideo.getVideoes(vid).then(function (response) {
      })
```


