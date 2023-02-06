const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();


exports.main = async (event, context) => {
    let res = await db.collection('userInfo').where({
      openId:event.openId
    }).get();
      return res.data
}