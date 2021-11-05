Page({
  data:{
    list:[
      {name:'C',active:true},
      {name:'D',active:false},
      {name:'E',active:false},
      {name:'F',active:false},
      {name:'G',active:false},
      {name:'A',active:false},
      {name:'B',active:false},
    ],
    src:'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work4/c.png'  
  },
  click(e){
    console.log(e)
    let num=e.currentTarget.dataset.id
    let l=this.data.list
    l.forEach(v=>{
      v.active=false
    })
    l[num].active=true
    let src='cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work4/'+l[num].name.toLowerCase()+'.png'
    this.setData({
      list:l,
      src
    })
  }
   
})