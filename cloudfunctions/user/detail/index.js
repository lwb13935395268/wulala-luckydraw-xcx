const cloud = require('wx-server-sdk');
const add=require('../add/index');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();


exports.main = async (event, context) => {
    let res = await db.collection('userInfo').where({
      openId:event.openId
    }).get();
    if(res.data.length){
      return res.data
    }else{
      return await add.main(event, context);
    }
}