const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command

exports.main = async (event, context) => {
    let prize = await db.collection('prize').doc(event.prizeId).get();
    let user=await db.collection('prize').doc(event.prizeId).get();
    let res={
        status:0,
        msg:'兑换失败',
        data:[]
    }
    if(prize.data.remainderNum>0&&user.data.integral>=prize.data.price){
        let result=await db.collection('prize').doc(event.prizeId).update({
            data:{
                remainderNum:_.inc(-1),
                exchangeNum:_.inc(1),}
        })
        res.status=200;
        res.msg='兑换成功';
    }else if(prize.data.remainderNum<=0){
        res.msg='奖品已兑完'
    }else if(user.data.integral<prize.data.price){
        res.msg='积分不足'
    }
    console.log(res);
    return res
}