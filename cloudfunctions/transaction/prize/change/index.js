//兑奖记录变动
const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async (event, context) => {
    let code = ''; //初始化验证码
    let codeLength = 6; //设置验证码长度
    //设置随机字符
    let txt = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    //循环
    for(let i = 0; i < codeLength; i++) {
        //设置随机数范围
        let index = Math.floor(Math.random() * 36);
        code += txt[index];
    }
        let timestamp = Date.parse(new Date());
        let date = new Date(timestamp);
        //获取年份  
        let Y =date.getFullYear();
        //获取月份  
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let Ms = (date.getMonth() + 11 < 10 ? '0' + (date.getMonth() + 11) : date.getMonth() + 11);
        //获取当日日期 
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let todayTime = Y+'-'+M+'-'+D
        let endTime = Y+'-'+Ms+'-'+D;
    console.log('加记录');
    const wxContext = cloud.getWXContext();
    const OPENID = wxContext.OPENID;
    let res = {
        status: 0,
        msg: "添加兑奖记录失败",
        data: []
    }
    try {
        console.log(OPENID);
        let result = await db.collection('prizeRecord').add({
            data: {
                date: new Date().valueOf(),
                title:event.title,
                num: event.num, //消耗积分
                imageUrl:event.imageUrl,
                openId: OPENID,
                endDate : Date.parse(endTime),
                start : Date.parse(todayTime),
                address:event.address,//地址
                exchangeCode:code,//兑换码
            }
        });
        console.log(result);
        res.status = 200;
        res.msg = "兑奖记录添加成功";
        console.log(res);
        return res
    } catch {
        console.log('catch');
        console.log(res);
        return res
    }
}