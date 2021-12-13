const baseurl = 'https://m.douban.com/rexxar/api/v2/'
Page({
  data:{
    start:0,
    count:5
  },
  onLoad(option){
    // console.log(option)
    let xq = baseurl + option.type +'/'+ option.id
    let bq = baseurl + option.type + '/' + option.id + '/tags?count=10'
    let dp = baseurl + option.type + '/' + option.id + '/interests?start=' + this.data.start + '&count=' + this.data.count
    wx.request({
      url: xq,
      success:res=>{
        // console.log(res)
        let mygenres = res.data.genres.join('/')
        let myactors = res.data.actors.slice(0,3).map(v=>{
          return v.name
        }).join('/')
        this.setData({
          xq:res.data,
          mygenres,
          myactors
        })
      }
    })
    wx.request({
      url: bq,
      success:res=>{
        // console.log(res)
        this.setData({
          bq:res.data
        })
      }
    })
    wx.request({
      url: dp,
      success:res=>{
        // console.log(res)
        let dptotal=res.data.total
        this.setData({
          dp:res.data.interests,
          dptotal
        })
      }
    })
    this.setData({
      id:option.id,
      type:option.type
    })
  },
  onReachBottom(){
    this.setData({
      start:this.data.start + this.data.count
    })
    let dp = baseurl + this.data.type + '/' + this.data.id + '/interests?start=' + this.data.start + '&count=' + this.data.count
    wx.request({
      url: dp,
      success:res=>{
        let newdp = res.data.interests
        let dp = this.data.dp.concat(newdp)
        this.setData({
          dp
        })
      }
    })
  }
})