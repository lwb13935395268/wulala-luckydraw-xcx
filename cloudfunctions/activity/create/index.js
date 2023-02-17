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
    let createActivity = await db.collection('activity').add({
        data:  event.activityInfo
    });
    console.log(createActivity);
    let res = {
        status:0,
        msg:"创建失败,请重新在试一试",
        data:[]
    }
    if (createActivity) {
        res.status = 200;
        res.msg = "创建成功";
    }
    return res;
};
