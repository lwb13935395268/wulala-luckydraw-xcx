const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    event.activityId.OPENID = wxContext.OPENID;
    console.log(event.activityId);
    let createActivity = await db.collection('myParticipateActivity').add({
        data:  event.activityId
    });
    let res = {
        status:0,
        msg:"参加失败,请重新在试一试",
        data:[]
    }
    if (createActivity._id) {
        res.status = 200;
        res.msg = "参加成功";
    }
    return res;
};
