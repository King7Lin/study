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
    src:'images/c.png'
  },  
  click(e){
    console.log(e)
    let num=e.currentTarget.dataset.id
    let l=this.data.list
    l.forEach(v=>{
      v.active=false
    })
    l[num].active=true
    let src='images/'+l[num].name.toLowerCase()+'.png'
    this.setData({
      list:l,
      src
    })
  }
   
})