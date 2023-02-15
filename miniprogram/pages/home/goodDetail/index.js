// pages/home/goodDetail/index.js
Page({
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setTitle();
        this.data.prizeId = options.id;
        this.loadGoodsDetail()
    },
    navgatorTabBar(path) {
        wx.switchTab({
            url: '../../' + path,
        })
    },
    async getUserIntegral() {
        let {
            getUserInfo
        } = getApp();
        let app = getApp()
        let res = await getUserInfo();
        app.globalData.userInfo = res.data;
    },

    async login() {
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
    toLogin() {
        let app = getApp();
        app.globalData.callLogin = true;
        console.log('to');
        wx.switchTab({
            url: '../../mine/index',
        })
    },
    exchangePrize() {
        let {
            exchangePrize,
            getUserInfo
        } = getApp();
        let app = getApp();
        if (!app.globalData.loginStatus) {
            this.login();
            return
        }
        if (this.data.prizeInfo.price > app.globalData.userInfo.integral) {
            console.log('进来');
            wx.showToast({
                title: '积分不足',
                icon: 'error',
            })
        } else if (this.data.prizeInfo.remainderNum <= 0) {
            wx.showToast({
                title: '奖品已兑换完',
                icon: 'error',
            })

        } else {
            wx.showModal({
                title: '兑换',
                content: '是否确认兑换该奖品?',
                success: async res => {
                    if (res.confirm) {
                        wx.showLoading({
                            title: '兑换中..',
                            mask: true
                        })
                        let res = await exchangePrize(this.data.prizeId);
                        if (res.status == 200) {
                            let res2 = await getUserInfo();
                            if (!Array.isArray(res2.data)) {
                                app.globalData.userInfo = res2.data
                            }
                            wx.hideLoading()
                            this.getPrizeDetail();
                            this.getUserIntegral()
                            wx.showToast({
                                title: '兑换成功',
                            });
                        } else {
                            wx.hideLoading()
                            wx.showToast({
                                title: res.msg,
                                icon: 'error',
                            })
                        }
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
    },
    // 切换swiper-item触发bindchange事件
    pagechange: function (e) {
        // 通过touch判断，改变tab的下标值
        // console.log(e);
        // if ("touch" === e.detail.source) {
        // let currentPageIndex = this.data.currentIndex;
        // currentPageIndex = (currentPageIndex + 1) % 2;
        // 拿到当前索引并动态改变
        this.setData({
            currentIndex: e.detail.current,
        })
        // }
    },
    setTitle() {
        wx.setNavigationBarTitle({
            title: '奖品详情'
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
    async getPrizeDetail() {
        let id = this.data.prizeId
        let {
            getPrizeDetail
        } = getApp();
        let res = await getPrizeDetail(id);
        if (res.status == 200) {
            this.setData({
                prizeInfo: res.data
            });
        }
        return res
    },
    async loadGoodsDetail() {
        wx.showLoading({
            title: '加载中..',
            mask: true
        })
        let app = getApp();
        if (app.globalData.loginStatus) {
            this.setData({
                integral: app.globalData.userInfo.integral
            })
        }
        await this.getPrizeDetail();
        wx.hideLoading()
    },
    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0, //默认是活动项
        prizeInfo: {},
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

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