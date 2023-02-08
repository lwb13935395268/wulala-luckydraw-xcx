const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    console.log(event);
    let createActivity = await db.collection('uploading').add({
        data:  event.merchantInfo
    //   data: {
    //     image:'',
    //     title:'刚刚该方法',
    //     startDate:'2022-10-10 12:01',
    //     endDate:'2023-10-10 12:01',
    //     prizeName:'的复活节平时克林顿访华',
    //   }
    });
    console.log(createActivity);

    let res = {
        status:0,
        msg:"申请失败,请重新在试一试",
        data:[]
    }
    if (createActivity._id) {
        res.status = 200;
        res.msg = "申请成功";
    }

    return res;



};
