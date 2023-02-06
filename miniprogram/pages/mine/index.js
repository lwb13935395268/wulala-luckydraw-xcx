// pages/mine/index.js
Page({
    navgatorTabBar(e) {
        let path = e.currentTarget.dataset.path;
        wx.switchTab({
            url: '/pages/' + path,
        })
    },
    navgator(e) {
        let path = e.currentTarget.dataset.path;
        wx.navigateTo({
            url: '/pages/' + path,
        })
    },
    addUser(openId) {
        return wx.cloud.callFunction({
            name: 'user',
            data: {
                type: 'add',
                openId: openId
            }
        }).then(res => {
            return res
        })
    },
    getUserOpenId() {
        return wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'getOpenId',
            }
        }).then(res => {
            return res.result.userInfo.openId
        })
    },
    async getUserInfo() {
        let {
            getUserInfo
        } = getApp();
        let app=getApp()
        let {
            userInfo
        } = await getUserInfo('我的页面登录');
        if (userInfo) {
            this.setData({
                userInfo
            });
            console.log(userInfo);
        };
        let openId = await this.getUserOpenId();
        let res = await wx.cloud.callFunction({
            name: 'user',
            data: {
                type: 'detail',
                openId
            }
        })
        if (res.result.length) {
            app.globalData.openId = res.result[0].openId;
            app.globalData.userId=res.result[0]._id;
            console.log(app.globalData);
        } else {
           let res2= await this.addUser(openId);
           app.globalData.openId =openId;
           app.globalData.userId=res2.result._id;
        }
    },
    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '我的'
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#eb524c',
            animation: {
                duration: 400,
                timingFunc: 'easeIn'
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})