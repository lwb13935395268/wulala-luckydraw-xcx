// 云函数入口文件
const cloud = require('wx-server-sdk')
const detail = require('./detail/index');
const add = require('./add/index');
const update = require('./update/index');
const getAvatars = require('./getAvatars/index');
// const getOpenid = require('../quickstartFunctions/getOpenId/index')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    // const openId = await getOpenid.main();
    // console.log(openId);
    switch (event.type) {
        case 'detail':
            return await detail.main(event, context);
        case 'add':
            return await add.main(event, context);
        case 'update':
            return await update.main(event, context);
        case 'getAvatar':
            return await getAvatars.main(event, context);
    }
    // return {}
}