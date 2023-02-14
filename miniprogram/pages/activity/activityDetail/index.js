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
        _id:'',
        headcount:'',
        // total:''
    },
    help(){
        // console.log('11111');
        console.log(this.data._id);
        wx.cloud.callFunction({
            name:'activity',
            data:{      
                type:'participateActivity',
                activityId: this.data._id
            },
            success(res){
                console.log(res);
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

    nextHome:function () {
        wx.switchTab({
          url: '/pages/home/index',
        })
      },

      Datas:function (){
          console.log('225525');
      },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        // console.log(options.id);
        this.setData({
            _id: options.id
        })
        this._id = options.id;
        let _this = this;
        
      let res= await wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'queryMyActivityList',
                wholeActivity : true
            }
        })
        console.log(res.result);
        res.result.data.forEach(el => {
            // console.log(el.prizeNums);
            // maxObj= el.prizeNums.sort((n,m)=>{
            if(_this.data._id == el._id){
                let maxObj;
                let arrs = [];
                // console.log(el);
                arrs.push(el);
                // console.log(arrs);
                let startDates = el.startDate.slice(5,10);
                let endDates = el.endDate.slice(5,10);
                let str = startDates;
                let strr = endDates;
                let strs = str.replace('-','.');
                let strrs = strr.replace('-','.');
                // console.log(el.prizeNums);
                // maxObj= el.prizeNums.sort((n,m)=>{
                maxObj = JSON.parse(JSON.stringify(el.prizeNums)).sort((n,m)=>{
                    return m.conditionsMet-n.conditionsMet
                })[0];
                let barNum = maxObj.conditionsMet;
                _this.setData({
                    activityDetail: arrs,
                    startDate: strs,
                    endDate: strrs,
                    lists: el.prizeNums,
                    headcount: barNum
                })
                // console.log(_this.data.activityDetail);
            }
        });
        let res2=await wx.cloud.callFunction({
            name:'activity',
            data:{
                type:'getActivityCount',
                activityId:_this.data._id
            }
        })
        
        let total = res2.result.data.total;
        // console.log(total);
        // console.log(_this.data.headcount);
        let people = _this.data.headcount;
        // console.log(people);
        let bar = total / people * 100;
        console.log(bar);
        this.setData({
            total: bar
        })
        wx.showShareMenu({
            withShareTicket: true,
            menus:['shareAppMessage','shareTimeline']
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