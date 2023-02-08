// 云函数入口文件
const cloud = require('wx-server-sdk')
const detail = require('./detail/index');
const list = require('./list/index');
const exchange = require('./exchange/index');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    switch (event.type) {
        case 'detail':
            return await detail.main(event, context);
        case 'list':
            return await list.main(event, context);
        case 'exchange':
            return await exchange.main(event, context);
    }
}