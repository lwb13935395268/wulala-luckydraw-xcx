// pages/home/goodDetail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0, //默认是活动项
        prizeInfo: {}
    },

    // 切换swiper-item触发bindchange事件
    pagechange: function (e) {
        // 通过touch判断，改变tab的下标值
        // console.log(e);
        // if ("touch" === e.detail.source) {
        // let currentPageIndex = this.data.currentIndex;
        // currentPageIndex = (currentPageIndex + 1) % 2;
        // 拿到当前索引并动态改变
        this.setData({
            currentIndex: e.detail.current,
        })
        // }
    },

    //点击tab时触发
    titleClick: function (e) {
        this.setData({
            //拿到当前索引并动态改变
            currentIndex: e.currentTarget.dataset.idx
        })
    },
    setTitle(){

        wx.setNavigationBarTitle({
            title: '奖品详情'
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#e04540',
            animation: {
                duration: 400,
                timingFunc: 'easeIn'
            }
        })
    },
    async getPrizeDetail(id) {
        wx.showLoading({
            title:'加载中..',
            // mask:true
        })
        let {
            getPrizeDetail
        } = getApp();
        let res = await getPrizeDetail(id);
        console.log(res);
        if (res.status==200) {
            this.setData({
                prizeInfo: res.data
            });
            wx.hideLoading()
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        this.setTitle()
        this.getPrizeDetail(options.id);
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