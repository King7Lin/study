// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'lin-0gd1s4ir5c7fcba1'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const directionsCollection = db.collection('directions')
  const $ = db.command.aggregate

  let directions = await directionsCollection.where({}).get()

  let res = await db.collection('student').aggregate()
  .unwind({
    path:'$choosen',
    includeArrayIndex:'index'
  })
  .project({
    name:1,
    index:1,
    score:1,
    sn:1,
    choosen:1
  })
  .sort({
    choosen:1,
    index:1,
    score:-1
  })
  .group({
    _id:'$choosen',
    students:$.push({
      index:'$index',
      name:'$name',
      score:'$score',
      sn:'$sn'
    })
  })
  .unwind({
    path:'$students',
    includeArrayIndex:'rank'
  })
  .project({
    _id:0,
    choosen:'$_id',
    rank:$.add(["$rank",1]),
    index:'$students.index',
    score:'$students.score',
    name:'$students.name',
    sn:'$students.sn'
  })
  .sort({
    choosen:1,
    index:1,
    rank:1
  })
  .limit(1000)
  .end()
  console.log(res)
  let list = res.list
  let count = 0
  for(let pid=0;pid<directions.data.length;pid++){
    let ll = list.slice(0)
    console.log('pid',pid)
    for(let i=0;i<list.length;i++){
      let num = directions.data.find(v=>{
        return v.name ==list[i].choosen
      }).num

      if(list[i].index == pid&&list[i].rank<=num){
        ll =ll.filter(v=>{
          return !(v.name == list[i].name && v.index!=pid)
        })
      }
    }
    let o ={}
    ll.forEach(v=>{
      o[v.choosen]=o[v.choosen]?o[v.choosen]+1:1
      v.rank=o[v.choosen]
    })

    list = ll.slice(0)
  }
  console.log('statistics',list)

  return {
    list
  }
}