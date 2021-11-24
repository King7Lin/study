const db = wx.cloud.database()
const musiclist = db.collection('musiclist')
const audioCtx=wx.createInnerAudioContext()
Page({
  onLoad(){
    // wx.setInnerAudioOption({
    //   mixWithOther: true,
    //   obeyMuteSwitch:false,
    // });
    musiclist.get().
    then(res=>{
      console.log(res)
      this.setData({
        musiclist:res.data
      })
    })
  },
  click(e){
    console.log(e)
    let index = e.currentTarget.dataset.id
    console.log(index)
    audioCtx.src = musiclist[index].src
    audioCtx.play()
  }
})