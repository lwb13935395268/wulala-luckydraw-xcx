//积分记录
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
        msg: "查询错误",
        data: []
    }
    console.log(OPENID);
    try {
        let result = await db.collection('integralRecord').where({
            openId: OPENID
        }).get();
        console.log(result);
        if (result.data) {
            res.status = 200;
            res.msg = "查询成功";
            res.data = result.data;
        }
        return res
    } catch {
        return res
    }
}