const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID = wxContext.OPENID;
    const newIntegral=9000;
    const newUser = {
        area: [],
        birthdayDate: "",
        integral: newIntegral,
        money: 0,
        openId: OPENID,
        sex: 0,
        area: '',
        birthdayDate: '',
        nickName: '新用户' + OPENID.slice(0, 4),
        avatarUrl: 'https://636c-cloud1-6g94u1qn210fa109-1316664325.tcb.qcloud.la/avatarImgs/img-avatar6.png?sign=59ee8ac9594b674bb0b55fd44c599899&t=1676443669'
    }
    let res = {
        status: 0,
        msg: "添加失败",
        data: []
    }
    try {
        let result = await db.collection('userInfo').add({
            // data 字段表示需新增的 JSON 数据
            data: newUser
        })

        await db.collection('integralRecord').add({
            data: {
                date: new Date().valueOf(),
                type: 0, //0新用户奖励，1抽奖获得，2，充值获得，3积分兑换奖品消耗，4,兑换现金
                num: newIntegral, //改变数量
                balance: newIntegral, //余额
                openId: OPENID
            }
        });
        res.status = 200;
        res.msg = "添加成功"
        res.data = newUser
        return res;
    } catch {
        return res;
    }
}