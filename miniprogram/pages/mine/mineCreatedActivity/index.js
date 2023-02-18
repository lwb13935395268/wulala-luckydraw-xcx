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
        isShow:true,
        navList:[
            {
                index:0,
                title:'正在进行'
            },{
                index:1,
                title:'未开始'
            },{
                index:2,
                title:'已结束'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.onMyEvent(0);
    },
    // 图片加载完成
    loadImg:function(){
        this.setData({
            isShow:false
        })
    },
    // tab下标
    onMyEvent:function(e){
        let index = e.detail == undefined ? e : e.detail;
        this.setData({
            isShow:true
        })
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'myReleaseActivityType',
                activityType:index
            },
            success:(res)=>{
                if (res.result.status == 200) {
                    this.setData({
                        myActicityList:res.result.data,
                        isShow:false
                    });
                    this.data.myActicityList.forEach((item,index)=>{
                        let startDate = "myActicityList["+index+"].startDate";
                        let endDate = "myActicityList["+index+"].endDate";
                        this.setData({
                            [startDate]:new Date(item.startDate).toLocaleString().replace(/\//g,'-'),
                            [endDate]:new Date(item.endDate).toLocaleString().replace(/\//g,'-')
                        })
                    })
                }else{
                    wx.showToast({
                        title: '暂无活动，去创建吧!',
                        icon:false,
                    });
                }
                if (res.result.data.length==0) {
                    this.setData({
                        isShow:false
                    })
                }
            },
        })
    },
    toCommodityDetails:function(e){
        wx.navigateTo({
          url: '/pages/activity/activityDetail/index?id=' + e.target.dataset.id,
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
        this.onMyEvent(0);
        getApp().onRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    // onShareAppMessage() {

    // }
})