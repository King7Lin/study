Page({
  data:{
      isincome:true,
      incomelist:[],
      paylist:[],
      isinput:false,
      incometotal:0,
      paytotal:0,
      inputval:'',
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
  del(e){
    console.log(e)
    let that=this
    if(that.data.incomelist.length>=0&&that.data.paylist.length>=0){
        let iTotal=0
        let iList=[]
        let pTotal=0
        let pList=[]
        pList=that.data.paylist
        pTotal=that.data.paytotal
        iTotal=that.data.incometotal
        iList=that.data.incomelist
    
    if(that.data.isincome){
        iTotal-=that.data.incomelist[iList.length-1]
        iList.splice(iList.length-1,1)
        that.data.incomelist=iList
        that.data.incometotal=iTotal
        that.setData({
            incomelist:iList,
            incometotal:iTotal
        })
    }else{
        pTotal-=that.data.paylist[pList.length-1]
        pList.splice(pList.length-1,1)
        that.data.paylist=pList
        that.data.paytotal=pTotal
        that.setData({
            paylist:pList,
            paytotal:pTotal
        })
    }
    that.onHide(iList,pList,iTotal,pTotal)
}
  },
  onUnload(){
      this.onHide()
  },
  onHide(iList,pList,iTotal,pTotal){
    let store =[]
      if(iList&&pList&&iTotal&&pTotal){
           store =[iList,pList,iTotal,pTotal]
      }else{
         store=[this.data.incomelist,this.data.paylist,this.data.incometotal,this.data.paytotal]
      }
      
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
                  paytotal:e.data[3]
              })
          }
      })
  }
})