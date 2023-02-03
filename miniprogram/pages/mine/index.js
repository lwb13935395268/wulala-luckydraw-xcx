// pages/mine/index.js
Page({
    navgator(e) {
        let path = e.currentTarget.dataset.path;
        wx.navigateTo({
            url: '/pages/mine/' + path,
        })
    },
    async getUserInfo() {
        let wxspAppid = 'wx525528379d006020';
        let wxspSecret = '';
        // wx.login({
        //     success(res) {
        //         if (res.code) {
        //             //发起网络请求
        //             wx.request({
        //                 url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + wxspAppid + "&secret=" + wxspSecret + "&js_code=" + res.code + "&grant_type=authorization_code",
        //                 method: "POST",
        //                 success: (res) => {
        //                     console.log(res);
        //                 }
        //             })
        //         } else {
        //             console.log('登录失败！' + res.errMsg)
        //         }
        //     }
        // })
        let {
            getUserInfo,
        } = getApp();
        let {
            userInfo
        } = await getUserInfo('我的页面登录');
        if (userInfo) {
            this.setData({
                userInfo
            });
            console.log(userInfo);
        }
    },
    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '我的'
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