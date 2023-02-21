// pages/home/IntegralRecord/index.js
Page({
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    },
    async getIntegralRecord() {
        this.setData({
            show:true
        })
        let {
            getIntegralRecord
        } = getApp();
        let app = getApp();
        let integralRecordRes = await getIntegralRecord();
        if(integralRecordRes.status==200){
        this.setData({
            integral :app.globalData.userInfo.integral,
            recordList: integralRecordRes.data.sort((m, n) => {
                return n.date - m.date
            })
        })
        }
        this.setData({
            show:false
        })
        return integralRecordRes
    },
    /**
     * 页面的初始数据
     */
    data: {
        recordList: [],
        show:false
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
        this.getIntegralRecord()

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
    async onPullDownRefresh() {
        wx.showNavigationBarLoading();
        await this.getIntegralRecord();
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },
})