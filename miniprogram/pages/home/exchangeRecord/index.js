// pages/home/exchangeRecord/index.js
Page({
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    },
    toPrizeDetail(e){
        wx.navigateTo({
          url: '../prizeDetail/index?prizeId='+e.currentTarget.dataset.id,
        })
    },
    loadImg(){
        this.setData({
            imageNum:this.data.imageNum+1
        });
        if(this.data.imageNum==this.data.imageMaxNum){
            this.setData({
                show:false
            })
        }
    },
    async getPrizeRecord(){
        this.setData({
            show:true
        })
        let {
            getPrizeRecord
        } = getApp();
        let prizeRecordRes = await getPrizeRecord();
        this.setData({
            prizeList:prizeRecordRes.data.sort((m,n)=>{
              return n.date-m.date
            }),
            imageMaxNum:prizeRecordRes.data.length
        })

    },
    /**
     * 页面的初始数据
     */
    data: {
        prizeList:[],
        show:true,
        imageNum:0,
        imageMaxNum:0
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
        this.getPrizeRecord()

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