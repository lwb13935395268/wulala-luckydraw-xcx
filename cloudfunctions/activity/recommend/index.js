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
        let row = res.list.sort(function (a,b) {
            return b.row.length - a.row.length
        });
        return row;
    })
    console.log(activityRes);
    let res = {
        status:0,
        msg:"查询失败,请重新在试",
        data:[]
    }
    if (activityRes) {
        res.status = 200;
        res.msg = "查询成功";
        res.data = activityRes;
    }
    return res;
};