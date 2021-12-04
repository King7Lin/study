const urlmove = 'https://vue3antdv-7gcma6b228a5b287-1256680780.tcloudbaseapp.com/api/v2/subject_collection/movie_showing/items'
const urltv = 'https://vue3antdv-7gcma6b228a5b287-1256680780.tcloudbaseapp.com/api/v2/subject_collection/tv_hot/items'
const urlzy = 'https://vue3antdv-7gcma6b228a5b287-1256680780.tcloudbaseapp.com/api/v2/subject_collection/tv_variety_show/items'
Page({
  onLoad(){
    wx.request({
      url:urlmove,
      success:res=>{
        console.log(res)
        this.setData({
          movie:res.data.ssubject_collection_item
        })
      }
    })
    wx.request({
      url:urltv,
      success:res=>{
        console.log(res)
        this.setData({
          tv:res.data.ssubject_collection_item
        })
      }
    }),
    wx.request({
      url:urlzy,
      success:res=>{
        console.log(res)
        this.setData({
          zy:res.data.ssubject_collection_item
        })
      }
    })
  }
})