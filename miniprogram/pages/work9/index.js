Page({
  data:{
      isincome:true,
      incomelist:[],
      paylist:[],
      isinput:false,
      incometotal:0,
      paytotal:0,
      inputval:'',
      date: '2016-01-01',
      outputArr:[],
      tempArr:[]
  },
  bindDateChange: function(e) {
    this.setData({
        date: e.detail.value
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
  toarr(arr){
    let arr2=[]
    for(var key in arr)
    {  
        arr2.push([key,arr[key][0],arr[key][1]])
    }
    return arr2
    },
  confirm(e){
      console.log(typeof incomelist)
      let datearr=this.data.date.split('-')
       let date=datearr[0]+'-'+datearr[1]
      let je =Number(e.detail.value)
      let incomelist=this.data.incomelist
      let paylist=this.data.paylist
      let outputArr=this.data.outputArr
      let tempArr=this.data.tempArr
      if(this.data.isincome){
        incomelist.push(je)
        if(typeof outputArr[date]=='undefined'){
            outputArr[date]=[je,0]
        }else{
            outputArr[date][0]+=je
        }
        tempArr=this.toarr(outputArr)
          let incometotal=incomelist.reduce((sum,v)=>{
              return sum+=v
          },0)
          this.setData({
              incomelist,
              inputval:'',
              isinput:false,
              incometotal,
              outputArr,
              tempArr
          })
      }else{
          paylist.push(je)
          if(typeof outputArr[date]=='undefined'){
             outputArr[date]=[0,je]
            }else{
             outputArr[date][1]+=je
            }
        tempArr=this.toarr(outputArr)
          let paytotal =paylist.reduce((sum,v)=>{
              return sum+=v
          },0)
          this.setData({
              paylist,
              inputval:'',
              isinput:false,
              paytotal,
              outputArr,
              tempArr
          })
      }
  },
    //  onUnload(){
    //  this.onHide()
    // },
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
        pList=that.data.paylist
        pTotal=that.data.paytotal
        iTotal=that.data.incometotal
        iList=that.data.incomelist
    
    if(that.data.isincome){
        iTotal-=that.data.incomelist[iList.length-1]
        iList.splice(iList.length-1,1)
        // Itime.splice(iList.length-1,1)
        that.data.incomelist=iList
        that.data.incometotal=iTotal
        that.setData({
            incomelist:iList,
            incometotal:iTotal,
            // Itime:Itime
        })
    }else{
        pTotal-=that.data.paylist[pList.length-1]
        pList.splice(pList.length-1,1)
        // Ptime.splice(pList.length-1,1)
        that.data.paylist=pList
        that.data.paytotal=pTotal
        that.setData({
            paylist:pList,
            paytotal:pTotal,
            // Ptime:Ptime
        })
    }
}
  },
  onUnload(){
      this.onHide()
  },
  onHide(){
    []
        let store = [this.data.incomelist,this.data.paylist,this.data.incometotal,this.data.paytotal,this.data.outputArr,this.data.tempArr]
      
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
                  outputArr:e.data[4],
                  tempArr:e.data[5]
              })
          }
      })
  }
})