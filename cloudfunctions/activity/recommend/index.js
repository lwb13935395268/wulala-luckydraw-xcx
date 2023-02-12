const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    let activityRes = await db.collection('activity').aggregate().lookup({
        from:'myParticipateActivity',
        localField:'_id',
        foreignField: 'activityId',
        as:'row',
    }).end().then(res=>{
        console.log('--------------- 推荐的具体的活动-------------')
        console.log(res);
        function sortBy(property){
            return function(value1,value2){
                let a=value1[property]
                let b=value2[property]
                
                return a < b ? 1:a > b? -1 : 0
            }
        }
        return res.list.sort(sortBy('row.length'));
    })
    console.log(activityRes);
    let res = {
        status:0,
        msg:"查询失败,请重新在试",
        data:[]
    }
    if (activityRes) {
        res.status = 200;
        res.msg = "查询成功";
        res.data = activityRes;
    }
    return res;
};