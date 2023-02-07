const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
exports.main = async (event, context) => {
    let result = await db.collection('userInfo').add({
        // data 字段表示需新增的 JSON 数据
        data: event.data
    })
    let res = {
        status:0,
        msg:"添加失败",
        data:[]
    }
    if(result){
        res.status=200;
        res.mag="添加成功"
    }
    return res;
}