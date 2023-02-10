// 云函数入口文件
const cloud = require('wx-server-sdk')
const change = require('./intergral/change/index')
const record = require('./intergral/record/index')
const detail = require('./prize/detail/index')
const exchange = require('./prize/exchange/index')
const list = require('./prize/list/index')
const prizeChange = require('./prize/change/index')
const prizeRecord = require('./prize/record/index')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    switch (event.type) {
        //intergral
        case 'intergralChange':
            return await change.main(event, context);
        case 'intergralRecord':
            return await record.main(event, context);
            //prize
        case 'prizeDetail':
            return await detail.main(event, context);
        case 'prizeExchange':
            return await exchange.main(event, context);
        case 'prizeList':
            return await list.main(event, context);
        case 'prizeChange':
            return await prizeChange.main(event, context);
        case 'prizeRecord':
            return await prizeRecord.main(event, context);
    }
}