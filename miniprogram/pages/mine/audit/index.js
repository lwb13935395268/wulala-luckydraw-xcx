// pages/mine/audit/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0, //默认是活动项
        audit:''
    },
    pagechange: function (e) {
        this.setData({
            currentIndex: e.detail.current,
        })
        // }
    },
    //点击tab时触发
    titleClick: function (e) {
        this.setData({
        currentIndex: e.currentTarget.dataset.idx
        })
    },
    auditDetail: function (e){

        wx.navigateTo({
          url: `/pages/mine/audit/detail/index`,
          success: function(res) {
            // 通过 eventChannel 向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', { data: e.currentTarget.dataset.item })
          }
        })

    },
    auditSuccess: function (){
        wx.navigateTo({
          url: '/pages/mine/audit/succeed/index',
        })
    },
    auditFail: function (){
        wx.navigateTo({
          url: '/pages/mine/audit/fail/index',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let _this = this;
        wx.cloud.callFunction({
            name:'uploading',
            data:{
                type:'query',
            },
            success(res){
                // console.log(res.result.data.data);
                _this.setData({
                    audit: res.result.data.data
                })
                console.log(_this.data.audit);
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