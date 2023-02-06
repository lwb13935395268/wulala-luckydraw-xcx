// pages/mine/selectActivity/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    toCreateActivity:function(){
        wx.navigateTo({
          url: '/pages/mine/createActivity/index',
        })
    },
    toParticipateIn:function(){
        wx.switchTab({
          url: '/pages/activity/index',
        })
    },
    toAuthentication:function(){
        wx.navigateTo({
          url: '/pages/mine/uploading/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '发起活动'
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