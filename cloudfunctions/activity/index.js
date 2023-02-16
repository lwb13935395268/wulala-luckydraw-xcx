const create = require("./create/index");//创建活动列表
const queryMyActivityList = require("./queryMyActivityList/index");//查询活动接口
const modifyMyActivity = require("./modifyMyActivity");//修改活动
const merchantPrizeList = require("./merchantPrizeList/index");//商户创建的奖品列表
const myParticipateActivity = require("./myParticipateActivity/index");//我参加的活动列表
const participateActivity = require("./participateActivity/index");//参与活动接口
const getActivityCount = require("./getActivityCount/index");//获取当前活动参与的人数
const recommend = require("./recommend/index");//推荐活动
const newest = require("./newest/index");//最新活动
const queryActivity = require("./queryActivity/index");//查询活动
const listType = require("./listType/index");//活动中心列表类型
const activityTemplate = require("./activityTemplate/index");//活动模板
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'create':
        return await create.main(event, context);
    case 'queryMyActivityList':
        return await queryMyActivityList.main(event, context);
    case 'modifyMyActivity':
        return await modifyMyActivity.main(event, context);
    case 'merchantPrizeList':
        return await merchantPrizeList.main(event, context);
    case 'myParticipateActivity':
        return await myParticipateActivity.main(event, context);
    case 'participateActivity':
        return await participateActivity.main(event, context);
    case 'getActivityCount':
        return await getActivityCount.main(event, context);
    case 'recommend':
        return await recommend.main(event, context);
    case 'newest':
        return await newest.main(event, context);
    case 'queryActivity':
        return await queryActivity.main(event, context);
    case 'listType':
        return await listType.main(event, context);
    case 'activityTemplate':
        return await activityTemplate.main(event, context);
  }
};
