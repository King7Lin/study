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
    let user = app.globalData.user
    let choosen = app.globalData.user.choosen
    if(choosen.length==0){
      choosen = directions
    }
    user.choosen = choosen
    this.setData({
      directions,
      user
    })
  },
  change(e){
    console.log('change',e)
    let choosen = this.data.user.choosen
    let picked = this.data.directions[Number(e.detail.value)]
    //若当前志愿选择在前面出现过，return
    let found = choosen.indexOf(picked)
    if(found<=e.currentTarget.dataset.id){
      wx.vibrateShort({
        type: 'ligh',
      })
      let errMsg =`第${found+1}志愿已经选${picked}`
      wx.showToast({
        title: errMsg,
      })
      return
    }else{
      choosen.splice(e.currentTarget.dataset.id,0,picked)
      choosen.splice(choosen.lastIndexOf(picked),1)
    }
    let user = this.data.user
    user.choosen = choosen
    this.setData({
      user
    })
  },
  async post(){
    let res = await wx.cloud.callFunction({
      name:'pc_post',
      data:{
        user:this.data.user
      }
    })
    console.log(res)
    if(res.result.res.errMsg.indexOf('ok')>-1){
      await wx.showToast({
        title: '提交成功',
        duration:2000,
      })
      wx.navigateTo({
        url: '/pages/work18/list',
      })
    }
  }
})