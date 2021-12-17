// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'lin'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if(event.sno=='07201104'){
    event.name='lin'
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}