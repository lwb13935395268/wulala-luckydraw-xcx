const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID = wxContext.OPENID;
    let prize = await db.collection('prize').doc(event.prizeId).get();
    let user = await db.collection('userInfo').where({
        openId: OPENID
    }).get();
    let prizeData = prize.data;
    let userData = user.data[0];
    let res = {
        status: 0,
        msg: '兑换失败',
        data: []
    }
    if (!prizeData) {
        res.msg = '奖品未找到';
    } else if (!userData) {
        res.msg = '用户未找到';
    } else if (prizeData.remainderNum > 0 && userData.integral >= prizeData.price) {
        await db.collection('prize').doc(event.prizeId).update({
            data: {
                remainderNum: _.inc(-1),
                exchangeNum: _.inc(1),
            }
        })
        await db.collection('userInfo').doc(userData._id).update({
            data: {
                integral: _.inc(-prizeData.price)
            }
        })
        res.status = 200;
        res.msg = '兑换成功';
    } else if (prizeData.remainderNum <= 0) {
        res.msg = '奖品已兑完'
    } else if (userData.integral < prizeData.price) {
        res.msg = '积分不足'
    }
    return res
}