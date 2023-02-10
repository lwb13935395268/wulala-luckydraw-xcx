//兑奖记录变动
const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();


exports.main = async (event, context) => {
    console.log('加记录');
    const wxContext = cloud.getWXContext();
    const OPENID = wxContext.OPENID;
    let res = {
        status: 0,
        msg: "添加兑奖记录失败",
        data: []
    }
    try {
        console.log(OPENID);
        let result = await db.collection('prizeRecord').add({
            data: {
                date: new Date().valueOf(),
                title:event.title,
                num: event.num, //消耗积分
                imageUrl:event.imageUrl,
                openId: OPENID
            }
        });
        console.log(result);
        res.status = 200;
        res.msg = "兑奖记录添加成功";
        console.log(res);
        return res
    } catch {
        console.log('catch');
        console.log(res);
        return res
    }
}