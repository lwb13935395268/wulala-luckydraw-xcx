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
        this.globalData = {
            userId: '',
            userInfo: {},
            loginStatus: false,
        };
    },
    //获取用户信息接口
    getUserInfo() {
        console.log('userinfo');
        return wx.cloud.callFunction({
            name: 'user',
            data: {
                type: 'detail',
                openId: this.globalData.openId
            }
        }).then(res => {
            return res.result
        })
    },
    //添加新用户接口
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
    //获取奖品列表接口
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
    //奖品详情接口
    getPrizeDetail(prizeId) {
        return wx.cloud.callFunction({
            name: 'prize',
            data: {
                type: 'detail',
                prizeId
            }
        }).then(res => {
            return res.result
        })
    },
    //兑换奖品接口
    exchangePrize(prizeId) {
        return wx.cloud.callFunction({
            name: 'prize',
            data: {
                type: 'exchange',
                prizeId,
            }
        }).then(res => {
            return res.result
        })
    },
    // 返回上一级   
    back: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    //wx登录
    login(desc) {
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