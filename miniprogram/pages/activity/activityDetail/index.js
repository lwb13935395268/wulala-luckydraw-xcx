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
        _id:'',
        total:''
    },
    help(){
        // console.log('11111');
        console.log(this._id);
        // wx.cloud.callFunction({
        //     name:'activity',
        //     data:{
        //         type:'participateActivity',
        //         activityId: this._id
        //     }
        // })
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
    // onShareAppMessage: function (res){
    //     console.log(res);
    //     console.log('转发页面');
    //     console.log(res.webViewUrl);
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.id);
        this.setData({
            _id: options.id
        })
        this._id = options.id;
        let _this = this;
        
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'queryMyActivityList',
                wholeActivity : true
            },
            success(res){
                console.log(res.result.data.data);
                let list = res.result.data.data;
                list.forEach(el => {
                    let startDates = el.startDate.slice(5,10);
                    let endDates = el.endDate.slice(5,10);
                    let str = startDates;
                    let strr = endDates;
                    let strs = str.replace('-','.');
                    let strrs = strr.replace('-','.');
                    console.log(el.prizeNums);
                    _this.setData({
                        startDate: strs,
                        endDate: strrs,
                        lists: el.prizeNums
                    })
                });
                _this.setData({
                    activityDetail: res.result.data.data
                })

            }
        })
        wx.showShareMenu({
            withShareTicket: true,
            menus:['shareAppMessage','shareTimeline']
        })

        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'getActivityCount',
                activityId:_this.data._id
            },
            success(res){
                console.log(res.result.data.total);
                _this.setData({
                    total: res.result.data.total
                })
                console.log(this.total);
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