// pages/mine/mineInfo/index.js
Page({
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            show: true
        })
        this.getUserInfo();
        this.getTodayTime();
    },
    getTodayTime() {
        let date = new Date();
        var Y = date.getFullYear() + '/';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        this.setData({
            today: Y + M + D
        })
    },
    sexChange(e) {
        this.setData({
            ['userInfo.sex']: Number(e.detail.value)
        })
    },
    dateChange(e) {
        this.setData({
            ['userInfo.birthdayDate']: e.detail.value
        })
    },
    regionChange: function (e) {
        this.setData({
            ['userInfo.area']: e.detail.value[0] == "全部" ? [] : e.detail.value
        })
    },
    doUpload: function () {
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
                        this.setData({
                            ['userInfo.avatarUrl']: res.fileID
                        })
                        wx.hideLoading()
                    },
                    fail: e => {
                        wx.hideLoading()
                        wx.showToast({
                            icon: 'none',
                            title: '网络错误，请稍后再试',
                        })
                    },
                    complete: () => {
                        wx.hideLoading()
                    }
                })

            },
            fail: e => {
            }
        })
    },
    //加载图片
    loadImg() {
        this.setData({
            show: false
        })
    },
    showNameInput() {
        wx.showModal({
            cancelColor: '#000000',
            cancelText: '取消',
            confirmColor: '#756B95',
            confirmText: '确定',
            editable: true,
            placeholderText: '输入昵称',
            showCancel: true,
            content: this.data.userInfo.nickName,
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        ['userInfo.nickName']: res.content.trim()
                    })
                } else if (res.cancel) {}
            },
            fail: (res) => {},
            complete: (res) => {},
        })
    },
    saveInfo(){
        this.throttle(this.save)();
    },
    async save() {
        wx.showLoading({
            title: '更新中..',
        })
        let {
            updateUserInfo
        } = getApp();
        let updateInfoRes = await updateUserInfo(this.data.userInfo);
        wx.hideLoading();
        if (updateInfoRes.status == 200) {
            getApp().globalData.getInfoFlag = true;
            getApp().globalData.getMineFlag = true;
            wx.showToast({
                title: '修改成功',
            })
            setTimeout(() => {
                wx.switchTab({
                    url: '../index',
                })
            }, 500)

        } else {
            wx.showToast({
                title: '修改失败',
                icon: 'error'
            })
        }
    },
    //节流
    throttle(fn) {
        let _this = this;
        return function () {
            if (!_this.data.flag) return;
            _this.setData({
                flag: false
            })
            fn();
            let timer = setTimeout(() => {
                _this.setData({
                    flag: true
                })
                clearTimeout(timer)
            }, 1000)
        }
    },
    nav(e) {
        getApp().globalData.selectImg = this.data.userInfo.avatarUrl;
        wx.navigateTo({
            url: '../selectAvatar/index',
        })
    },
    async getUserInfo() {
        let {
            getUserInfo
        } = getApp();
        let userInfoRes = await getUserInfo();
        if (userInfoRes.status == 200) {
            let {
                nickName,
                avatarUrl,
                sex,
                birthdayDate,
                area
            } = userInfoRes.data;
            this.setData({
                userInfo: {
                    nickName,
                    avatarUrl,
                    sex,
                    birthdayDate,
                    area
                }
            })
        } else {
            wx.showToast({
                title: '获取失败',
                icon: 'error'
            })
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        sexList: [{
            sex: 0,
            name: '男'
        }, {
            sex: 1,
            name: '女'
        }],
        num: 1,
        newDate: new Date(),
        date: '',
        region: [],
        customItem: '全部',
        userInfo: {},
        show: false,
        flag:true
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
        if (getApp().globalData.selectImg) {
            this.setData({
                ['userInfo.avatarUrl']: getApp().globalData.selectImg
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        getApp().globalData.selectImg = ''
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
})