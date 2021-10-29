const baseurl='https://api.map.baidu.com/weather/v1/?data_type=all&ak=1zBnGp4dKBoGyPgx0sZN6EkPr7fEZXWD&district_id='
Page({
    data:{
        distinct_id:'',
        city:'',
        temp:'',
        wind_dir:''
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
                let {temp,wind_dir}=e.data.result.now
                let city=e.data.result.location.city
                that.setData({
                    temp,wind_dir,city
                })

            }
        })
    }
})