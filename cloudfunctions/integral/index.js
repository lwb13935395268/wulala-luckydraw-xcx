// 云函数入口文件
const cloud = require('wx-server-sdk')
const change = require('./change/index');
const record = require('./record/index');
// const getOpenid = require('../quickstartFunctions/getOpenId/index')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    switch (event.type) {
        case 'change':
            return await change.main(event, context);
        case 'record':
            return await record.main(event, context);
    }
}