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
            },
            loginStatus: false,
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
    getUserInfo() {
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
    // 返回上一级   
    back: function () {
        wx.navigateBack({
            delta: 1
        })
    },
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