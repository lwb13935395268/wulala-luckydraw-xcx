const submit = require("./submit/index");
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'submit':
        return await submit.main(event, context);
  }
};