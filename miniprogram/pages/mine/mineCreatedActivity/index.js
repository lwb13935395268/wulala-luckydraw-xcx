// pages/activity/index.js
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
        imgLength:0,
        pageSize:10,//多少条数据
        pageNum:1,//页数
        currentIndex: 0, //tab下标
        activityList:[],//活动列表0
        isShow:'',//loading
        isUpLoadText:0,//是否显示加载中
        upLoadText:'加载中',
        isListLength:'',//数据的长度与
        navList:[
            {
                index:0,
                title:'未开始'
            },{
                index:1,
                title:'正在进行'
            },{
                index:2,
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
        this.setData({
           pageNum : 1,
           activityList : []
        })
        let index = e.detail == undefined ? e : e.detail;
        this.setData({
            isShow:true,
            currentIndex:index
        });
        this.getActivityList(this.data.currentIndex)
    },
    loadImg:function(){
        this.setData({
            imgLength:this.data.imgLength+1
        });
        if (this.data.activityList.length*4 == this.data.imgLength) {
            this.setData({
                isShow:false,
            });
        }else if(this.data.imgLength==''){
            this.setData({
                isShow:false,
            });
        }
    },
    
    //获取活动列表信息
    getActivityList(index){
        console.log(index);
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'myReleaseActivityType',
                activityType:index,
                pageSize:this.data.pageSize,
                pageNum:this.data.pageNum,
            }
        }).then(res => {
            let list = this.data.activityList.concat(res.result.data);
            if (this.data.isListLength == list.length) {
                this.setData({
                    isUpLoadText:1,
                    upLoadText:'加载完成'
                });
            }else if (list.length < 10) {
                this.setData({
                    isUpLoadText:1,
                    upLoadText:'加载完成'
                });
            }else if (list.length > 10) {
                this.setData({
                    upLoadText:'加载中'
                });
            }else{
                this.setData({
                    upLoadText:'加载中'
                });
            }
            list.forEach((item,index)=>{
                if (Number(item.startDate)) {
                    item.startDate = new Date(item.startDate).toLocaleString().replace(/\//g,'-');
                    item.endDate = new Date(item.endDate).toLocaleString().replace(/\//g,'-');
                }
            });
            this.setData({
                activityList:list,
                imgLength:0,
                isListLength:list.length
            });
        })
    },
    // 滚动到底部触发的事件
    scroll:function(){
        let pageNum = this.data.pageNum+1;
        this.setData({
            pageNum:pageNum,
            isUpLoadText:1,
        })
        this.getActivityList(this.data.currentIndex)
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
        this.onMyEvent(this.data.currentIndex);
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