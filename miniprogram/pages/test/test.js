Page({
  data:{
    msg:'惊喜不惊喜',
    list:[
      {name:'stu1',score:{miniapp:80,linux:75,php:85}},
      {name:'stu2',score:{miniapp:81,linux:75,php:85}},
      {name:'stu3',score:{miniapp:82,linux:75,php:85}},
      {name:'stu4',score:{miniapp:83,linux:75,php:85}},
      {name:'stu5',score:{miniapp:84,linux:75,php:85}},
    ]
      
  },
  click(e){
    console.log(e)
    const id =e.currentTarget.dataset.id
    const str=this.data.list[id].name+"linux成绩"
    +this.data.list[id].score.linux
    wx.showToast({
      title: str,
    })
  }
})