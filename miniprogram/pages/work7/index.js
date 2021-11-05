const baseurl='https://free-api.heweather.net/s6/weather?key=b98d5bd54c4d417bb169b189b24f4bb8&days=7&location='
var arr=[]
var arr1=[]
var arr2=[]
Page({
    data:{
        tmp:'',
        distinct_id:'',
        location:'',
        tmp_min:'',
        tmp_max:'',
        cond_txt_d:'',
        wind_dir:'',
        vis:'',
        time:'',
        date:'',
        wind_sc:'',
        latitude:0,
        longitude:0,
        bcgImgList:[
            {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/qing.jpg',
              },
              {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/yu.jpg',
              },
              {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/xue.jpg',
              },
              {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/yun.jpg',
              },
              {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/wu.jpg',
              },
              {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/yin.jpg',
              },
              {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/bg5.jpg',
              },
        ],
        bcgImg: '',
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
        let that=this
        wx.request({
            url,
            success(e){
                console.log(e)
                let time=e.data.HeWeather6[0].update.loc
                let tmp=e.data.HeWeather6[0].now.tmp
                let {vis,cond_txt_d}=e.data.HeWeather6[0].daily_forecast[0]
                let location=e.data.HeWeather6[0].basic.location
                arr.push(e.data.HeWeather6[0].daily_forecast)
                arr1.push(e.data.HeWeather6[0].hourly)
                arr2.push(e.data.HeWeather6[0].lifestyle)
                console.log(arr2)
                that.setData({
                    arr2,arr1,arr, tmp,location,vis,cond_txt_d,time,
                })
                if (e.data.HeWeather6[0].now.cond_txt.indexOf('晴') >= 0) {
                    that.setData({
                      bcgImg: that.data.bcgImgList[0].src,
                    })
                  } else if (e.data.HeWeather6[0].now.cond_txt.indexOf('雨') >= 0) {
                    that.setData({
                      bcgImg: that.data.bcgImgList[1].src,
                    })
                  } else if (e.data.HeWeather6[0].now.cond_txt.indexOf('雪') >= 0) {
                    that.setData({
                      bcgImg: that.data.bcgImgList[2].src,
                    })
                  } else if (e.data.HeWeather6[0].now.cond_txt.indexOf('云') >= 0) {
                    that.setData({
                      bcgImg: that.data.bcgImgList[3].src,
                    })
                  } else if (e.data.HeWeather6[0].now.cond_txt.indexOf('雾') >= 0) {
                    that.setData({
                      bcgImg: that.data.bcgImgList[4].src,
                    })
                  } else if (e.data.HeWeather6[0].now.cond_txt.indexOf('阴') >= 0) {
                    that.setData({
                      bcgImg: that.data.bcgImgList[5].src,
                    })
                  } else {
                    that.setData({
                      bcgImg: that.data.bcgImgList[6].src,
                    })
                  }
            },
        })
        arr=[]
        arr1=[]
        arr2=[]
    },
    commitSearch (res) {  // 点击键盘上的搜索
        let val = ((res.detail || {}).value || '').replace(/\s+/g, '')
        this.search(val)
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