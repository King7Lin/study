//app.js
App({
  onLaunch: async function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'lin-0gd1s4ir5c7fcba1',
        traceUser: true,
      })
    }

    // let res = await wx.cloud.callFunction({
    //   name:'pc_login'
    // })
    // console.log(res)
    // this.globalData = {}
    // if(res.result.result.name=='nobody'){
    //   wx.navigateTo({
    //     url: '/pages/work18/index',
    //   })
    // }else{
    //   this.globalData.user = res.result.result
    //   if(res.result.result.choosen?.length>0){
    //     wx.navigateTo({
    //       url: '/pages/work18/list',
    //     })
    //   }else{
    //     wx.navigateTo({
    //       url: '/pages/work18/rank',
    //     })
    //   }
    // }
    
  }
})
