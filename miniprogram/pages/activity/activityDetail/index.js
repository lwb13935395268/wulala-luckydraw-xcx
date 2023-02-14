// pages/activityDetail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        modalName: false,
        scrollbar: false,
        enhanced: true,
        catchtouchmove: true,
        activityDetail:'',
        startDate:'',
        endDate:'',
        lists:'',
        activityId:'',
        headcount:'',
        totals:''
    },
    help(){
        // console.log('11111');
        console.log(this.data._id);
        wx.cloud.callFunction({
            name:'activity',
            data:{      
                type:'participateActivity',
                activityId: this.data._id
            },
            success(res){
                console.log(res);
                if(res.result.status == 0){
                    wx.showToast({
                        title: '已参加过活动',
                        icon: 'error',
                        duration: 1500
                      })
                } else {
                    wx.showToast({
                        title: '已参加',
                        icon: 'success',
                        duration: 1500
                      })
                }
            }
        })
    },
    setModal() {
        this.setData({
            modalName: !this.data.modalName
        })
    },
    switch () {
        this.setData({
            catchtouchmove: !this.data.catchtouchmove
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.setData({
            activityId: options.id
        })
        let _this = this;
        
      let res= await wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'queryMyActivityList',
                wholeActivity : true
            }
        })
        res.result.data.forEach(el => {
            if(_this.data.activityId == el._id){
                let maxObj;
                let arr = [];
                arr.push(el);
                let startDates = el.startDate.slice(5,10);
                let endDates = el.endDate.slice(5,10);
                let str = startDates;
                let strr = endDates;
                let strs = str.replace('-','.');
                let strrs = strr.replace('-','.');
                maxObj = JSON.parse(JSON.stringify(el.prizeNums)).sort((n,m)=>{
                    return m.conditionsMet-n.conditionsMet
                })[0];
                let barNum = maxObj.conditionsMet;
                _this.setData({
                    activityDetail: arr,
                    startDate: strs,
                    endDate: strrs,
                    lists: el.prizeNums,
                    headcount: barNum
                })
            }
        });
        let result=await wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'getActivityCount',
                activityId:_this.data.activityId
            }
        })
        
        let total = result.result.data.total;
        let people = _this.data.headcount;
        let bar = total / people * 100;
        this.setData({
            totals: bar
        })
        wx.showShareMenu({
            withShareTicket: true,
            menus:['shareAppMessage','shareTimeline']
        })

        
    },
    help(){
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'participateActivity',
                activityId: this.data.activityId
            },
            success(res){
                if(res.result.status == 0){
                    wx.showToast({
                        title: '活动已参加',
                        icon: 'error',
                        duration: 1500
                      })
                } else {
                    wx.showToast({
                        title: '参加成功',
                        icon: 'success',
                        duration: 1500
                      })
                }
            }
        })
    },
    setModal() {
        this.setData({
            modalName: !this.data.modalName
        })
    },
    switch () {
        this.setData({
            catchtouchmove: !this.data.catchtouchmove
        })
    },

    nextHome:function () {
        wx.switchTab({
          url: '/pages/home/index',
        })
      },
      skip: function(rows){
          wx.navigateTo({
            url: `/pages/activity/goodsDetail/index`,
            success: function(res) {
              // 通过 eventChannel 向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', { data: rows.currentTarget.dataset.item })
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