const db=wx.cloud.database()
const pics=db.collection('pics')
const votes=db.collection('votes')
let $ = db.command.aggregate
Page({
  data:{
    maxvote:3,
    count:0
  },
  async onLoad(option){
    let res = await wx.cloud.callFunction({
      name:'getPics'
    })
    console.log(res)
    let plist = res.result.plist
    this.setData({
      plist
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
    console.log('login:',res)
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
    console.log('votecount1',res)
    let votecount = 0
    if(res.list[0]){
      votecount = res.list[0].count
    }
    this.setData({
      votecount
    })
      
  },
  tap(e){
    this.setData({
      fileid:e.currentTarget.dataset.id
    })
     this.onLoad()
     console.log('tap.vo',this.data.votecount)
    let count = 3-this.data.votecount
    let count2 = count-1
    if(count>0){
    console.log(e)
    votes.add({
      data:{
        fileid:e.currentTarget.dataset.id,
      }
    }).then(res=>{
      console.log('finish',res)
      if(res.errMsg.indexOf('ok')>-1){
        wx.showToast({
          title: '还有'+count2+'次投票机会',
        })
      }
    })
  }else{
    wx.showToast({
      title: '超过投票次数',
      icon:'error'
    })
  }
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
    this.setData({
      count
    })
  },
  change(e){
    console.log(e)
    this.count(e.detail.current)
  }
})