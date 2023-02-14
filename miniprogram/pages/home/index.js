// pages/home/index.js
Page({
    setModal() {
        this.setData({
            modalName: !this.data.modalName
        })
    },
    switch () {
        this.setData({
            catchtouchmove: !this.data.catchtouchmove
        })
    },
    //   modal(){
    //     this.setData({
    //       modalName:!this.data.modalName
    //     })
    //   },
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
            wx.showModal({
                content: '您还没有登录，是否前往登录？',
                confirmText: '去登录',
                success: res => {
                    if (res.confirm) {
                        this.toLogin();
                    }
                }
            })
            return
        } else {
            this.to(path, parmas)
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        position: 'center',
        catchtouchmove: true,
        modalName: false,
        scrollbar: false,
        enhanced: true,
        scroll: true,
        loginStatus: false,
        prizeList: [],
    },

    setTitle() {
        wx.setNavigationBarTitle({
            title: '首页'
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#e04540',
            animation: {
                duration: 400,
                timingFunc: 'easeIn'
            }
        })
    },
    getPageParams() {
        let app = getApp()
        this.setData({
            userInfo: app.globalData.userInfo,
            userId: app.globalData.userId,
            loginStatus: app.globalData.loginStatus,
        })
    },
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
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.setTitle();
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
        let app = getApp();
        this.data.loginStatus = app.globalData.loginStatus;
        if (this.data.loginStatus) {
            this.getPageParams();
        }
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
        wx.hideLoading();
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