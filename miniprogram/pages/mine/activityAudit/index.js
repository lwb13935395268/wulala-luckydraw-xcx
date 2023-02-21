// pages/mine/activityAudit/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    popup(){
        wx.showModal({
            editable:true,//显示输入框00000
            placeholderText:'输入文字',//显示输入框提示信息
            success: res => {              
              if (res.confirm) { //点击了确认
              } else {
              }
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