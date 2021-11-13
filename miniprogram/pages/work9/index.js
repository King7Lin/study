Page({
  data:{
      isincome:true,
      incomelist:[],
      paylist:[],
      isinput:false,
      incometotal:0,
      paytotal:0,
      inputval:'',
      date: '0000-00-00',
      Ptime:[],
      Itime:[]
  },
  bindDateChange: function(e) {
    // console.log(e.detail.value)
    let Ptime=this.data.Ptime
    let Itime=this.data.Itime
    if(this.data.isincome){
         Itime.push(e.detail.value)
    }else{
        Ptime.push(e.detail.value)
    }
    console.log(Ptime)
    this.setData({
      date: e.detail.value,
      Ptime:Ptime,
      Itime:Itime
    })
  },
  add(){
      this.setData({
          isinput:!this.data.isinput
      })
  },
  click(e){
      console.log(e)
      if(e.currentTarget.dataset.name=='income'){
          this.setData({
              isincome:true
          })
      }else{
          this.setData({
              isincome:false
          })
      }
  },
  
  confirm(e){
      console.log(typeof incomelist)
      let je =Number(e.detail.value)
      let incomelist=this.data.incomelist
      let paylist=this.data.paylist
      if(this.data.isincome){
          incomelist.push(je)
          let incometotal=incomelist.reduce((sum,v)=>{
              return sum+=v
          },0)
          this.setData({
              incomelist,
              inputval:'',
              isinput:false,
              incometotal
          })
      }else{
          paylist.push(je)
          let paytotal =paylist.reduce((sum,v)=>{
              return sum+=v
          },0)
          this.setData({
              paylist,
              inputval:'',
              isinput:false,
              paytotal,
          })
      }
  },
  del(e){//清除
    console.log(e)
    let that=this
    if(that.data.incomelist.length>=0&&that.data.paylist.length>=0){
        let iTotal=0
        let iList=[]
        let pTotal=0
        let pList=[]
        let Ptime=[]
        let Itime=[]
        Ptime=that.data.Ptime
        Itime=that.data.Itime
        pList=that.data.paylist
        pTotal=that.data.paytotal
        iTotal=that.data.incometotal
        iList=that.data.incomelist
    
    if(that.data.isincome){
        iTotal-=that.data.incomelist[iList.length-1]
        iList.splice(iList.length-1,1)
        Itime.splice(iList.length-1,1)
        that.data.incomelist=iList
        that.data.incometotal=iTotal
        that.setData({
            incomelist:iList,
            incometotal:iTotal,
            Itime:Itime
        })
    }else{
        pTotal-=that.data.paylist[pList.length-1]
        pList.splice(pList.length-1,1)
        Ptime.splice(pList.length-1,1)
        that.data.paylist=pList
        that.data.paytotal=pTotal
        that.setData({
            paylist:pList,
            paytotal:pTotal,
            Ptime:Ptime
        })
    }
    // that.onHide(iList,pList,iTotal,pTotal,Ptime,Itime)
}
  },
  onUnload(){
      this.onHide()
  },
  onHide(){
    []
    //   if(iList&&pList&&iTotal&&pTotal&&Ptime&&Itime){
        //    store =[iList,pList,iTotal,pTotal,Ptime,Itime]
    //   }else{
        let store = [this.data.incomelist,this.data.paylist,this.data.incometotal,this.data.paytotal,this.data.Ptime,this.data.Itime]
    //   }
      
      wx.setStorage({
          data:store,
          key:'money'
      })
  },
  onLoad(option){
      let that=this
      wx.getStorage({
          key:'money',
          success(e){
              console.log(e)
              that.setData({
                  incomelist:e.data[0],
                  paylist:e.data[1],
                  incometotal:e.data[2],
                  paytotal:e.data[3],
                  Ptime:e.data[4],
                  Itime:e.data[5],
              })
          }
      })
  }
})