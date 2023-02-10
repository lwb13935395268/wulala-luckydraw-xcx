const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    event.prizeInfo.OPENID = wxContext.OPENID;
    console.log(event.prizeInfo);
    let createPrize = await db.collection('merchantPrizeList').add({
        data:  event.prizeInfo
    });
    let res = {
        status:0,
        msg:"创建失败,请重新在试一试",
        data:[]
    }
    if (createPrize._id) {
        res.status = 200;
        res.msg = "创建成功";
    }
    return res;
};