// app.js
App({
    onLaunch: function () {
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                // env: 'my-env-id',
                traceUser: true,
            });
        }
        this.getOpenId();
        this.globalData = {
            openId: '',
            userId: '',
            userInfo: {
                area: "未选择",
                awards: 0,
                birthdayDate: "未填写",
                createdActivity: 0,
                integral: 0,
                joinedActivity: 0,
                money: 0,
                sex: "未填写",
                openId: ''
            },
            loginStatus: false,
            shop: {
                prizeName: '腾讯视频会员一个月',
                price: 360,
                limitNum: 1500, //总件
                prizeDes: '这是商品的详细信息，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈',
                exchangeNum: 688, //已兑换
                remainderNum: 20, //剩余
                imageUrl: 'https://636c-cloud1-6g94u1qn210fa109-1316664325.tcb.qcloud.la/img-prize_aiqiyi.png?sign=6fc4d78c8f368b597d9128da3feb6862&t=1675738370',
                imageArr: ['https://636c-cloud1-6g94u1qn210fa109-1316664325.tcb.qcloud.la/img-prize_aiqiyi1.png?sign=30026d2779e46eb90c66c9e5f4d84c24&t=1675738648', 'https://636c-cloud1-6g94u1qn210fa109-1316664325.tcb.qcloud.la/img-prize_aiqiyi2.png?sign=fc919df3067c1d9b95d6fa94d54075f4&t=1675738658']
            }
        };
    },
    getOpenId() {
        return wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'getOpenId',
            }
        }).then(res => {
            this.globalData.openId = res.result.userInfo.openId;
            this.globalData.userInfo.openId = res.result.userInfo.openId;
        })
    },
    getUserInfos() {
        return wx.cloud.callFunction({
            name: 'user',
            data: {
                type: 'detail',
                openId: this.globalData.openId
            }
        }).then(res => {
            // console.log(res);
            return res.result
        })
    },

    addUser() {
        return wx.cloud.callFunction({
            name: 'user',
            data: {
                type: 'add',
                openId: this.globalData.openId,
                data: this.globalData.userInfo
            }
        }).then(res => {
            return res
        })
    },
    getPrizeList() {
        return wx.cloud.callFunction({
            name: 'prize',
            data: {
                type: 'list'
            }
        }).then(res => {
            // console.log(res);
            return res.result
        })
    },
    getPrizeDetail(prizeId) {
        console.log(22);
        return wx.cloud.callFunction({
            name: 'prize',
            data: {
                type: 'detail',
                prizeId
            }
        }).then(res => {
            console.log(res);
            return res.result
        })
    },
    // 返回上一级   
    back: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    getUserInfo(desc) {
        return new Promise((resolve, reject) => {
            wx.getUserProfile({
                desc,
                success(res) {
                    resolve(res);
                }
            })
        })
    }
});