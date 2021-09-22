Page({
  data:{
    result:'不知道'
  },
  submit(e){
    console.log(e)
    let n1=Number(e.detail.value.num1)
    let n2=Number(e.detail.value.num2)
    if(n1>n2){
      result:'第一个数大'
    }else if(n2>n1){
      result:'第二个大'
    }else{
      result:'一样大'
    }
  }
})