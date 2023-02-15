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
        activityId:'',
        headcount:'',
        totals:'',
        rule:'',
        str:'',
    },
    help(){
        wx.cloud.callFunction({
            name:'activity',
            data:{      
                type:'participateActivity',
                activityId: this.data._id
            },
            success(res){
                if(res.result.status == 0){
                    wx.showToast({
                        title: '已参加过活动',
                        icon: 'error',
                        duration: 1500
                      })
                } else {
                    wx.showToast({
                        title: '已参加',
                        icon: 'success',
                        duration: 1500
                      })
                }
            }
        })
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


    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.setData({
            activityId: options.id
        })
        let _this = this;
        
      let res= await wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'queryMyActivityList',
                wholeActivity : true
            }
        })
        console.log(res.result.data);
        res.result.data.forEach(el => {
            
            if(_this.data.activityId == el._id){
                let maxObj;
                let arr = [];
                arr.push(el);
                console.log(el.startDate);
                console.log(el.rule);
                let strRule = el.rule.replace(/(\d+\D)/g,"###");
                _this.setData({
                    str:strRule,
                })
                console.log(strRule);
                let startDateAll = this.timestampToTime(el.startDate);
                let endDateAll = this.timestampToTime(el.endDate);
                let startDates = this.timestampToTime(el.startDate).slice(5,10);
                let endDates = this.timestampToTime(el.endDate).slice(5,10);
                let str = startDates;
                let strr = endDates;
                let strs = str.replace('-','.');
                let strrs = strr.replace('-','.');
                maxObj = JSON.parse(JSON.stringify(el.prizeNums)).sort((n,m)=>{
                    return m.conditionsMet-n.conditionsMet
                })[0];
                let barNum = maxObj.conditionsMet;
                _this.setData({
                    activityDetail: arr,
                    startDate: strs,
                    endDate: strrs,
                    lists: el.prizeNums,
                    headcount: barNum,
                    countDown: el.endDate,
                    rule: strRule,
                    startDateAll:startDateAll,
                    endDateAll: endDateAll

                })
                console.log(_this.data.rule);
            }
        });
        let result=await wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'getActivityCount',
                activityId:_this.data.activityId
            }
        })
        
        let total = result.result.data.total;
        let people = _this.data.headcount;
        let bar = total / people * 100;
        this.setData({
            totals: bar
        })
        wx.showShareMenu({
            withShareTicket: true,
            menus:['shareAppMessage','shareTimeline']
        })

        this.singleCountDown(); //页面加载时就启动定时器
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
        let timera = that.data.countDown
        var currentTime = new Date().getTime();//当前时间时间戳
        time = (timera - currentTime) / 1000;
        // 如果活动未结束
        if (time > 0) {
            var day = parseInt(time / (3600 * 24));
            var hou = parseInt(time / (60 * 60*60));
            var min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
            var sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
            obj = {
                day: that.timeFormat(day),
                hou: that.timeFormat(hou),
                min: that.timeFormat(min),
                sec: that.timeFormat(sec)
            }
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
    timestampToTime:function(timestamp) {
        let date = new Date(Number(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + "-";
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    help(){
        wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'participateActivity',
                activityId: this.data.activityId
            },
            success(res){
                if(res.result.status == 0){
                    wx.showToast({
                        title: '活动已参加',
                        icon: 'error',
                        duration: 1500
                      })
                } else {
                    wx.showToast({
                        title: '参加成功',
                        icon: 'success',
                        duration: 1500
                      })
                }
            }
        })
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
      skip: function(rows){
          wx.navigateTo({
            url: `/pages/activity/goodsDetail/index`,
            success: function(res) {
              // 通过 eventChannel 向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', { data: rows.currentTarget.dataset.item })
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