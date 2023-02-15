// pages/home/IntegralRecord/index.js
Page({
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getIntegralRecord()
    },
    async getIntegralRecord() {

        wx.showLoading({
            title: '加载中..',
            mask: true
        })
        let {
            getIntegralRecord
        } = getApp();
        let app = getApp();
        let res = await getIntegralRecord();
        this.setData({
            integral :app.globalData.userInfo.integral,
            recordList: res.data.sort((m, n) => {
                return n.date - m.date
            })
        })
        wx.hideLoading()
    },
    /**
     * 页面的初始数据
     */
    data: {
        recordList: []
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
})