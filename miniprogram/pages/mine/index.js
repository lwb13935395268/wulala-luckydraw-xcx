// pages/mine/index.js
Page({
    navgatorTabBar(e) {
        let path = e.currentTarget.dataset.path;
        wx.switchTab({
            url: '/pages/' + path,
        })
    },
    navgator(e) {
        if (this.data.loginStatus) {
        let path = e.currentTarget.dataset.path;
        wx.navigateTo({
            url: '/pages/' + path,
        })
        } else {
            wx.showModal({
                content: '登录后可查看',
                confirmText: '登录',
                success: res => {
                    if (res.confirm) {
                        this.getUserInfo();
                    }
                }
            })
        }
    },
    async getUserInfo() {

        wx.showLoading({
          title: '登录中',
        })
        let app = getApp();
        app.globalData.callLogin = false;
        let {
            getUserInfo,
        } = getApp();
        let res = await getUserInfo();
        if (res.status == 200) {
            this.setData({
                loginStatus: true,
                userInfo: res.data
            })
            app.globalData.loginStatus = true;
            app.globalData.userInfo = res.data;
            this.getMineActivitys()
            wx.hideLoading();
            wx.showToast({
                title: '登录成功',
            })
        } else {
            wx.showToast({
                title: '登录失败',
                icon:'error'
            })
        }
    },
    async getMineActivitys(){
        let {
            getMineActivity
        }=getApp();
        let res=await getMineActivity();
        if(res.status==200){
            this.setData({
                mineActivityNum:res.data.length
            })
        }
    },
    async getMineCreatedActivity(){
        let {
            getMineCreatedActivity
        }=getApp();
        let res=await getMineCreatedActivity();
        if(res.status==200){
            this.setData({
                mineCreatedActivityNum:res.data.length
            })
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
    getPageParams() {
        let app = getApp()
        this.setData({
            userInfo: app.globalData.userInfo,
            loginStatus: app.globalData.loginStatus
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
        this.setTitle();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    getUserParams() {
        let app = getApp();
        console.log(app.globalData);
        if (app.globalData.loginStatus) {
            this.getPageParams()
        }
        if (app.globalData.callLogin) {
            console.log(999);
            this.getUserInfo()
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getUserParams()
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