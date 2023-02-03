// pages/mine/createActivity/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputStartValue: '',//开始时间 start time 结束时间  end time
        inputEndValue: '',
        startTime: '12:01',//时间选择器
        startDate: '2016-09-01',
        endTime: '12:01',//时间选择器
        endDate: '2016-00-01',
        prizeNum:0,//奖品数量
        conditionsMet:'',//奖品满足条件
        items: [//选中
            {value: '姓名', name: '姓名',checked:'true'},
            {value: '手机号', name: '手机号', checked: 'true'},
            {value: '性别', name: '性别'},
            {value: '年龄', name: '年龄'},
          ]
    },
    bindFormSubmit: function(e) {
        console.log(e.detail.value.textarea)
    },
    bindKeyInput: function (e) {
      this.setData({
        inputStartValue: e.detail.value
      })
    },
    // 时间选择
    bindTimeChange: function(e) {//开始
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        startTime: e.detail.value
      })
    },
    endTimeChange:function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            endTime: e.detail.value
        })
    },
    // 日期选择器
    bindDateChange: function(e) {//开始
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        startDate: e.detail.value
      })
    },
    endDateChange:function(e){//结束
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        endDate: e.detail.value
      })
    },
    // 奖品数量
    prizeNum:function(e){
        this.setData({
            prizeNum:e.detail.value
        })
    },
    // 奖品满足条件
    conditionsMet:function(e){
        this.setData({
            conditionsMet:e.detail.value
        })
    },
    // 文本btn
    addText:function(){
        wx.showModal({
          cancelColor: '#000000',
          cancelText: '取消',
          confirmColor: '#756B95',
          confirmText: '确定',
          editable: true,
          placeholderText: '奖品介绍',
          showCancel: true,
          title: '审核',
          success: (res) => {
              if(res.confirm){
                  console.log('确定');
              } else if(res.cancel){
                  console.log('取消');
              }
          },
          fail: (res) => {},
          complete: (res) => {},
        })
    },
    // 选中
    checkboxChange(e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    
        const items = this.data.items
        const values = e.detail.value
        for (let i = 0, lenI = items.length; i < lenI; ++i) {
          items[i].checked = false
    
          for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
            if (items[i].value === values[j]) {
              items[i].checked = true
              break
            }
          }
        }
    
        this.setData({
          items
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '创建活动'
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#ed573c',
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