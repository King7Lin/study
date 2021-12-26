// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'lin-0gd1s4ir5c7fcba1'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const studentcollection = db.collection('student')

  let choosen = event.user.choosen
  let _id = event.user._id
  let res = await studentcollection.where({
    _id
  }).update({
    data:{
      choosen
    }
  })
  console.log(res)
  return {
    res
  }
}