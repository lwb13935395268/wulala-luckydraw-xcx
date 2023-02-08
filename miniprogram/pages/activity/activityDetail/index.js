// pages/activityDetail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        modalName: false,
        scrollbar: false,
        enhanced: true,
        catchtouchmove: true,
    },
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

    nextHome:function () {
        wx.switchTab({
          url: '/pages/home/index',
        })
      },
    // onShareAppMessage: function (res){
    //     console.log(res);
    //     console.log('转发页面');
    //     console.log(res.webViewUrl);
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.showShareMenu({
            withShareTicket: true,
            menus:['shareAppMessage','shareTimeline']
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