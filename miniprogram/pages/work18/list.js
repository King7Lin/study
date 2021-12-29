let app = getApp()
const db =wx.cloud.database()
const directionsCollection=db.collection('directions')

Page({
  data:{
    user:null,
    list:[],
    directions:[],
    nums:[],
    tab:0,
    result:''
  },
  async onLoad(options){
    res = await directionsCollection.where({}).get()
    let directions = res.data.map(v=>{
      return v.name
    })
    let nums = res.data.map(v=>{
      return v.num
    })
    let res = await wx.cloud.callFunction({
      name:'pc_statistics'
    })
    console.log('pc',res)
    let result = res.result.list.find(v=>{
      return v.name == app.globalData.user.name
    }).choosen
    console.log(res)
    let tab = directions.indexOf(result)
    let list = []
    directions.forEach(v=>{
      list.push(res.result.list.filter(vv=>{
        return vv.choosen == v
      }))
    })
    this.setData({
      user:app.globalData.user,
      list,
      result,
      tab,
      directions,
      nums
    })
  }
})