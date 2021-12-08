const url='https://m.douban.com/rexxar/api/v2/search?q='
Page({
  onLoad(option){
    console.log(option)
    wx.showLoading({
      title: '正在搜索',
    })
    wx.request({
      url:url+option.title,
      success:res=>{
        console.log(res)
        this.setData({
          search:res.data
        })
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  }
})