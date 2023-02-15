// pages/mine/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [//选中
            // checked:'true'
            {value: '程序bug反馈', name: '程序bug反馈'},
            {value: '产品优化建议', name: '产品优化建议'},
            {value: '其他建议', name: '其他建议'},
        ],
        content:'<h3>gjhj</h3>',
        feedbackType:[],
        phoneValue:'',//手机号
        feedbackContent:'',//反馈内容
        feedbackImg:'',//反馈图片
    },
    getPhoneNumber (e) {
        this.setData({
            phoneValue:e.detail.value
        })
        // if (/^[1][3,4,5,7,8][0-9]{9}$/.test(e.detail.value) == false) {
        //     wx.showToast({
        //         title: '输入字符不合法!',
        //         icon:'none',
        //     })
        // }
    },
    // 选中
    updataRadio:function(e){
        this.setData({
        index:e.currentTarget.dataset.index
        })
    },
    // 反馈内容
    feedbackContent:function(e){
        this .setData({
            feedbackContent:e.detail.value
        });
    },
      // 上传图片
    doUpload: function () {
        let _this = this;
        // 选择图片
        wx.chooseMedia({
        count: 1,//图片个数
        sizeType: ['compressed'],
        mediaType:['image'],
        sourceType: ['album', 'camera'],
        success: function (res) {
            // console.log(res)
            wx.showLoading({
                title: '上传中',
            })

            const filePath = res.tempFiles[0].tempFilePath;
            // console.log(res.tempFiles[0].tempFilePath);
            var timestamp = (new Date()).valueOf();//新建日期对象并变成时间戳
            wx.cloud.uploadFile({
            cloudPath: "img/"+timestamp+".jpg", // 上传至云端的路径
            filePath: filePath, // 小程序临时文件路径
            success: res => {
                console.log('[上传文件] 成功：', res)
                _this.setData({
                    feedbackImg:res.fileID,
                });
                app.globalData.fileID = res.fileID
                app.globalData.cloudPath = cloudPath
                app.globalData.imagePath = filePath
                
                wx.navigateTo({
                    url: '../storageConsole/storageConsole',
                })
            },
            fail: e => {
                console.error('[上传文件] 失败：', e)
                wx.showToast({
                    icon: 'none',
                    title: '上传失败',
                })
            },
            complete: () => {
                wx.hideLoading()
            }
            })

        },
        fail: e => {
            console.log(e)
            this.setData({
                feedbackImg:'',
            });
        }
        })
    },
    // 删除图片
    close:function(){
        wx.cloud.deleteFile({
            fileList: [this.data.feedbackImg]
        }).then(res => {
            // handle success
            console.log("删除成功")
        }).catch(error => {
            // handle error
        });
        this.setData({
            feedbackImg:''
        })
    },
    //提交按钮
    submit:function(){
        if (this.data.feedbackContent == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入您的反馈意见',
            })
        }else if(this.data.feedbackType == ''){
            wx.showToast({
                icon: 'none',
                title: '请选中你的反馈类型',
            })
        }else{
            wx.cloud.callFunction({
                name:'feedBack',
                data:{
                    type:'submit',
                    feedBackInfo:{
                        feedbackContent:this.data.feedbackContent,//反馈内容
                        feedbackImg:this.data.feedbackImg,//反馈图片
                        feedbackType:this.data.feedbackType,//反馈类型
                    }
                },
                success(res){
                    console.log(res);
                    switch (res.result.status) {
                        case 0:
                            wx.showToast({
                                icon: 'none',
                                title: '反馈失败,请稍后在试',
                            });
                            break;
                        case 200:
                            wx.showToast({
                                icon: 'none',
                                title: '感谢您的反馈,我们会尽快改进',
                            });
                            wx.navigateBack({});
                            break;
                        default:
                            break;
                    }
                }
            })
        }
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
            backgroundColor: '#eb524c',
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