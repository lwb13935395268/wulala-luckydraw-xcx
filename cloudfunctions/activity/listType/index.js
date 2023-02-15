const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    let queryMyActivityList
    switch (event.listType) {
        case 0:
            queryMyActivityList = await db.collection('activity').aggregate().sort({
                startDate:1
            }).end();
            break;
        case 1:
            queryMyActivityList = await db.collection('activity').where({
                type:1
            }).get();
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            break;
    };
    console.log(queryMyActivityList);
    let res = {
        status:0,
        msg:"查询失败,请重新在试",
        data:[]
    }
    if (queryMyActivityList.errMsg) {
        res.status = 200;
        res.msg = "查询成功";
        res.data = queryMyActivityList;
    }
    return res;
};