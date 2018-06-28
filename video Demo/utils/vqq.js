export var part_urls = new Array(); 

export function getVideoInfo(vid){
    var that = this;
    var videoUrl = 'https://vv.video.qq.com/getinfo?otype=json&appver=3.2.19.333&platform=11&defnpayver=1&vid=' + vid;
    console.log(vid);
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
        //   pickerArr.push('片段' + i + '')
         return requestVideoUrls(part_format_id, vid, filename, 'index' + i);

        }

      }
    })
}
function requestVideoUrls(part_format_id, vid, fileName,index){
    var keyApi = "https://vv.video.qq.com/getkey?otype=json&platform=11&format=" + part_format_id + "&vid=" + vid + "&filename=" + fileName + "&appver=3.2.19.333"
    var that = this;
    return new Promise((resolve, reject) => {
    wx.request({
      url: keyApi,
      success: function (res) {
        console.log(res.data);
        var dataJson = res.data.replace(/QZOutputJson=/, '') + "qwe";
        var dataJson1 = dataJson.replace(/;qwe/, '');
        var data = JSON.parse(dataJson1);
        if (data.key != undefined) {
          var vkey = data['key']
          var url = host + fileName + '?vkey=' + vkey;
          part_urls[index] = String(url)
          resolve(part_urls)
         
        }else{
            reject(data)
        }
      }
    })
})
}