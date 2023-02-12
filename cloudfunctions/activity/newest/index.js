const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    let queryMyActivityList = await db.collection('activity').get();
    console.log('------------------');
    console.log(queryMyActivityList.data);
    let row = queryMyActivityList.data.sort(function(a, b){
        return a.startDate > b.startDate ? 1 : -1;
    });
    let res = {
        status:0,
        msg:"查询失败,请重新在试",
        data:[]
    }
    if (queryMyActivityList.errMsg) {
        res.status = 200;
        res.msg = "查询成功";
        res.data = row;
    }
    return res;
};