const cloud = require('wx-server-sdk');
const addUser = require('../add/index')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();


exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID =await wxContext.OPENID;
    console.log(OPENID);
    let result = await db.collection('userInfo').where({
        openId: OPENID
    }).get();
    console.log(result);
    let res = {
        status: 0,
        msg: "查询错误",
        data: []
    }
    try {

        if (result.data.length) {
            res.status = 200;
            res.msg = "查询成功";
            res.data = result.data[0];
        } else {
            res.status = 200;
            res.msg = "新用户";
        }
        return res;
    } catch {
        return res;

    }
}