const db=wx.cloud.database()
const pics=db.collection('pics')
const votes=db.collection('votes')
let $ = db.command.aggregate
Page({
  data:{
    maxvote:5
  },
  async onLoad(option){
    let res = await pics.get()
    this.setData({
      plist:res.data
    })
    res = await votes.aggregate()
                     .group({
                       _id:'$fileid',
                       count:$.sum(1)
                     })
                     .end()
    console.log(res)
    let vlist = res.list
    this.setData({
      vlist
    })
    let fileid = this.data.fileid
    if(fileid){
      let index = this.data.plist.findIndex(v=>{
        return v.fileid == fileid
      })
      this.setData({index})
      this.count(index)
    }
    res = await wx.cloud.callFunction({
      name:'login'
    })
    
    let openid = res.result.openid
    this.setData({
      openid
    })
    res = await votes.aggregate()
                     .match({
                       _openid:openid
                     })
                     .group({
                       _id:'$fileid',
                       count:$.sum(1)
                     })
                     .end()
    
    let votecount = res.list[0].count
    this.setData({
      votecount
    })
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
    this.setData({
      fileid:e.currentTarget.dataset.id
    })
    this.onLoad()
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
    this.onLoad()
  },
  count(index){
    let v = this.data.vlist.find(v=>{
      return v._id==this.data.plist[index].fileid
    })
    let count = 0
    if(v){
       count =v.count
    }
    
    wx.setNavigationBarTitle({
      title: index+1 + '/' + this.data.plist.length + ' ' + count + '票',
    })
  },
  change(e){
    console.log(e)
    this.count(e.detail.current)
  }
})