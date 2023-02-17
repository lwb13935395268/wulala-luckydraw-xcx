// pages/home/exchangeRecord/index.js
Page({
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setTitle()
        this.getPrizeRecord()
    },
    toPrizeDetail(e){
        wx.navigateTo({
          url: '../prizeDetail/index?prizeId='+e.currentTarget.dataset.id,
        })
    },
    setTitle(){
        wx.setNavigationBarTitle({
            title: '兑换记录'
          })
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#e04540',
            animation: {
              duration: 400,
              timingFunc: 'easeIn'
            }
          })
    },
    async getPrizeRecord(){
        wx.showLoading({
          title: '加载中',
          mask:true
        })
        let {
            getPrizeRecord
        } = getApp();
        let res = await getPrizeRecord();
        this.setData({
            prizeList:res.data.sort((m,n)=>{
              return n.date-m.date
            })
        })
        wx.hideLoading()
    },
    /**
     * 页面的初始数据
     */
    data: {
        prizeList:[]
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