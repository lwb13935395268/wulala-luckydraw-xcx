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
        // console.log(e.target.dataset.id);
        wx.navigateTo({
          url: '/pages/activity/activityDetail/index?id=' + e.target.dataset.id,
        })
    },
    //下标
    onMyEvent:function(e){
        this.setData({
            isShow:'block'
        });
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'listType',
                listType:e.detail,
            },
            success:(res)=>{
                this.setData({
                    activityList:res.result.data.data,
                    isShow:'none'
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
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'listType',
                listType:0,
            },
            success:(res)=>{
                this.setData({
                    activityList:res.result.data.data,
                    isShow:'none'
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
        this.setData({
            isShow:'block'
        });
        this.onLoad();
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