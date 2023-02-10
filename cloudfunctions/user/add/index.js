const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID = wxContext.OPENID;
    const newUser= {
        area: [],
        awards: 0,
        birthdayDate: "",
        createdActivity: 0,
        integral: 600,
        joinedActivity: 0,
        money: 0,
        openId:OPENID,
        sex: 0,
        area:'',
        birthdayDate:'',
        nickName:'新用户'+OPENID.slice(0,4),
        avatarUrl:'https://636c-cloud1-6g94u1qn210fa109-1316664325.tcb.qcloud.la/icon-avatar.png?sign=48f44df8705eafcefb5d630d716402fe&t=1675215240'
    }
    let result = await db.collection('userInfo').add({
        // data 字段表示需新增的 JSON 数据
        data:newUser
    })
    let res = {
        status: 0,
        msg: "添加失败",
        data: []
    }
    if (result) {
        res.status = 200;
        res.msg = "添加成功"
        res.data= newUser
    }
    return res;
}