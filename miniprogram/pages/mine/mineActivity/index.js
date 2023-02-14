// pages/mine/mineActivity/index.js
Page({
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.setTitle();
        this.firstLoadActivity()
    },
    async firstLoadActivity(){
        wx.showLoading({
            title: '加载中..',
          })
       await this.getMineActivitys();
        wx.hideLoading()
    },
    navgator(e) {
        let path = e.currentTarget.dataset.path;
        let app = getApp();
        app.globalData.callLogin = true;
        wx.navigateTo({
            url: '/pages/mine/' + path,
        })
    },
    setTitle() {
        wx.setNavigationBarTitle({
            title: '我的活动'
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
    async getMineActivitys() {
        let {
            getMineActivity
        } = getApp();
        let res = await getMineActivity();
        if (res.status == 200) {
            this.setData({
                activityList: res.data,
                overActivityList: res.data
            })
        }
        return res
    },
    onMyEvent(e) {
        // e.detail//下标
        this.getMineActivitys()
    },
    toCommodityDetails(e){
        wx.navigateTo({
          url: '/pages/activity/activityDetail/index?id=' + e.target.dataset.id,
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        titleList: ['正在进行', '已结束']
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

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
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
            let res = await this.getMineActivitys();
        } catch {
            wx.showToast({
                icon: 'error',
                title: '刷新失败',
            })
        }
        wx.stopPullDownRefresh();
        wx.hideLoading();
        wx.hideNavigationBarLoading();
    }
})