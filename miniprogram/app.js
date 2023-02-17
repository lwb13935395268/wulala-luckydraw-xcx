// app.js
App({
    async onLaunch() {
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
            loginStatus: false, //登录状态
            callLogin: false,
            loginFlag: true, //是否登录
            getInfoFlag: false, //是否获取信息
            getMineFlag: false, //是否获取wode信息
            getHomeFlag: false, //是否获取home信息
            homeLogin: false, //HOME页面
            mineLogin: false //MINE页面
        };
        console.log(1);
    },
    //获取用户openId
    async getOpenid() {
        return wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'getOpenId',
            }
        }).then(res => {
            this.globalData.openId=res.result.userInfo.openId
            return res.result.userInfo.openId
        })
    },
    //获取奖品详情
    getMinePrizeDetail(prizeId) {
        return wx.cloud.callFunction({
            name: 'transaction',
            data: {
                type: 'query',
                prizeId
            }
        }).then(res => {
            return res.result
        })
    },
    //获取头像列表
    getAvatarList() {
        return wx.cloud.callFunction({
            name: 'user',
            data: {
                type: 'getAvatar',
            }
        }).then(res => {
            return res.result
        })
    },
    //修改用户信息
    updateUserInfo(userInfo) {
        return wx.cloud.callFunction({
            name: 'user',
            data: {
                type: 'update',
                data: userInfo
            }
        }).then(res => {
            return res.result
        })
    },
    //获取用户信息接口
    async getUserInfo() {
        let openId= await this.getOpenid();
        return wx.cloud.callFunction({
            name: 'user',
            data: {
                type: 'detail',
                openId
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
            name: 'transaction',
            data: {
                type: 'prizeList'
            }
        }).then(res => {
            return res.result
        })
    },
    //奖品详情接口
    getPrizeDetail(prizeId) {
        return wx.cloud.callFunction({
            name: 'transaction',
            data: {
                type: 'prizeDetail',
                prizeId
            }
        }).then(res => {
            return res.result
        })
    },
    //兑换奖品接口
    exchangePrize(prizeId) {
        return wx.cloud.callFunction({
            name: 'transaction',
            data: {
                type: 'prizeExchange',
                prizeId,
                openId:this.globalData.openId
            }
        }).then(res => {
            return res.result
        })
    },
    //获取积分记录接口
    getIntegralRecord() {
        return wx.cloud.callFunction({
            name: 'transaction',
            data: {
                type: 'intergralRecord',
                openId:this.globalData.openId
            }
        }).then(res => {
            return res.result
        })
    },
    //获取兑奖记录
    getPrizeRecord() {
        return wx.cloud.callFunction({
            name: 'transaction',
            data: {
                type: 'prizeRecord',
            }
        }).then(res => {
            return res.result
        })
    },
    //获取我参与的活动
    getMineActivity() {
        return wx.cloud.callFunction({
            name: 'activity',
            data: {
                type: 'myParticipateActivity',
            }
        }).then(res => {
            return res.result
        })
    },
    //获取我创建的活动
    getMineCreatedActivity() {
        return wx.cloud.callFunction({
            name: 'activity',
            data: {
                type: 'queryMyActivityList',
                // wholeActivity: false
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
    //新增用户
    addUser() {
        return wx.cloud.callFunction({
            name: 'user',
            data: {
                type: 'add',
            }
        }).then(res => {
            return res.result
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
    },
    // 下拉刷新
    onPullDownRefresh: function () {
        this.onRefresh();
    },
    onRefresh: function () {
        //导航条加载动画
        wx.showNavigationBarLoading();
        setTimeout(function () {
            wx.hideNavigationBarLoading();
            //停止下拉刷新
            wx.stopPullDownRefresh();
        }, 500);
    },
});