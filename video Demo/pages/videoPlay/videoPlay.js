
var part_urls = {};
var host;
var videoPage;
var pageArr = new Array()

Page({
  data: {
    videoUrls: '',
    token: ''
  },
  // 请求视频信息
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
  // 解析视频真正的地址
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

  onLoad: function (options) {
   
    if (options.vid != undefined) {
      this.setData({
        file_id: options.vid
      });
    } else {
  wx.showToast({
    title: '未传入视频id',
  })
    }


    videoPage = 1;
    pageArr = new Array();
    part_urls = {};
    // getVideoUrl("i0692mp8job").then(data => {
    //   console.log("测试");
    //   console.log(data);
    // });
    // this.getVideoInfo(this.data.file_id);
  },
  // 因为视频超过10分钟之后，会分段，所以当视频为多段的时候，
  // 自动播放下一段视频
  playEnd: function () {

    if (videoPage > parseInt(pageArr.length)) {
      // part_urls = {};
      videoPage = 1;
      this.videoContext.exitFullScreen
    } else {
      videoPage++;
      var index = 'index' + videoPage;
      this.setData({
        videUrl: ''
      });
      this.setData({
        videUrl: part_urls[index]
      });

    }
  },
  onReady: function () {
    // 页面渲染完成
    this.videoContext = wx.createVideoContext('myVideo')
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})