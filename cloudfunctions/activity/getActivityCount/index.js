const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    let getActivityCount = await db.collection('myParticipateActivity').where({
        activityId:event.activityId
    }).count();
    let res = {
        status:0,
        msg:"查询失败,请重新在试",
        data:[]
    }
    if (getActivityCount.errMsg) {
        res.status = 200;
        res.msg = "查询成功";
        res.data = queryMyActivityList
    }
    return res;
};