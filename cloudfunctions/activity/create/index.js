const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    console.log(event);
    let createActivity = await db.collection('activity').add({
        data:  event.activityInfo
    //   data: {
    //     image:'',
    //     title:'刚刚该方法',
    //     startDate:'2022-10-10 12:01',
    //     endDate:'2023-10-10 12:01',
    //     prizeName:'的复活节平时克林顿访华',
    //   }
    });
    let res = {
        status:0,
        msg:"创建失败,请重新在试一试",
        data:[]
    }
    if (createActivity._id) {
        res.status = 200;
        res.msg = "创建成功";
    }
    return res;
};
