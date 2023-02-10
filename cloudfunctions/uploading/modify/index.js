const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {  
    let queryAudit = await db.collection('uploading').doc(event.audit).update({
        data:  event.merchantInfo
    })
    console.log(event);
    console.log(queryAudit);
    let res = {
        status:0,
        msg:"修改失败,请重新在试一试",
        data:[]
    }
    if (merchantInfo.errMsg) {
        res.status = 200;
        res.msg = "申请成功";
    }

    return res;

    // return {
    //     message:'成功',
    //     data:queryAudit
    // }
};
