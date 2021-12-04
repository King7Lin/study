// star/star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:{
      type:Number,
      value:0
    },
    displayNum:{
      type:Boolean,
      value:true
    }
  },
  lifetimes:{
    attached(){
      let f = Math.floor(this.data.value / 2)
      let h = Math.ceil((this.data.value % 2) / 2)
      let e = 5 - f - h
      this.setData({
        f,h,e
      })
    }
  }
})
