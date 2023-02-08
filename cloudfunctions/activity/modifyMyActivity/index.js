const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    console.log(event);
    let queryMyActivityList = await db.collection('activity').doc('4f1d421c63e34718020ac3720e2a902f').update({
        data:{
            signUpSet:'灌灌灌灌'
        }
    });
    let res = {
        status:0,
        msg:"修改失败,请重新在试",
        data:[]
    }
    if (queryMyActivityList.errMsg) {
        res.status = 200;
        res.msg = "修改成功";
    }
    return res;
};