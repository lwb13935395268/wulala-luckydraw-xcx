const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();


exports.main = async (event, context) => {
    console.log(event);
    let res = await db.collection('prize').doc(event.openId).get();
    return res.data
}