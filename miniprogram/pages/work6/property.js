Page({
    data:{
        fei:0,
        feiban:0
    },
    formsubmit(e){
        console.log(e)
        let bd=Number(e.detail.value.porperty)
        let fei=0
        let feiban=0
        if(bd<=10000){
            fei=50
        }else if(bd<100000){
            fei=50
            fei+=(bd-10000)*0.025
        }
            feiban=fei/2
            fei=fei.toFixed(2)
            feian=feiban.toFixed(2)
        this.setData({
            fei,feiban
        })
    }
})