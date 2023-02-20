// pages/mine/mineActivity/index.js
Page({
    
    getDate(date){
		var time = new Date(date);
        var y = time.getFullYear();
        console.log(time.getMonth());
        console.log(time.getMonth()+1);
		var m = ((time.getMonth() + 1)<10?'0'+(time.getMonth() + 1):time.getMonth() + 1);
		var d = time.getDate();
        var h = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours());
        var mine = (time.getMinutes() < 10 ? '0' + time.getMinutes(): time.getMinutes());
        return y+'/'+m+'/'+d+' '+h+':'+mine
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
    async getMineActivitys() {
        this.setData({
            show:true
        })
        let {
            getMineActivity
        } = getApp();
        let res = await getMineActivity();
        console.log(res);
        if (res.status == 200) {
            this.setData({
                activityList: res.data.filter(e=>{
                    return e.activityType!=2
                 }).map(item=>{
                     return {
                        _id:item._id,
                        activityTitle:item.activityTitle,
                        startDate:this.getDate(item.startDate),
                        endDate:this.getDate(item.endDate),
                        imgFileId:item.imgFileId
                     }
                 }),
                overActivityList: res.data.filter(e=>{
                   return e.activityType==2
                }).map(item=>{
                    return {
                       _id:item._id,
                       activityTitle:item.activityTitle,
                       startDate:this.getDate(item.startDate),
                       endDate:this.getDate(item.endDate),
                       imgFileId:item.imgFileId
                    }
                })
            })
        }
        this.setData({
            show:false
        })
        return res
    },
    toCommodityDetails(e){
        wx.navigateTo({
          url: '/pages/activity/activityDetail/index?id=' + e.target.dataset.id,
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        titleList: ['正在进行', '已结束'],
        show:true,
        show2:false
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
                show:false
            })
            wx.showToast({
                icon: 'error',
                title: '刷新失败',
            })
        }
    }
})