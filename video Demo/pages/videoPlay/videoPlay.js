
var part_urls = {};
var videoPage;
var pageArr = new Array()
import qqVideo from "../../utils/qqVideo.js"

Page({
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
    var that  = this;
    const vid = options.vid;
    console.log(vid);
    qqVideo.getVideoes(vid).then(function (response) {
      
      for(var i=1;i<response.length+1;i++){
        var indexStr = 'index'+(i)
        pageArr.push(i);
        part_urls[indexStr] = response[i-1];
      }
      that.setData({
        videUrl: response[0],
      });
    });
  },
  // 因为视频超过10分钟之后，会分段，所以当视频为多段的时候，
  // 自动播放下一段视频
  playEnd: function () {

    if (videoPage >= parseInt(pageArr.length)) {
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