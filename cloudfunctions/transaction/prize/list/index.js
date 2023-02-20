const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();


exports.main = async (event, context) => {
    let prizeType = event.prizeType;
    let result
    if (prizeType) {
        console.log(1);
        result = await db.collection('prize').orderBy('remainderNum','desc').where({
            prizeType
        }).get();
    } else {
        console.log(2);
        result = await db.collection('prize').orderBy('remainderNum','desc').where({}).get();
    }
    console.log(result);
    let total = result.data.length;
    let pageNum = event.pageNum || 1; //1
    let pageSize = event.pageSize || total; //3
    let resArr = result.data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    let res = {
        status: 0,
        msg: "查询错误",
        data: []
    }
    if (result.data) {
        res.status = 200;
        res.msg = "查询成功";
        res.data = {
            total,
            resArr
        };
    }
    return res
}