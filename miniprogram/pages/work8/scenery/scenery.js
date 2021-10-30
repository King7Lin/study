// pages/work8/Scenery/Scenery.js
Page({
  data: {
    content:'宏伟的教学楼',
    background:[
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/hongweidejiaoxuelou.jpg',content:'宏伟的教学楼'},
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/dianzishixunlou.jpg',content:'电子实训楼 '},
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/xinxilou.jpg',content:'图文信息楼'},
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/shukongshixunlou.jpg',content:'数控实训楼'},
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/qicheshixunlou.jpg',content:'汽车实训楼'},
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/ximen.jpg',content:'学校西门'},
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/luomaguangchang.jpg',content:'罗马广场'},
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/jiaoxuelou.jpg',content:'教学楼'},
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/jiaoxuequceying.jpg',content:'教学区侧景'},
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/sushe.bmp',content:'宿舍'},
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/sushelou.bmp',content:'学生宿舍楼'},
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/tushuguang.jpg',content:'图书馆'},
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/keshi.bmp',content:'多媒体课室'} ,
      {src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/image/fantang.bmp',content:'饭堂'
      }
    ],
  },
  bindchange(e){
    let index =e.detail.current
    let content=this.data.background[index].content
    this.setData({
      content
    })
  }
})