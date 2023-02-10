// pages/mine/index.js
Page({
    navgatorTabBar(e) {
        let path = e.currentTarget.dataset.path;
        wx.switchTab({
            url: '/pages/' + path,
        })
    },
    navgator(e) {
        // if (this.data.loginStatus) {
        let path = e.currentTarget.dataset.path;
        wx.navigateTo({
            url: '/pages/' + path,
        })
        // } else {
        //     this.getUserInfo()
        // }
    },
    async getUserInfo() {
        
        let app=getApp();
        app.globalData.callLogin=false;
        let {
            getUserInfo,
            addUser,
            login
        } = getApp();
        // let {
        //     userInfo
        // } = await login('我的页面登录');
        let res = await getUserInfo();
        // if (userInfo) {
        //     this.setData({
        //         userInfos: userInfo,
        //         loginStatus: true
        //     });
        //     app.globalData.loginStatus = true;
        // };
        // console.log(res);
        if (res.status == 200) {
                app.globalData.loginStatus = true;
            if (!Array.isArray(res.data)) {
                console.log('有这个人');
                app.globalData.userInfo = res.data;
                this.setData({
                    userInfo: res.data
                })
                wx.hideLoading();
                wx.showToast({
                    title: '登录成功',
                })
            } else {
                console.log('添加');
                let res2 = await addUser();
                if (res2) {
                    let res3 = await getUserInfo();
                    app.globalData.userInfo = res3.data;
                    this.setData({
                        userInfo: res3.data
                    })
                }
            }
        } else {
            console.log('登入失败');
        }
    },
    setTitle() {
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
    getPageParams() {
        let app = getApp()
        this.setData({
            userInfo: app.globalData.userInfo,
            loginStatus: app.globalData.loginStatus
        })
    },
    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setTitle();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    getUserParams(){
        let app = getApp();
        console.log(app.globalData);
        if (app.globalData.loginStatus) {
            this.getPageParams()
        }
        if(app.globalData.callLogin){
            console.log(999);
            this.getUserInfo()
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getUserParams()
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