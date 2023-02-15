// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
// 云函数入口函数
const db = cloud.database();
const _ = db.command
exports.main = async (event, context) => {
    let changeTyp1 = () => {
        let nowTime = new Date().getTime();
    return new Promise((resolve, reject) => {
      db.collection('activity').where({
        startDate: _.lt(nowTime)
      }).update({
        data: {
          activityType: 0
        }
      }).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  let changeType2 = ()=>{
    let nowTime = new Date().getTime();

    return new Promise((resolve,reject)=>{
      db.collection('activity').where({
        startDate: _.gt(nowTime)
      }).update({
        data: {
          activityType: 1,
        }
      }).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  let changeType3 = ()=>{
    let nowTime = new Date().getTime();

    return new Promise((resolve,reject)=>{
      db.collection('activity').where({
        endDate: _.gt(nowTime)
      }).update({
        data: {
          activityType: 2
        }
      }).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  }
  Promise.all([changeTyp1(),changeType2(),changeType3()]).then(res=>{
    console.log('----------------我走到了更改的方法----------------');
    console.log(res);
    return res;
  }).catch(err=>{
    return err;
  })
}