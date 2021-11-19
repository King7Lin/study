const utils= require('./utils.js')
let fmarkers=[]
let timer=0
Page({
    data:{
        running:false,
        latitude:0,
        longitude:0,
        seconds:0,
        meters:0,
        markers:[],
        polyline:[{
            points:[],
            color:'#ff0000FF',
            width:2
        }],
        interval:1000,
        feedbackrate:500
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
        setInterval(this.record,this.data.interval)
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
                if(pace>3){
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
    },
    playback(){
        this.clear()
        wx.getStorage({
            key:'running',
        }).then(res=>{
            fmarkers=res.data
        })
        timer=setInterval(this.feedback,this.data.feedbackrate)
    },
    feedback(){
        let lmarkers = this.data.markers
        let lpolyline = this.data.polyline
        if(fmarkers.length>0){
            lmarkers.push(fmarkers.shift())
            lpolyline[0].points=lmarkers
        }else{
            clearInterval(timer)
        }
        this.setData({
            markers:lmarkers,
            polyline:lpolyline
        })
    },
    save(){
        wx.setStorage({
            data:this.data.markers,
            key:'running',
        }).then(()=>{
            wx.showToast({
              title: '保存成功',
            })
        })
    },
    clear(){
        this.setData({
        running:false,
        latitude:0,
        longitude:0,
        seconds:0,
        meters:0,
        markers:[],
        polyline:[{
            points:[],
            color:'#ff0000FF',
            width:2
        }],
        })
    },
})