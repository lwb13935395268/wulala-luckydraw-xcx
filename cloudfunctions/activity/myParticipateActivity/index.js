const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    console.log('-------OPENID-------');
    console.log(wxContext.OPENID);
    let activityRes = await db.collection('activity').aggregate().lookup({
        from:'myParticipateActivity',
        localField:'_id',
        foreignField: 'activityId',
        as:'row',
    }).end().then(res=>{
        let participate = [];
        res.list.forEach(item=>{
            switch (item.row.length) {
                case 0:
                    break;
                default:
                    item.row.forEach(el => {
                        if (el.OPENID == wxContext.OPENID) {
                            participate.push(item);
                        }
                    })
                    break;
            }
        });
        return participate;
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