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
    async getUserInfo() {
        let {
            getUserInfo,
            addUser,
            login
        } = getApp();
        let app = getApp();
        let {
            userInfo
        } = await login('我的页面登录');
        if (userInfo) {
            this.setData({
                userInfos: userInfo,
                loginStatus: true
            });
            app.globalData.loginStatus = true
        };
        let res = await getUserInfo();
        console.log(res);
        if (res.status == 200) {
            if (res.data) {
                console.log('有这个人');
                app.globalData.userInfo = res.data;
                this.setData({
                    userInfo: res.data
                })
            } else {
                console.log('添加');
                let res2 = await addUser();
            }
        } else {
            console.log('登入失败');
        }


    },
    setTitle() {
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
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let app = getApp()
        this.setTitle();
        this.setData({
            userInfo: app.globalData.userInfo,
            loginStatus: app.globalData.loginStatus
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