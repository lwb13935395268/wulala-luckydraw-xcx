const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;
// 创建集合云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    event.participate.OPENID = wxContext.OPENID;
    let participateActivity = await db.collection('activity').doc(event.id).update({
        data:{
            participate:_.push(event.participate),
        }
    });
    
    console.log(participateActivity);
    let res = {
        status:0,
        msg:"添加失败,请重新在试",
        data:[]
    }
    if (participateActivity.errMsg) {
        res.status = 200;
        res.msg = "添加成功";
    }
    return res;
};