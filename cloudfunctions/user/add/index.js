const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID = wxContext.OPENID;
    let result = await db.collection('userInfo').add({
        // data 字段表示需新增的 JSON 数据
        data: {
            area: "",
            awards: 0,
            birthdayDate: "",
            createdActivity: 0,
            integral: 600,
            joinedActivity: 0,
            money: 0,
            openId:OPENID,
            sex: 0,
            area:'',
            birthdayDate:''
        }
    })
    let res = {
        status: 0,
        msg: "添加失败",
        data: []
    }
    if (result) {
        res.status = 200;
        res.msg = "添加成功"
    }
    return res;
}