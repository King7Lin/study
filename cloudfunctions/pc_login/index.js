// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'lin-0gd1s4ir5c7fcba1'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID
  const db = cloud.database()
  const studentcollection = db.collection('student')
  let res = await studentcollection.where({
    openid:openid
  }).get()
  console.log(res)
  if(res.data.length>0){
    result = res.data[0]
  }else{
    result={name:'nobody'}
  }

  return {
    result
  }
}