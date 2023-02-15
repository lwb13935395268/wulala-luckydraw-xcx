// pages/mine/index.js
Page({
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getUserInfo()
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if(getApp().globalData.getInfoFlag){
            this.getUserInfo();
        }
    },
    async showLoad(fun) {
        wx.showLoading({
            title: '加载中',
        });
        let res = await fun();
        wx.hideLoading();
        wx.showToast({
            title: '加载成功',
        })
        return res
    },
    async getUserInfo() {
        getApp().globalData.getInfoFlag=false;
        let {
            getUserInfo
        } = getApp();
        let userInfoRes = await this.showLoad(getUserInfo);
        console.log(userInfoRes);
        if(!Array.isArray(userInfoRes.data)){
            this.setData({
                userInfo:userInfoRes.data
            })
            this.getMineActivitys();
            this.getMineCreatedActivity();
            getApp().globalData.loginStatus=true;
            getApp().globalData.userInfo=userInfoRes.data;
        }
    },
    navgatorTabBar(e) {
        let path = e.currentTarget.dataset.path;
        wx.switchTab({
            url: '/pages/' + path,
        })
    },
    navgator(e) {
        if (getApp().globalData.loginStatus) {
            let path = e.currentTarget.dataset.path;
            wx.navigateTo({
                url: '/pages/' + path,
            })
        } else {

            this.login()
        }
    },
    async login() {
        let {
            login,
            addUser
        } = getApp();
        await login('登录');
        console.log('同意了');
        wx.showLoading({
            title: '正在授权..',
        })
        let addResult = await addUser();
        console.log(addResult);
        wx.hideLoading()
        if (addResult.status == 200) {
            wx.showToast({
                title: '授权登录',
            })
            this.setData({
                userInfo:addResult.data
            })
            getApp().globalData.loginStatus=true;
        } else {
            wx.showToast({
                icon: 'error',
                title: '授权失败',
            })
        }
        // wx.showLoading({
        //     title: '登录中',
        // })
        // let app = getApp();
        // app.globalData.callLogin = false;
        // let {
        //     getUserInfo,
        // } = getApp();
        // let res = await getUserInfo();
        // if (res.status == 200) {
        //     this.setData({
        //         loginStatus: true,
        //         userInfo: res.data
        //     })
        //     app.globalData.loginStatus = true;
        //     app.globalData.userInfo = res.data;
        //     this.getMineActivitys();
        //     this.getMineCreatedActivity();
        //     wx.hideLoading();
        //     wx.showToast({
        //         title: '登录成功',
        //     })
        // } else {
        //     wx.showToast({
        //         title: '登录失败',
        //         icon: 'error'
        //     })
        // }
    },
    async getMineActivitys() {
        let {
            getMineActivity
        } = getApp();
        let res = await getMineActivity();
        if (res.status == 200) {
            this.setData({
                mineActivityNum: res.data.length
            })
        }
    },
    async getMineCreatedActivity() {
        let {
            getMineCreatedActivity
        } = getApp();
        let res = await getMineCreatedActivity();
        if (res.status == 200) {
            this.setData({
                mineCreatedActivityNum: res.data.length
            })
        }
    },
    getPageParams() {
        let app = getApp()
        this.setData({
            userInfo: app.globalData.userInfo,
            loginStatus: app.globalData.loginStatus
        })
    },
    getUserParams() {
        let app = getApp();
        if (app.globalData.loginStatus) {
            this.getPageParams()
        }
        if (app.globalData.callLogin) {
            this.login()
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        mineCreatedActivityNum: 0,
        mineActivityNum: 0
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

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
})