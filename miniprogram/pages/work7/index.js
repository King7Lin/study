import * as echarts from '../ec-canvas/echarts';

let app = getApp();
const baseurl='https://free-api.heweather.net/s6/weather?key=b98d5bd54c4d417bb169b189b24f4bb8&days=7&location='
var arr0=[]
var arr1=[]
var arr2=[]
Page({
    data:{
        search_city: '',
        imgsrc:100,
        tmp24time: [],
        time24: [],
        timeWeek: [], // 日期
        maxTmpWeek: [], // 最大温度列表
        minTmpWeek: [], // 最小温度列表
        tmp:'',
        distinct_id:'',
        location:'',
        tmp_min:'',
        tmp_max:'',
        cond_txt:'',
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
                text:'趁阳光正好，趁微风不噪，站在城市的寂静处，让一切喧嚣走远'
              },
              {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/yu.jpg',
                text:'一个人撑伞的日子也一定要顺顺利利'
              },
              {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/xue.jpg',
                text:'研究表明 雪花分三种 纯生 原汁麦和勇闯天涯'
              },
              {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/yun.jpg',
                text:'多云，微微雨，一首小调，一杯热茶，一个枕头'
              },
              {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/wu.jpg',
                text:'动荡的雾霭，仿佛融雪的春潮，袅袅升入天空，像是香炉里飘出来的烟氤'
              },
              {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/yin.jpg',
                text:'就算阴天了，只要不下雨，它就是晴天'
              },
              {
                src: 'cloud://lin-0gd1s4ir5c7fcba1.6c69-lin-0gd1s4ir5c7fcba1-1307393114/work7/bg5.jpg',
                text:'无论是晴天或是阴天。无论是冷或是暖，不管喜欢与否，我们都要经受风霜雨露'
              },
        ],
        bcgImg: '',
        text:''
    },
    input(e){
        console.log(e)
          this.setData({
            distinct_id:e.detail.value
        })
    },
    search(src){
        let distinct_id=this.data.distinct_id
        let url =`${baseurl}${distinct_id}`
        if(!distinct_id){
           url =`${baseurl}${src}`
        }
        let that=this
        wx.request({
            url,
            success(e){
                console.log(e)
                let time=e.data.HeWeather6[0].update.loc         //更新时间   
                let {tmp,vis,cond_txt}=e.data.HeWeather6[0].now  
                let location=e.data.HeWeather6[0].basic.location //地点
                arr0.push(e.data.HeWeather6[0].daily_forecast) //7天预报
                arr1.push(e.data.HeWeather6[0].hourly) //3小时天气
                arr2.push(e.data.HeWeather6[0].lifestyle)//生活指数
                that.setData({
                    arr2,arr1,arr0, tmp,location,vis,cond_txt,time,
                })
                //背景图
                if (e.data.HeWeather6[0].now.cond_txt.indexOf('晴') >= 0) {  
                    that.setData({
                      bcgImg: that.data.bcgImgList[0].src,
                      text:that.data.bcgImgList[0].text,
                    })
                  } else if (e.data.HeWeather6[0].now.cond_txt.indexOf('雨') >= 0) {
                    that.setData({
                      bcgImg: that.data.bcgImgList[1].src,
                      text:that.data.bcgImgList[1].text,
                    })
                  } else if (e.data.HeWeather6[0].now.cond_txt.indexOf('雪') >= 0) {
                    that.setData({
                      bcgImg: that.data.bcgImgList[2].src,
                      text:that.data.bcgImgList[2].text,
                    })
                  } else if (e.data.HeWeather6[0].now.cond_txt.indexOf('云') >= 0) {
                    that.setData({
                      bcgImg: that.data.bcgImgList[3].src,
                      text:that.data.bcgImgList[3].text,
                    })
                  } else if (e.data.HeWeather6[0].now.cond_txt.indexOf('雾') >= 0) {
                    that.setData({
                      bcgImg: that.data.bcgImgList[4].src,
                      text:that.data.bcgImgList[4].text,
                    })
                  } else if (e.data.HeWeather6[0].now.cond_txt.indexOf('阴') >= 0) {
                    that.setData({
                      bcgImg: that.data.bcgImgList[5].src,
                      text:that.data.bcgImgList[5].text,
                    })
                  } else {
                    that.setData({
                      bcgImg: that.data.bcgImgList[6].src,
                      text:that.data.bcgImgList[6].text,
                    })
                  }
                arr0=[]
                arr1=[]
                arr2=[]

                  //7天折线图
                var app = getApp()
                var hour = e.data.HeWeather6[0].hourly
                var hourly = []
                var tmp24time = []
                var time24 = []
                for (var i = 0; i < hour.length; i++) {
                  tmp24time[i] = hour[i].tmp,
                  time24[i] = hour[i].time.substring(11),
                  hourly[i] = {
                    "imgsrc": hour[i].cond_code,
                    "tmp": hour[i].tmp,
                    "time": hour[i].time.substring(11),
                    "wind_dir": hour[i].wind_dir,
                    "wind_sc": hour[i].wind_sc
                  }
                }
                that.setData({
                  hourly: hourly
                })
                app.globalData.tmp24time = tmp24time
                app.globalData.time24 = time24
                var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");

                //24小时折现
                    var day = e.data.HeWeather6[0].daily_forecast
                    var daily_forecast = []
                    var timeWeek = [] // 日期
                    var maxTmpWeek= [] // 最大温度列表
                    var minTmpWeek= [] // 最小温度列表
                    for (var i = 0; i < day.length; i++) {
                      timeWeek[i] = i == 0 ? "今天" : weekArray[new Date(day[i].date).getDay()]
                      maxTmpWeek[i] = day[i].tmp_max
                      minTmpWeek[i] = day[i].tmp_min
                      daily_forecast[i] = {
                        d_txt: i == 0 ? "今天" : weekArray[new Date(day[i].date).getDay()],
                        d_date: day[i].date.substring(5),
                        imgsrc_d: day[i].cond_code_d,
                        imgsrc_n: day[i].cond_code_n,
                        wind_dir: day[i].wind_dir,
                        wind_sc: day[i].wind_sc,
                        tmp_max: day[i].tmp_max,
                        tmp_min: day[i].tmp_min,
                        cond_txt_d: day[i].cond_txt_d
                      }
                    }
                    that.setData({
                      daily_forecast: daily_forecast,
                      timeWeek:timeWeek,
                      maxTmpWeek:maxTmpWeek,
                      minTmpWeek:minTmpWeek
                    })
                    app.globalData.timeWeek = timeWeek
                    app.globalData.maxTmpWeek = maxTmpWeek
                    app.globalData.minTmpWeek = minTmpWeek
            },
            
        })
    },
    commitSearch (res) {  // 点击键盘上的搜索
        let val = ((res.detail || {}).value || '').replace(/\s+/g, '')
        this.search(val)
      },
    onLoad(){
        let that =this
        wx.getLocation({
          success(e){
              let {latitude,longitude} = e
              if(!that.data.distinct_id){ //开始直接用所在位置
                let src=latitude+','+longitude
                that.search(src)
              }
              that.setData({
                latitude,longitude
              })
              
          }
        })
        
    },
    to24tmpChart: function(){
      wx.navigateTo({
        url: '24hour/index'
      })
    },
    to7tmpChart: function(){
      wx.navigateTo({
        url: '7days/index'
      })
    }
})