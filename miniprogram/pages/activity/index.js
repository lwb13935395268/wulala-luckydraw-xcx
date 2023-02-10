// pages/activity/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0, //默认是活动项
        activityList:[],//活动列表
    },
    toCommodityDetails:function(){
        wx.navigateTo({
          url: '/pages/activity/activityDetail/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let _this  = this;
        wx.setNavigationBarTitle({
            title: '活动中心'
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#eb524c',
            animation: {
              duration: 400,
              timingFunc: 'easeIn'
            }
        })
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'queryMyActivityList',
                wholeActivity:true
            },
            success(res){
                console.log(res.result.data.data);
                _this.setData({
                    activityList:res.result.data.data,
                })
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