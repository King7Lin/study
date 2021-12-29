// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'lin-0gd1s4ir5c7fcba1'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=cloud.database()
  const pics = db.collection('pics')
  const votes = db.collection('votes')
  const $ = db.command.aggregate
  let res = await pics.get()

  let plist = res.data
  res = await votes.aggregate()
                   .group({
                     _id:'$fileid',
                     count:$.sum(1)
                   })
                   .end()
  console.log(res)
  let vlist = res.list    
  plist.map(v=>{
    let found = vlist.find(vv=>{
      return vv._id == v.fileid
    })
    if(found){
      v.count = found.count
    }else{
      v.count = 0
    }
  })
  return {
    plist
  }
}