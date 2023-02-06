// pages/mine/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [//选中
            {value: '程序bug反馈', name: '程序bug反馈',checked:'true'},
            {value: '参与活动失败', name: '参与活动失败', checked: 'true'},
            {value: '功能无法理解', name: '功能无法理解'},
            {value: '产品优化建议', name: '产品优化建议'},
            {value: '其他建议', name: '其他建议'},
        ],
        phoneValue:'',
    },
    getPhoneNumber (e) {
        console.log(e.detail.code)
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
            title: '意见反馈'
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#ed573c',
            animation: {
              duration: 400,
              timingFunc: 'easeIn'
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