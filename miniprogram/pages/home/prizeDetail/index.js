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
                    startDate: this.getDate(res.data[0].startDate),
                    endDate: this.getDate(res.data[0].endDate),
                    type:res.data[0].type
                }
            })
            this.setData({
                show: false
            })
        }else{

            this.setData({
                show: false
            })
            wx.showToast({
              title: '查询失败',
              icon:'error'
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    getDate(date){
		var time = new Date(date);
		var y = time.getFullYear();
		var m = time.getMonth() + 1;
		var d = time.getDate();
        return y+'/'+m+'/'+d
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