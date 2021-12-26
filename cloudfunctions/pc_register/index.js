// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env:'lin-0gd1s4ir5c7fcba1'
})
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    const studentcollection=db.collection('student')

    let openid = wxContext.OPENID
    console.log(event)
    let {sn,name,nickName, avatarUrl}=event
    let res = await studentcollection.where({
        sn:sn,
        name:name
    }).get()
    console.log(res)

    let user = {}
    let reg = 'ok'
    let errMsg = ''

    if(res.data.length==0){
        reg='err'
        errMsg='没找到匹配的学号姓名，请核实'
    }else{
        let {_id}=res.data[0]
        let student = res.data[0]
        if(!res.data[0].nickName){
            res = studentcollection.doc(_id).update({
                data:{
                    nickName,avatarUrl,openid
                }
            })
            user={...student,nickName,avatarUrl,openid}
        }else{
            reg = 'err'
            errMsg = '学号：'+sn+'已被'+res.data[0].nickName+'绑定.'
        }
    }
    return {
        reg,errMsg,user
}
}