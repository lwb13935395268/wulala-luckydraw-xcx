const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();


exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID = wxContext.OPENID;
    console.log(OPENID);
    let res = {
        status: 0,
        msg: "更新失败",
        data: []
    };
    try {
        let result = await db.collection('userInfo').where({
            openId:OPENID
        }).update({
            data:event.data
        });
        console.log(result);
        if (result) {
            res.status = 200;
            res.msg = "更新成功";
        }
        return res;
    } catch {
        return res
    }
}