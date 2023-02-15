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
        newest:[],//最新
    },
    toCommodityDetails:function(e){
        // console.log(e.target.dataset.id);
        wx.navigateTo({
          url: '/pages/activity/activityDetail/index?id=' + e.target.dataset.id,
        })
    },
    //下标
    onMyEvent:function(e){
        // console.log(e.detail)
        switch (e.detail) {
            case 0:
                this.newest();//最新
                break;
            case 1:
                this.recommend();//推荐
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                break;
        }
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
                _this.setData({
                    recommend:res.result.data
                });
            }
        })
    },
    // 最新
    newest:function(){
        let _this = this;
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'newest'
            },
            success(res){
                _this.setData({
                    newest:res.result.data
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
        this.newest();
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'listType',
                listType:1,
            },
            success(res){
                console.log(res.result.data);
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
        wx.showLoading({
            title: '加载中',
            mask: true,
        });
        this.newest();
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