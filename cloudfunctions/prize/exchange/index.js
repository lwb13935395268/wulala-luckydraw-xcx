const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();


exports.main = async (event, context) => {
    let result = await db.collection('prize').doc(event.prizeId)
    
    // let res = {
    //     status:0,
    //     msg:"兑换错误",
    //     data:[]
    // }
    // if (result.data) {
    //     res.status = 200;
    //     res.msg = "兑换成功";
    //     res.data=result.data;
    // }
    return result
}