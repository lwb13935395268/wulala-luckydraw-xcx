// pages/mine/audit/fail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl:['https://636c-cloud1-6g94u1qn210fa109-1316664325.tcb.qcloud.la/yyzzs.png?sign=455f6eb54223c646aeef259a261cdabc&t=1675321156/200*200','https://636c-cloud1-6g94u1qn210fa109-1316664325.tcb.qcloud.la/yyzzs.png?sign=455f6eb54223c646aeef259a261cdabc&t=1675321156/200*200','https://636c-cloud1-6g94u1qn210fa109-1316664325.tcb.qcloud.la/yyzzs.png?sign=455f6eb54223c646aeef259a261cdabc&t=1675321156/200*200','https://636c-cloud1-6g94u1qn210fa109-1316664325.tcb.qcloud.la/yyzzs.png?sign=455f6eb54223c646aeef259a261cdabc&t=1675321156/200*200']
    },
    clickImg: function(e){
        var imgUrl = this.data.imgUrl;
        wx.previewImage({
          urls: imgUrl,
          success: function(res){},
          fail: function(res){
              console.log(res);
          }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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