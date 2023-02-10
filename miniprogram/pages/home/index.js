// pages/home/index.js
Page({
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
    //   modal(){
    //     this.setData({
    //       modalName:!this.data.modalName
    //     })
    //   },
    navgator(e) {
        let path = e.currentTarget.dataset.path;
        let id = e.currentTarget.dataset.id;
        let parmas='';
        if (id) {
            parmas = '?id=' + id
        }
        console.log('/pages/home/' + path + parmas);
        wx.navigateTo({
            url: '/pages/home/' + path + parmas,
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        position: 'center',
        catchtouchmove: true,
        modalName: false,
        scrollbar: false,
        enhanced: true,
        scroll: true,
        loginStatus:false,
        prizeList: [],
    },

    onPageScroll(e) {
        // setTimeout(() => {
        //     const query = wx.createSelectorQuery()
        //     query.select('#tab').boundingClientRect()
        //     query.selectViewport().scrollOffset()
        //     query.exec((res) => {
        //         console.log(res);
        //         // #the-id节点的上边界坐标
        //         //   console.log(res[0].top);
        //         // 显示区域的竖直滚动位置
        //         //   console.log(res[1].scrollTop);
        //         let topNum = Math.floor(res[0].top);
        //         if (topNum <= 0) {
        //             this.setData({
        //                 scroll: true
        //             })
        //         } else if (topNum >= 0) {
        //             this.setData({
        //                 scroll: false
        //             })
        //         }
        //     })
        // })
    },
    setTitle(){
        wx.setNavigationBarTitle({
            title: '首页'
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
    getPageParams(){
        let app=getApp()
        this.setData({
            userInfo: app.globalData.userInfo,
            userId:app.globalData.userId,
            loginStatus: app.globalData.loginStatus,
        })
    },
    async getPrizeList(){
        let {
            getPrizeList
        } = getApp();
        let res = await getPrizeList();
        this.setData({
            prizeList: res.data,
            hotPrizeList:res.data.filter(e=>{
                return e.prizeType==1
            }),
            disPrizeList:res.data.filter(e=>{
                return e.prizeType==2
            }),
            burstPrizeList:res.data.filter(e=>{
                return e.prizeType==3
            })
        });
        return res
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.setTitle();
        this.getPrizeList();
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
        let app=getApp();
        if(this.data.loginStatus||app.globalData.loginStatus){
            this.getPageParams();
        }
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
        this.onRefresh();
    },
    async onRefresh(){
        //导航条加载动画
        wx.showNavigationBarLoading()
        //loading 提示框
        wx.showLoading({
          title: '刷新中...',
        })
        // if(res){
        //     //停止下拉刷新
        //     wx.stopPullDownRefresh();
        //     wx.hideLoading();
        //     wx.hideNavigationBarLoading();
        // }else{
        //     console.log('失败');
        //     //停止下拉刷新
        //     wx.stopPullDownRefresh();
        //     wx.hideLoading();
        //     wx.hideNavigationBarLoading();
        // }
        try{
            let res=await this.getPrizeList();
                wx.stopPullDownRefresh();
                wx.hideLoading();
                wx.hideNavigationBarLoading();

        }catch{
            wx.stopPullDownRefresh();
            wx.hideLoading();
            wx.hideNavigationBarLoading();
           
            wx.showToast({
                icon: 'error',
                title: '刷新失败',
            })

        }
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