Page({
    data:{
        fei:300,
        feiban:350,
        condition:false
    },
    
    switchchange(e){
        console.log(e)
        this.setData({
            condition:e.detail.value
        })
    },
    formsubmit(e){
        console.log(e)
        let bd=Number(e.detail.value.property)
        if(bd<=2000000){
                this.setData({
                fei:300,
                feiban:150
            })
        }else{
            let fei=(bd-200000)*0.005+300
             let feiban=fei/2     
            fei=fei.toFixed(2)
            feiban=feiban.toFixed(2)
                this.setData({
                    fei,feiban
                })
           
            
            
        }
        
       
    }
})