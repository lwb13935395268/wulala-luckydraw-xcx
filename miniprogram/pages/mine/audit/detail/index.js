// pages/mine/audit/detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        auditList:[],
        imgUrl:[],
    },
    clickImg: function(e){
        var imgUrl = this.data.imgUrl;
        wx.previewImage({
          urls: imgUrl,
          success: function(res){},
          fail: function(res){
              console.log(res);
          }
        })
    },
    checkout: function(e){
        wx.showModal({
          cancelColor: '#000000',
          cancelText: '不通过',
          confirmColor: '#756B95',
          confirmText: '通过',
        //   content: '这是一个模态弹窗',
          editable: true,
          placeholderText: '审核结果简介',
          showCancel: true,
          title: '审核',
          success: (res) => {
              if(res.confirm){
                  console.log('通过');
                  wx.cloud.callFunction({
                      name: 'uploading',
                      data:{
                          type:'modify',
                          merchantInfo:{
                            audit: '1'
                          }
                      },
                      success(res){
                        console.log(res);
                      }
                  })
              } else if(res.cancel){
                  console.log('不通过');
                  wx.cloud.callFunction({
                    name: 'uploading',
                    data:{
                        type:'modify',
                        merchantInfo:{
                          audit: '0'
                        }
                    },
                    success(res){
                        console.log(res);
                    }
                })
              }
          },
          fail: (res) => {},
          complete: (res) => {},
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let _this = this;
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptDataFromOpenerPage', function(data) {
          let yyzz = data.data.doUploadyyzz;
          let sbzs = data.data.doUploadimgSbzs;
          let sfz = data.data.doUploadimgSfz;
          let sfzs = data.data.doUploadimgSfzs;
          let urls = [yyzz].concat(sbzs,sfz,sfzs);
          _this.setData({
            auditList: data,
            imgUrl: urls
          })
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