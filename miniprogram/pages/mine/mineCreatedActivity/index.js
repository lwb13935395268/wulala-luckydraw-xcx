// pages/mine/mineCreatedActivity/index.js
Page({

    navgator(e) {
        let path = e.currentTarget.dataset.path;
        wx.navigateTo({
            url: '/pages/mine/' + path,
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        myActicityList:[],//我创建的活动
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        wx.setNavigationBarTitle({
            title: '发布的活动'
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#eb524c',
            animation: {
                duration: 400,
                timingFunc: 'easeIn'
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        let _this = this;
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'queryMyActivityList',
            },
            success(res){
                switch (res.result.status) {
                    case 200:
                        _this.setData({
                            myActicityList:res.result.data.data
                        })
                        break;
                    case 0:
                        wx.showToast({
                            title: '暂无活动，去创建吧!',
                            icon:'none',
                        })
                        break;
                    default:
                        break;
                }
                console.log(res.result);
            },
        })
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'modifyMyActivity',
                toUpdateActivityInfo:{}
            },
            success(res){
                console.log(res);
            }
        })
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