// pages/home/prizeDetail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        prizeInfo: {},
        show: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        this.getprizeInfo(options.prizeId);
    },
    async getprizeInfo(prizeId) {
        let {
            getMinePrizeDetail
        } = getApp();
        let res = await getMinePrizeDetail(prizeId);
        if (res.status == 200) {
            this.setData({
                prizeInfo: {
                    title: res.data[0].title,
                    address: res.data[0].address,
                    exchangeCode: res.data[0].exchangeCode,
                    imageUrl: res.data[0].imageUrl,
                    start: new Date(res.data[0].startDate).toLocaleDateString(),
                    endDate: new Date(res.data[0].endDate).toLocaleDateString()
                }
            })
        }
        this.setData({
            show: false
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