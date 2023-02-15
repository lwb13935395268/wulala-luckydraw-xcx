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
        birthdayDate: "",
        integral: 600,
        money: 0,
        openId:OPENID,
        sex: 0,
        area:'',
        birthdayDate:'',
        nickName:'新用户'+OPENID.slice(0,4),
        avatarUrl:'https://636c-cloud1-6g94u1qn210fa109-1316664325.tcb.qcloud.la/avatarImgs/img-avatar6.png?sign=59ee8ac9594b674bb0b55fd44c599899&t=1676443669'
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