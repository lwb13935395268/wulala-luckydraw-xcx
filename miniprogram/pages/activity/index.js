// pages/activity/index.js
Page({

    /**
     * 页面的初始数据         
     */
    data: {
        currentIndex: 0, //tab下标
        activityList:[],//活动列表
        isShow:'',//loading
    },
    toCommodityDetails:function(e){
        wx.navigateTo({
          url: '/pages/activity/activityDetail/index?id=' + e.target.dataset.id,
        })
    },
    //下标
    onMyEvent:function(e){
        this.setData({
            isShow:true
        });
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'listType',
                listType:e.detail == undefined ? e : e.detail,
            },
            success:(res)=>{
                this.setData({
                    activityList:res.result.data.data,
                    isShow:false
                });
                this.data.activityList.forEach((item,index)=>{
                    let startDate = "activityList["+index+"].startDate";
                    let endDate = "activityList["+index+"].endDate";
                    this.setData({
                        [startDate]:new Date(item.startDate).toLocaleString().replace(/\//g,'-'),
                        [endDate]:new Date(item.endDate).toLocaleString().replace(/\//g,'-')
                    })
                })
            }
        })
    },
    loadImg:function(){
        this.setData({
            isShow:false,
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.onMyEvent(0);
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
        getApp().onRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        console.log(1);
        wx.showLoading({
            title: '数据正在加载中...',
            mask:true
        });
        setTimeout(()=>{
            wx.hideLoading()
        },2000)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})