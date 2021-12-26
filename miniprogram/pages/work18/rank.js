let app = getApp()
const db = wx.cloud.database()
const directionsCollection = db.collection('directions')
Page({
  data:{
    user:null,
    directions:[]
  },
  async onLoad(){
    let res = await directionsCollection.get()
    console.log(res)
    let directions = res.data.map(v=>{
      return v.name
    })
    this.setData({
      directions,
      user:app.globalData.user
    })
  }
})