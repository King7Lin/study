const baseurl='https://free-api.heweather.net/s6/weather/now?key=b98d5bd54c4d417bb169b189b24f4bb8&location='
Page({
    data:{
        distinct_id:'',
        city:'',
        tmp:'',
        wind_dir:'',
        latiude:0,
        longitue:0,
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
                let {tmp,wind_dir}=e.data.HeWeather6[0].now
                let city=e.data.HeWeather6[0].basic.location
                that.setData({
                    tmp,wind_dir,city
                })

            }
        })
    },
    onLoad(){
        let that =this
        wx.getLocation({
          success(e){
              console.log(e)
              let {latiude,longitue} =e
              that.setData({
                  latiude,longitue
              })
          }
        })
    }
})