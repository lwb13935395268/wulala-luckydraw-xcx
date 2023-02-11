const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    let activityRes = await db.collection('activity').aggregate().lookup({
        from:'myParticipateActivity',
        localField:'_id',
        foreignField: 'activityId',
        as:'row',
    }).end().then(res=>{
        console.log('----------------具体的活动-------------')
        console.log(res);
        return res
    })
    console.log(activityRes);
    let res = {
        status:0,
        msg:"查询失败,请重新在试",
        data:[]
    }
    if (activityRes.errMsg) {
        res.status = 200;
        res.msg = "查询成功";
        res.data = activityRes.list;
    }
    return res;
};