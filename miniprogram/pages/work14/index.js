const urlmove = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items?count=5'
const urltv = 'https://m.douban.com/rexxar/api/v2/subject_collection/tv_hot/items?count=5'
const urlzy = 'https://m.douban.com/rexxar/api/v2/subject_collection/tv_variety_show/items?count=5'
Page({
  onLoad(){
    wx.request({
      url:urlmove,
      success:res=>{
        console.log(res)
        this.setData({
          movie:res.data.subject_collection_items
        })
      }
    }),
    wx.request({
      url:urltv,
      success:res=>{
        console.log(res)
        this.setData({
          tv:res.data.subject_collection_items
        })
      }
    }),
    wx.request({
      url:urlzy,
      success:res=>{
        console.log(res)
        this.setData({
          zy:res.data.subject_collection_items
        })
      }
    })
  }
})