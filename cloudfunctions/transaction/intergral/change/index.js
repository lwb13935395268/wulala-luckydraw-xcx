//积分变动
const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();


exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID = wxContext.OPENID;
    let res = {
        status: 0,
        msg: "添加记录失败",
        data: []
    }
    try {
        let result = await db.collection('integralRecord').add({
            data: {
                date: new Date().valueOf(),
                type: event.changeType, //0新用户奖励，1抽奖获得，2，充值获得，3积分兑换奖品消耗，4,兑换现金
                num: event.num, //改变数量
                balance: event.balance, //余额
                openId: OPENID
            }
        });
        res.status = 200;
        res.msg = "积分记录添加成功";
        return res
    } catch {
        return res
    }
}