const db = wx.cloud.database()
const write = db.collection('writelite')
Page({
  data:{
    img:'',
    write:'',
    english:''
  },
  onLoad(){
    write.get().then(res=>{
      // console.log(res)
      let num = Math.round(Math.random()*(10))
      console.log(num)
      this.setData({
        img:res.data[num].img,
        write:res.data[num].Ctext,
        english:res.data[num].Etext,
      })
    })
  }
})