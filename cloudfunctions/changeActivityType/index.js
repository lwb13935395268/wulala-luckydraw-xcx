// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    let timestamp = Date.parse(new Date());
    let date = new Date(timestamp);
    let Y =date.getFullYear();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    // let H = date.getHours();
    let time = Y+'-'+M+'-'+D;
    console.log(time);
    const wxContext = cloud.getWXContext()
    // db.collection('activity').where({

    // })
    
    return {
        
    }
}