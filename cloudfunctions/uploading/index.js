const create = require("./create/index");
const query = require("./query/index")
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'create':
      return await create.main(event, context);
    case 'query':
        return await query.main(event, context);
    case 'modify':
        return await query.main(event, context);
  }
};
