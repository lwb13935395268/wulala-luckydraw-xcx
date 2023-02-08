const create = require("./create/index");
const queryMyActivityList = require("./queryMyActivityList/index");
const modifyMyActivity = require("./modifyMyActivity");
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'create':
        return await create.main(event, context);
    case 'queryMyActivityList':
        return await queryMyActivityList.main(event, context);
    case 'modifyMyActivity':
        return await modifyMyActivity.main(event, context)
  }
};
