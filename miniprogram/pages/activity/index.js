// pages/activity/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0, //默认是活动项
    },
    // 切换swiper-item触发bindchange事件
    pagechange: function (e) {
        this.setData({
            currentIndex: e.detail.current,
        })
    },

    //点击tab时触发
    titleClick: function (e) {
        this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
        })
    },
    toCommodityDetails:function(){
        wx.navigateTo({
          url: '/pages/activity/activityDetail/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '活动中心'
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#eb524c',
            animation: {
              duration: 400,
              timingFunc: 'easeIn'
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