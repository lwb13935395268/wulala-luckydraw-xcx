// pages/uploading/index.js
let util = require('../../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // imgFileId:'',//上传图片的路径
        imgYyzz:'',//营业执照
        imgSbzs:'',//商标证书
        imgSfz:'',//身份证正
        imgSfzs:'',//身份证反
        name:'',
        phone:'',
        getUser:'',
        time:''
    },
    getName(e){
        // console.log(e.detail.value);
        this.setData({
            name:e.detail.value
        })
    },
    getPhone(e){
        // console.log(e.detail.value);
        this.setData({
            phone:e.detail.value
        })
    },
    getUser(e){
        // console.log(e.detail.value);
        this.setData({
            getUser:e.detail.value
        })
    },
    addmerchantInfo(){
        let TIME = util.formatTime(new Date());
        this.setData({
            time:TIME
        })
        console.log(TIME);
        wx.cloud.callFunction({
            name: 'uploading',
            data:{
                type:'create',
                merchantInfo:{
                    name: this.data.name,
                    phone: this.data.phone,
                    getUser: this.data.getUser,
                    doUploadyyzz: this.data.imgYyzz,
                    doUploadimgSbzs: this.data.imgSbzs,
                    doUploadimgSfz: this.data.imgSfz,
                    doUploadimgSfzs: this.data.imgSfzs,
                    time: this.data.time
                }
            },
            success(res){
                console.log(res.result);
                if(res.result.status == 200){
                    wx.showToast({
                        title: '申请成功',
                        icon: 'success',
                        duration: 1500
                      })
                } else {
                    wx.showToast({
                        title: '申请失败',
                        icon: 'error',
                        duration: 1500
                      })
                }
            }
        })
    },
    //上传营业执照
    doUploadyyzz: function () {
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
                    imgYyzz:res.fileID,
                });
                console.log(_this.data.imgYyzz);
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
                imgYyzz:'',
            });
        }
        })
    },
    //上传商标证书
    doUploadsbzs: function () {
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
                    imgSbzs:res.fileID,
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
                imgSbzs:'',
            });
        }
        })
    },
    //上传身份证正
    doUploadsfz: function () {
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
                    imgSfz:res.fileID,
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
                imgSfz:'',
            });
        }
        })
    },
    //上传身份证反
    doUploadsfzs: function () {
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
                    imgSfzs:res.fileID,
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
                imgSfzs:'',
            });
        }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
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