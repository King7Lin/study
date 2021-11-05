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
        console.log(e)
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
    onUnload(){
        this.onHide()
    },
    onHide(){
        let store =[this.data.incomelist,this.data.paylist,this.data.incometotal]
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