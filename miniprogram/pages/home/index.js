// pages/home/index.js
Page({
    async getPrizeList() {
        let {
            getPrizeList
        } = getApp();
        try {
            let res = await getPrizeList();
            this.setData({
                prizeList: res.data,
                hotPrizeList: res.data.filter(e => {
                    return e.prizeType == 1
                }),
                disPrizeList: res.data.filter(e => {
                    return e.prizeType == 2
                }),
                burstPrizeList: res.data.filter(e => {
                    return e.prizeType == 3
                })
            });
        } catch {
            wx.showToast({
                icon: 'error',
                title: '获取失败',
            })
        }
    },
    setRuleMask() {
        this.setData({
            ruleMask: !this.data.ruleMask
        })
    },
    toLogin() {
        let app = getApp();
        app.globalData.callLogin = true;
        wx.switchTab({
            url: '../mine/index',
        })
    },
    to(path, parmas) {
        wx.navigateTo({
            url: '/pages/home/' + path + parmas,
        })
    },
    navgator(e) {
        let path = e.currentTarget.dataset.path;
        let id = e.currentTarget.dataset.id;
        let powerFlag = e.currentTarget.dataset.power || false;
        let parmas = '';
        if (id) {
            parmas = '?id=' + id
        }
        if (powerFlag && !this.data.loginStatus) {
            this.login()
            return
        } else {
            this.to(path, parmas)
        }
    },
    getPageParams() {
        let app = getApp()
        this.setData({
            userInfo: app.globalData.userInfo,
            userId: app.globalData.userId,
            loginStatus: app.globalData.loginStatus,
        })
    },
    async getUserInfo() {
        //登录 关闭
        getApp().globalData.loginFlag = false;
        let {
            getUserInfo
        } = getApp();
        let userInfoRes = await getUserInfo();
        console.log(userInfoRes);
        if (userInfoRes.status == 200 && !Array.isArray(userInfoRes.data)) {
            this.setData({
                loginStatus: true,
                userInfo: userInfoRes.data
            })
            getApp().globalData.loginStatus = true;
            getApp().globalData.userInfo = userInfoRes.data;
            getApp().globalData.homeLogin = true;
        }else{
            console.log('查无此人');
        }
    },
    async login() {
        let {
            login,
            addUser
        } = getApp();
        await login('登录');
        wx.showLoading({
            title: '登录中..',
            mask: true
        })
        let addResult = await addUser();
        wx.hideLoading()
        if (addResult.status == 200) {
            wx.showToast({
                title: '登录成功',
            })
            this.setData({
                userInfo: addResult.data,
                loginStatus: true
            })
            getApp().globalData.loginStatus = true;
            getApp().globalData.userInfo = addResult.data;
        } else {
            wx.showToast({
                icon: 'error',
                title: '授权失败',
            })
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        position: 'center',
        ruleMask: false,
        scrollbar: false,
        enhanced: true,
        scroll: true,
        loginStatus: false,
        prizeList: [],
        isShowList: false,
        isShowLogin: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.getUserInfo()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        this.setData({
            show: true
        })
        let {
            userInfo,
            loginFlag,
            getInfoFlag,
            loginStatus,
            homeLogin,
            mineLogin
        } = getApp().globalData;
        this.setData({
            loginStatus:loginStatus,
            userInfo:userInfo
        })
        if (!homeLogin&&mineLogin) {
            await this.getUserInfo()
            console.log(2);
        }else if (getInfoFlag) {
            await this.getUserInfo()
        }
        await this.getPrizeList();
        this.setData({
            show: false
        })
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
        this.onRefresh();
    },
    async onRefresh() {
        //导航条加载动画
        wx.showNavigationBarLoading()
        //loading 提示框
        wx.showLoading({
            title: '刷新中..',
            mask: true
        })
        try {
            let res = await this.getPrizeList();
        } catch {
            wx.hideLoading()
            this.data.isShowList = false;
            this.data.isShowLogin = false;
            wx.showToast({
                icon: 'error',
                title: '刷新失败',
            })
        }
        wx.hideLoading()
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
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