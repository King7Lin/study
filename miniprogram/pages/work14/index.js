const urlmove = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items?count=10'
const urltv = 'https://m.douban.com/rexxar/api/v2/subject_collection/tv_hot/items?count=10'
const urlzy = 'https://m.douban.com/rexxar/api/v2/subject_collection/tv_variety_show/items?count=10'
Page({
  data:{
    title:'',
  },
  input(e){
    console.log(e)
    this.setData({
      title:e.detail.value
    })
  },
  search(){
    wx.navigateTo({
      url: 'search?title='+this.data.title,
    })
  },
  commitSearch (res) {  // 点击键盘上的搜索
    let val = ((res.detail || {}).value || '').replace(/\s+/g, '')
    this.search(val)
  },
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
  },
  
})