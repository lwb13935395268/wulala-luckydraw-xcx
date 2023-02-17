const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    event.activityInfo.OPENID = wxContext.OPENID;
    event.activityInfo.activityType = 0;
    event.activityInfo.type = 0;//是否是推荐活动
    // event.activityInfo.startDate = Date.parse(event.activityInfo.startDate+":00");
    // event.activityInfo.endDate = Date.parse(event.activityInfo.endDate+":00");
    let createActivity = await db.collection('activityTemplate').add({
        data:  event.activityInfo
    });
    let res = {
        status:0,
        msg:"保存失败,请重新在试一试",
        data:[]
    }
    if (createActivity.errMsg) {
        res.status = 200;
        res.msg = "保存成功";
    }
    return res;
};
