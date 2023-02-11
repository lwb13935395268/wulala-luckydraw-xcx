const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    let res = {
        status:0,
        msg:"参加失败,请重新在试一试",
        data:[]
    }
    const wxContext = cloud.getWXContext();
    let createActivity;
    let isParticipate = await db.collection('myParticipateActivity').where({
        OPENID:wxContext.OPENID,
        activityId:event.activityId
    }).count();
    console.log(isParticipate);
    switch (isParticipate.total) {
        case 0:
            createActivity = await db.collection('myParticipateActivity').add({
                data:{
                    OPENID:wxContext.OPENID,
                    activityId : event.activityId
                }
            });
            if (createActivity._id) {
                res.status = 200;
                res.msg = "参加成功";
            }
            break;
        case 1:
            console.log('已参加');
            res.status = 0;
            res.msg="已参加过此活动";
            break;
        default:
            console.log('已参加');
            res.status = 0;
            res.msg="已参加过此活动";
            break;
    }
        
    if (event.activityId == '') {
        res.status = 0;
        res.msg="activityId不能为空";
    }else if (isParticipate.total == 1) {
        res.status = 0;
        res.msg="已参加过此活动";
    }
    return res;
};