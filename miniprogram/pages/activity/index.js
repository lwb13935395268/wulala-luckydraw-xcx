// pages/activity/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0, //tab下标
        activityList:[],//活动列表
        participateActivity:[],//已参与活动列表
        recommend:[],//推荐的活动列表
    },
    toCommodityDetails:function(e){
        console.log(e.target.dataset.id);
        wx.navigateTo({
          url: '/pages/activity/activityDetail/index?id=' + e.target.dataset.id,
        })
    },
    //下标
    onMyEvent:function(e){
        console.log(e.detail);
        switch (e.detail) {
            case 0:
                this.wholeActivity();//全部
                break;
            case 1:
                this.recommend();//推荐
                break;
            case 2:
                break;
            case 3:
                this.participateActivity();//已参与
                break;
            case 4:
                break;
            default:
                break;
        }
    },
    // 全部
    wholeActivity:function(){
        let _this = this
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'queryMyActivityList',
                wholeActivity:true
            },
            success(res){
                console.log(res);
                _this.setData({
                    activityList:res.result.data,
                })
            }
        })
    },
    //推荐
    recommend:function(){
        let _this = this;
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'recommend',
            },
            success(res){
                console.log(res);
                _this.setData({
                    recommend:res.result.data
                })
            }
        })
    },
    // 已参与
    participateActivity:function(){
        let _this = this;
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'myParticipateActivity'
            },
            success(res){
                console.log(res.result.data);
                _this.setData({
                    participateActivity:res.result.data
                });
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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
        this.wholeActivity();
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