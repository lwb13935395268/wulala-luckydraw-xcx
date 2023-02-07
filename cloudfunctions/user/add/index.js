const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
exports.main = async (event, context) => {
    let res = await db.collection('userInfo').add({
        // data 字段表示需新增的 JSON 数据
        data: event.data
    })
    console.log(res);
    //   return res
}