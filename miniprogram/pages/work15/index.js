const db=wx.cloud.database()
const pics=db.collection('pics')
const votes=db.collection('votes')
Page({
  async onLoad(option){
    let res = await pics.get()
    this.setData({
      plist:res.data
    })
    let fileid = this.data.fileid
    if(fileid){
      let index = res.data.findIndex(v=>{
        return v.fileid == fileid
      })
      this.setData({index})
    }
  },
  tap(e){
    console.log(e)
    votes.add({
      data:{
        fileid:e.currentTarget.dataset.id
      }
    }).then(res=>{
      console.log(res)
      if(res.errMsg.indexOf('ok')>-1){
        wx.showToast({
          title: '投票成功',
        })
      }
    })
  },
  async long(){
    let res = await wx.chooseImage({
      count: 1,
    })
    console.log(res)
    let filename = res.tempFilePaths[0]
    let purefilename=filename.split('/').slice(-1)[0]
    res = await wx.cloud.uploadFile({
      cloudPath:'work15/'+purefilename,
      filePath:filename
    })
    console.log(res)
    let fileid = res.fileID
    res = await pics.add({
      data:{
        fileid
      }
    })
    if(res.errMsg.indexOf('ok')>-1){
      wx.showToast({
        title: '上传成功',
      })
    }
    this.setData({
      fileid
    })
    this.onLoad({fileid})
  }
})