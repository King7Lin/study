const baseurl='https://free-api.heweather.net/s6/weather?key=b98d5bd54c4d417bb169b189b24f4bb8&days=7&location='
Page({
    data:{
        distinct_id:'',
        location:'',
        tmp_min:'',
        tmp_max:'',
        cond_txt_d:'',
        wind_dir:'',
        vis:'',
        time:'',
        latitude:0,
        longitude:0,
    },
    input(e){
        console.log(e)
        this.setData({
            distinct_id:e.detail.value
        })
    },
    search(){
        let distinct_id=this.data.distinct_id
        let url =`${baseurl}${distinct_id}`
        console.log(url)
        let that=this
        wx.request({
            url,
            success(e){
                console.log(e)
                let time=e.data.HeWeather6[0].update.loc
                let {vis,tmp_min,tmp_max,wind_dir,cond_txt_d}=e.data.HeWeather6[0].daily_forecast[0]
                let location=e.data.HeWeather6[0].basic.location
                that.setData({
                    tmp_min,tmp_max,wind_dir,location,vis,cond_txt_d,time
                })
            },
        })
    },
    onLoad(){
        let that =this
        wx.getLocation({
          success(e){
              console.log(e)
              let {latitude,longitude} = e
              that.setData({
                latitude,longitude
              })
          }
        })
    }
})