var num=0
Page({
    data:{
        fei:0,
        feiban:0
    },
    switchchange(e){
        console.log(e)
       num=Math.random()+1
    },
    formsubmit(e){
        console.log(e)
        let bd=Number(e.detail.value.property)
        let fei=0
        let feiban=0
        
        if(bd<=10000){
            fei=50
        }else if(bd<100000){
            fei=50
            fei+=(bd-10000)*0.025
        }else if(bd<200000){
            fei=50
            fei+=2250+(bd-100000)*0.02
        }else if(bd<500000){
            fei=50
            fei+=4250+(bd-200000)*0.015
        }else if(bd<1000000){
            fei=50
            fei+=8750+(bd-500000)*0.01
        }else if(bd<2000000){
            fei=50
            fei+=13750+(bd-1000000)*0.009
        }else if(bd<5000000){
            fei=50
            fei+=22750+(bd-2000000)*0.008
        }else if(bd<10000000){
            fei=50
            fei+=46750+(bd-5000000)*0.007
        }else if(bd<20000000){
            fei=50
            fei+=81750+(bd-10000000)*0.006
        }else{
            fei=50
            fei+=141750+(bd-10000000)*0.006
        }
            if(num!=0){
               fei*=2
            }
            feiban=fei/2
            fei=fei.toFixed(2)
            feiban=feiban.toFixed(2)
        this.setData({
            fei,feiban
        })
    },
})