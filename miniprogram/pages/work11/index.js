const utils= require('./utils.js')
Page({
    data:{
        running:true,
        latitude:0,
        longitude:0,
        seconds:0,
        meters:0,
        markers:[],
        interval:1000,
    },
    test(){
        let dis=utils.getDistance(23.383101,113.449479,23.38703,113.446121)
        this.setData({
            meter:dis
        })
    },
    getLocation(){
        wx.getLocation({
            type:'gcj02'
        }).then(res=>{
            console.log(res)
            let {latitude,longitude}=res
            this.setData({
                latitude,longitude
            })
        }).catch(err=>{
            console.log(err)
        })
    },
    onLoad(){
        this.getLocation()
        // setInterval(this.record,this.data.interval)
    },
    record(){
        if(!this.data.running){
            return
        }
        this.setData({
            seconds:this.data.seconds + this.data.interval/1000
        })
        wx.getLocation({
            type:'gcj02'
        }).then(res=>{
            let newMarker={
                latitude:res.latitude,
                longitude:res.longitude,
                iconPath:'redPoint.png',
                width:10,
                height:10
            }
            let pace =0 
            let tmarkers =this.data.markers
            if(this.data.markers.length>0){
                let lastmarker =this.data.markers.slice(-1)[0]
                console.log(lastmarker)
                console.log(newMarker)
                pace =utils.getDistance(lastmarker.latitude,lastmarker.longitude,newMarker.latitude,newMarker.longitude)
                console.log(pace)
                if(pace>15){
                    tmarkers.push(newMarker)
                }else{
                    pace=0
                }
            }else{
                tmarkers.push(newMarker)
            }
            this.setData({
                latitude:res.latitude,
                longitude:res.longitude,
                markers:tmarkers,
                meters:this.data.meters + pace
            })
        })
    },
    run(){
        this.setData({
            running:!this.data.running
        })
    }
})