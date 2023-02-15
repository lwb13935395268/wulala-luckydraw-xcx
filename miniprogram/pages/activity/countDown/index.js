// pages/activity/countDown/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activityDetail: '',
        // id:'',
        date: '',
        countDown: ''
    },
    //时间显示小于10的格式化函数
    timeFormat(param) {
        return param < 10 ? '0' + param : param;
    },
    //倒计时
    singleCountDown: function () {
        var that = this;
        var time = 0;
        var obj = {};
        console.log(that.data.countDown);
        let timera = that.data.countDown
        console.log(timera)
        var currentTime = new Date().getTime();//当前时间时间戳
        // console.log(currentTime);
        time = parseInt(timera - currentTime) / 1000;
        // console.log(time);
        // 如果活动未结束
        if (time > 0) {
            var day = parseInt(time / (3600 * 24));
            // console.log(day);
            var hou = parseInt(time/60 /60%24);
            var min = parseInt(time/60%60);
            var sec = parseInt(time % 60);
            obj = {
                day: that.timeFormat(day),
                hou: that.timeFormat(hou),
                min: that.timeFormat(min),
                sec: that.timeFormat(sec)
            }
            console.log(obj);
        } else { //活动已结束
            obj = {
                day: "00",
                hou: "00",
                min: "00",
                sec: "00"
            }
            clearTimeout(that.data.timeIntervalSingle); //清除定时器
        }
        var timeIntervalSingle = setTimeout(this.singleCountDown, 1000);
        that.setData({
            timeIntervalSingle,
            txtTime: obj,
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let _this = this;
        console.log(options);
        this.setData({
            id: options.id
        })
      let res= await wx.cloud.callFunction({
            name: 'activity',
            data: {
                type: 'queryMyActivityList',
                wholeActivity: true
            },
        })
        
        console.log(res.result);
        console.log(this);
        res.result.data.forEach(el => {
            this.setData({
                countDown: el.endDate
            })
        });
        console.log('------');
        console.log(this.data.countDown);
        this.singleCountDown(); //页面加载时就启动定时器

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