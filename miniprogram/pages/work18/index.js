let app = getApp()
Page({
    data:{
        nickName:'',
        avatarUrl:''
    },
    async getUserProfile(){
        let res = await wx.getUserProfile({
          desc: '用于分专业方向完善用户信息',
        })
        console.log(res)
        let {avatarUrl,nickName} = res.userInfo
        this.setData({
            nickName,avatarUrl
        })
    },
    async formsubmit(e){
        console.log(e)
        let {sn,name}=e.detail.value
        if(!this.data.nickName){
            wx.showToast({
              title: '请获取微信账号信息',
            })
            return
        }
        if(!sn||!name){
            wx.showToast({
              title: '请输入学号和姓名',
            })
            return
        }

        if(!/^\d{8}$/.test(sn)){
            wx.showToast({
              title: '请输入8位数字的学号',
            })
            return
        }
        let nickName = this.data.nickName
        let avatarUrl = this.data.avatarUrl
        let res = await wx.cloud.callFunction({
          name:'pc_register',
          data:{
            sn,name,nickName,avatarUrl
          }
        })
        console.log(res)
        if(res.result.reg=='ok'){
          wx.showToast({
            title: '绑定成功',
          })
          app.globalData.user = res.result.user
          wx.navigateTo({
            url: '/pages/work18/rank',
          })
        }else{
          wx.showModal({
            cancelColor: 'cancelColor',
            title:res.result.reg,
            content:res.result.errMsg
          })
        }
    }
})