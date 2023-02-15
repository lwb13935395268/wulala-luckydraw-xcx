const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();


exports.main = async (event, context) => {
    let result = await db.collection('avatar').get();
    console.log(result);
    let res = {
        status: 0,
        msg: "查询错误",
        data: []
    }
    try {
        if (result.data) {
            res.status = 200;
            res.msg = "查询成功";
            res.data = result.data;
        }
        return res;
    } catch {
        return res;

    }
}