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
            getUserInfo,
            addUser,
            getUserInfos
        } = getApp();
        let app = getApp()
        let {
            userInfo
        } = await getUserInfo('我的页面登录');
        if (userInfo) {
            this.setData({
                userInfos: userInfo,
                loginStatus: true
            });
            app.globalData.loginStatus = true
        };
        let res = await getUserInfos();
        console.log(res);
        if (res.length) {
            console.log('有这个人');
            app.globalData.userInfo = res[0];
            this.setData({
                userInfo:res[0]
            })
        } else {
            console.log('添加');
            let res2 = await addUser();
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
        let app = getApp()
        this.setData({
            userInfo: app.globalData.userInfo,
            loginStatus: app.globalData.loginStatus
        })
        
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