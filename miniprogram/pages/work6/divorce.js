var num=0
Page({
    data:{
        fei:300,
        feiban:350,
        condition:true
    },
    
    switchchange(e){
        console.log(e)
        num=Math.random()+1
        this.setData({
            condition:e.detail.value
        })
    },
    formsubmit(e){
        console.log(e)
        let bd=Number(e.detail.value.property)
        if(bd<=2000000){
            if(num!=0){
                this.setData({
                    fei:600,
                    feiban:300
                })
            }else{
                this.setData({
                fei:300,
                feiban:150
            })
            }
            
        }else{
            let fei=(bd-200000)*0.005+300
             let feiban=fei/2
             
           if(num!=0){
               fei*=2
               feiban*=2
               fei=fei.toFixed(2)
            feiban=feiban.toFixed(2)
                this.setData({
                    fei,feiban
                })
           }else{
            fei=fei.toFixed(2)
            feiban=feiban.toFixed(2)
                this.setData({
                    fei,feiban
                })
           }
            
            
        }
        
       
    }
})