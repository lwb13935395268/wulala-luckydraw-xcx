// pages/activity/index.js
Page({

    /**
     * 页面的初始数据         
     */
    data: {
        currentIndex: 0, //tab下标
        activityList:[],//活动列表0
        recommend:[],//推荐1
        conduct:[],//进行中2
        end:[],//结束3
        isShow:'',//loading
        navList:[
            {
                index:0,
                title:'全部'
            },
            {
                index:1,
                title:'推荐'
            },
            {
                index:2,
                title:'进行中'
            },
            {
                index:3,
                title:'已结束'
            }
        ]
    },
    toCommodityDetails:function(e){
        wx.navigateTo({
          url: '/pages/activity/activityDetail/index?id=' + e.target.dataset.id,
        })
    },
    //下标
    onMyEvent:function(e){
        let index = e.detail == undefined ? e : e.detail
        this.setData({
            isShow:true
        });
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'listType',
                listType:index,
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
    onShareAppMessage() {

    }
})