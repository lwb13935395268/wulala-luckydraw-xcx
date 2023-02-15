// pages/home/index.js
Page({
    async getPrizeList() {
        let {
            getPrizeList
        } = getApp();
        wx.showLoading({
            title: '加载中..',
        })
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
            wx.hideLoading();
        } catch {
            wx.hideLoading();
            wx.showToast({
                icon: 'error',
                title: '获取奖品失败',
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
        getApp().globalData.getInfoFlag=false;
        let {
            getUserInfo
        } = getApp();
        let userInfoRes = await getUserInfo();
        console.log(userInfoRes);
        if (userInfoRes.status == 200 && !Array.isArray(userInfoRes.data)) {
            this.setData({
                loginStatus:true,
                userInfo:userInfoRes.data
            })
            getApp().globalData.loginStatus = true;
            getApp().globalData.userInfo = userInfoRes.data;
            console.log(this.data);
        }
    },
    async login(){
        let {
            login,
            addUser
        } = getApp();
        await login('登录');
        console.log('同意了');
        wx.showLoading({
            title: '正在授权..',
        })
        let addResult = await addUser();
        console.log(addResult);
        wx.hideLoading()
        if (addResult.status == 200) {
            wx.showToast({
                title: '授权登录',
            })
            this.setData({
                userInfo:addResult.data,
                loginStatus:true
            })
            getApp().globalData.loginStatus=true;
            getApp().globalData.userInfo=addResult.data;
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
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.getUserInfo();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getPrizeList();
        // if(getApp().globalData.getInfoFlag){
            this.getUserInfo();
        // }
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
            title: '刷新中...',
        })
        try {
            let res = await this.getPrizeList();
            wx.hideLoading();

        } catch {
            wx.hideLoading();
            wx.showToast({
                icon: 'error',
                title: '刷新失败',
            })

        }
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