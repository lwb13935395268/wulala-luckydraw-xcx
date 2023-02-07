const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();


exports.main = async (event, context) => {
    let result = await db.collection('userInfo').where({
      openId:event.openId
    }).get();
    
    let res = {
        status:0,
        msg:"创建失败,请重新在试一试",
        data:[]
    }
    if (result) {
        res.status = 200;
        res.msg = "创建成功";
    }
    return res;
      return res.data
}