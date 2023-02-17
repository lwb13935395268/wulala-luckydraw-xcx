const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    let { pageSize = 10, pageNum = 1 } = event
    const wxContext = cloud.getWXContext();
    let queryMyActivityList = await db.collection('activity').where({
        OPENID:wxContext.OPENID,
        activityType:event.activityType
    }).skip(pageSize*(pageNum - 1)).limit(pageSize).get();
    let res = {
        status:0,
        msg:"查询失败,请重新在试",
        data:[]
    }
    if (queryMyActivityList.errMsg) {
        res.status = 200;
        res.msg = "查询成功";
        res.data = queryMyActivityList.data;
    }
    return res;
};