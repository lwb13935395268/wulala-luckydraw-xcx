// pages/mine/mineActivity/index.js
Page({

    getDate(date) {
        var time = new Date(date);
        var y = time.getFullYear();
        var m = ((time.getMonth() + 1) < 10 ? '0                                                                                                                                 ' + (time.getMonth() + 1) : time.getMonth() + 1);
        var d = time.getDate();
        var h = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours());
        var mine = (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes());
        return y + '/' + m + '/' + d + ' ' + h + ':' + mine
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.getMineActivitys()
    },
    navgator(e) {
        let path = e.currentTarget.dataset.path;
        let app = getApp();
        app.globalData.callLogin = true;
        wx.navigateTo({
            url: '/pages/mine/' + path,
        })
    },
    loadImg1() {
        this.setData({
            imgNum1: this.data.imgNum1 + 1
        })
        if (this.data.imgMaxLength1 == this.data.imgNum1) {
            this.setData({
                show: false
            })
        }
    },
    loadImg2() {
        this.setData({
            imgNum2: this.data.imgNum2 + 1
        })
        if (this.data.imgMaxLength2 == this.data.imgNum2) {
            this.setData({
                show: false
            })
        }

    },
    async getMineActivitys(e) {
        this.setData({
            show: true,
            imgNum1:0,
            imgMaxLength1:0,
            imgNum2:0,
            imgMaxLength2:0,
            activityList:[],
            overActivityList:[]
        })
        if (e) {
            this.setData({
                tabIndex: e.detail
            })
        }
        let {
            getMineActivity
        } = getApp();
        let res = await getMineActivity();
        if (res.status == 200) {
            this.setData({
                activityList: res.data.filter(e => {
                    return e.activityType != 2
                }).map(item => {
                    return {
                        _id: item._id,
                        activityTitle: item.activityTitle,
                        startDate: this.getDate(item.startDate),
                        endDate: this.getDate(item.endDate),
                        imgFileId: item.imgFileId
                    }
                }),
                imgMaxLength1: res.data.filter(e => {
                    return e.activityType != 2
                }).length,
                overActivityList: res.data.filter(e => {
                    return e.activityType == 2
                }).map(item => {
                    return {
                        _id: item._id,
                        activityTitle: item.activityTitle,
                        startDate: this.getDate(item.startDate),
                        endDate: this.getDate(item.endDate),
                        imgFileId: item.imgFileId
                    }
                }),
                imgMaxLength2: res.data.filter(e => {
                    return e.activityType == 2
                }).length,
            })
        }
        if (this.data.tabIndex == 0&&this.data.imgMaxLength1==0) {
            this.setData({
                show:false
            })
        } else if(this.data.tabIndex==1&&this.data.imgMaxLength2==0) {
            this.setData({
                show:false
            })
        }
        return res
    },
    toCommodityDetails(e) {
        wx.navigateTo({
            url: '/pages/activity/activityDetail/index?id=' + e.target.dataset.id,
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        titleList: ['正在进行', '已结束'],
        show: true,
        show2: false,
        imgMaxLength1: 0,
        imgNum1: 0,
        imgMaxLength2: 0,
        imgNum2: 0,
        tabIndex: 0
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

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },
    onPullDownRefresh() {
        this.onRefresh();
    },

    async onRefresh() {
        try {
            let res = await this.getMineActivitys();
        } catch {
            this.setData({
                show: false
            })
            wx.showToast({
                icon: 'error',
                title: '刷新失败',
            })
        }
    }
})