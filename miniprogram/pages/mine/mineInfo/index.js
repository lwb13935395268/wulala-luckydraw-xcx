// pages/mine/mineInfo/index.js
Page({
    setTitle() {
        wx.setNavigationBarTitle({
            title: '个人信息'
        });
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#ed573c',
            animation: {
                duration: 400,
                timingFunc: 'easeIn'
            }
        })
    },
    sexChange(e) {
        console.log(e);
        let name = 'userInfo.sex';
        this.setData({
            [name]: Number(e.detail.value) + 1
        })
    },
    bindDateChange(e) {
        let name = 'userInfo.birthdayDate';
        this.setData({
            [name]: e.detail.value
        })
    },
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        let name = 'userInfo.area'
        this.setData({
            [name]: e.detail.value
        })
    },

    doUpload: function () {
        let _this = this;
        // 选择图片
        wx.chooseMedia({
            count: 1, //图片个数
            sizeType: ['compressed'],
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                wx.showLoading({
                    title: '上传中',
                })
                const filePath = res.tempFiles[0].tempFilePath;
                var timestamp = (new Date()).valueOf(); //新建日期对象并变成时间戳
                wx.cloud.uploadFile({
                    cloudPath: "img/" + timestamp + ".jpg", // 上传至云端的路径
                    filePath: filePath, // 小程序临时文件路径
                    success: res => {
                        console.log('[上传文件] 成功：', res)
                        // _this.setData({
                        //     imgFileId:res.fileID,
                        // });
                        let name = 'userInfo.avatarUrl'
                        this.setData({
                            [name]: res.fileID
                        })
                        wx.hideLoading()
                    },
                    fail: e => {
                        console.error('[上传文件] 失败：', e)
                        wx.hideLoading()
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
            }
        })
    },
    showInput() {
        wx.showModal({
            cancelColor: '#000000',
            cancelText: '取消',
            confirmColor: '#756B95',
            confirmText: '确定',
            editable: true,
            placeholderText: '输入昵称',
            showCancel: true,
            // title: '输入昵称',
            success: (res) => {
                if (res.confirm) {
                    let name = 'userInfo.nickName'
                    this.setData({
                        [name]: res.content.trim()
                    })
                } else if (res.cancel) {}
            },
            fail: (res) => {},
            complete: (res) => {},
        })
    },
    async save() {
        wx.showLoading({
            title: '更新中..',
        })
        let {
            updateUserInfo
        } = getApp();
        let res = await updateUserInfo(this.data.userInfo);
        wx.hideLoading();
        console.log(res);
        if (res.status == 200) {
            wx.showToast({
                title: '修改成功',
            })
        } else {
            wx.showToast({
                title: '修改失败',
                icon: 'error'
            })
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        sexList: [{
            sex: 1,
            name: '男'
        }, {
            sex: 2,
            name: '女'
        }],
        num: 1,
        newDate: new Date(),
        date: '',
        region: [],
        customItem: '全部',
        userInfo: {}
    },
    async getUserInfo() {
        wx.showLoading({
            title: '获取中..',
        })
        let {
            getUserInfo
        } = getApp();
        let res = await getUserInfo();
        console.log(res);

        if (res.status == 200) {
            delete res.data._id;
            delete res.data.openId
            wx.hideLoading()
            this.setData({
                userInfo: res.data
            })
        } else {
            wx.hideLoading()
            wx.showToast({
                title: '获取失败',
                icon: 'error'
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let app = getApp();
        this.setTitle();
        this.getUserInfo()
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