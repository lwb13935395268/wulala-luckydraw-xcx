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
        wx.navigateTo({
            url: '/pages/home/' + path,
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
        scroll: false
    },

    onPageScroll(e) {
        setTimeout(()=>{
        const query = wx.createSelectorQuery()
        query.select('#tab').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec( (res)=> {
            // #the-id节点的上边界坐标
            //   console.log(res[0].top);
            //   console.log(res[1].scrollTop);
            // 显示区域的竖直滚动位置
            if (res[0].top <= 0) {
                this.setData({
                    scroll: true
                })
            }else if(res[0].top >=0){
                this.setData({
                    scroll: false
                })
            }
        })
    })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        const query = wx.createSelectorQuery();
        //这段代码的意思是选择Id=the-id的节
        console.log(query.selectViewport());
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