// pages/home/index.js
Page({
    async setLoad(){
        let tipLoad = 'tipLoad' + (this.data.currentIndex + 1);
        let loading = 'loading' + (this.data.currentIndex + 1);
        let loaded = 'loaded' + (this.data.currentIndex + 1);
        let pageNum = 'pageNum' + (this.data.currentIndex + 1);
        let pageSize = 'pageSize' + (this.data.currentIndex + 1);
        let prizeType = (this.data.currentIndex == 0) ? "" : this.data.currentIndex;
        let dataList;
        switch (this.data.currentIndex) {
            case 0:
                dataList = 'prizeList';
                break;
            case 1:
                dataList = 'hotPrizeList';
                break;
            case 2:
                dataList = 'disPrizeList';
                break;
            case 3:
                dataList = 'burstPrizeList';
                break;
            default:
                dataList = 'prizeList';
                break;
        };
        if (!this.data[loaded]) {
            this.setData({
                [tipLoad]: false,
                [loading]: true
            })
            let {
                getPrizeList
            } = getApp();
            let res = await getPrizeList(this.data[pageNum], this.data[pageSize], prizeType);
            //获取到数据
            if (res.status == 200) {
                this.setData({
                    [dataList]: this.data[dataList].concat(res.data.resArr),
                    [loading]: false,
                })
                //
                if (res.data.total <= this.data[dataList].length) {
                    this.setData({
                        [loaded]: true
                    })
                } else {
                    this.setData({
                        [tipLoad]: true,
                        [pageNum]: this.data[pageNum] + 1
                    })
                }
            } else {
                wx.showToast({
                    title: '刷新错误',
                    icon: "error"
                })
                this.setData({
                    [tipLoad]: true,
                    [loading]: false
                })
            }
        }
    },
    scroll() {
        wx.showToast({
          title: 'scroll到底',
        })
        this.setData({
            scrollBottom:true
        })
        if(this.data.scrollBottom&&this.data.pageBottomFlag){
            this.setLoad()
        }
        console.log('scroll到底');
    },
    scrollMove(){
        this.setData({
            scrollBottom:false
        })
    },
    listenPageScroll(){
        console.log('页面滚动');
        this.setData({
            pageBottomFlag:false
        })
    },
    listenPageBottom(){
        wx.showToast({
          title: '页面到底',
        })
        this.setData({
            pageBottomFlag:true
        })
        if(this.data.scrollBottom&&this.data.pageBottomFlag){
            this.setLoad()
        }
    },
    async getPrizeList() {
        this.setData({
            prizeLoad: true,
        })
        let {
            getPrizeList
        } = getApp();
        try {
            let res1 = await getPrizeList(this.data.pageNum1, this.data.pageSize1);
            let res2 = await getPrizeList(this.data.pageNum2, this.data.pageSize2, 1);
            let res3 = await getPrizeList(this.data.pageNum3, this.data.pageSize3, 2);
            let res4 = await getPrizeList(this.data.pageNum4, this.data.pageSize4, 3);
            

            if (res1.status == 200) {
                this.setData({
                    prizeList: res1.data.resArr
                })
                if (res1.data.total > this.data.prizeList.length) {
                    this.setData({
                        pageNum1: this.data.pageNum1 + 1
                    })
                } else {
                    this.setData({
                        loaded1: true,
                        tipLoad1: false,

                    })
                }
            }
            if (res2.status == 200) {
                this.setData({
                    hotPrizeList: res2.data.resArr,
                })

                if (res2.data.total > this.data.hotPrizeList.length) {
                    
                    this.setData({
                        pageNum2: this.data.pageNum2 + 1
                    })
                } else {
                    this.setData({
                        loaded2: true,
                        tipLoad2: false,
                    })
                }
            }
            if (res3.status == 200) {
                this.setData({
                    disPrizeList: res3.data.resArr,
                })
                if (res3.data.total > this.data.disPrizeList.length) {
                    this.setData({
                        pageNum3: this.data.pageNum3 + 1
                    })
                } else {
                    this.setData({
                        loaded3: true,
                        tipLoad3: false,
                    })
                }
            }
            if (res4.status == 200) {
                this.setData({
                    burstPrizeList: res4.data.resArr,
                })
                if (res4.data.total > this.data.burstPrizeList.length) {
                    this.setData({
                        pageNum4: this.data.pageNum4 + 1
                    })
                } else {
                    this.setData({
                        loaded4: true,
                        tipLoad4: false,
                    })
                }
            }
            this.setData({
                prizeLoad: false
            })
        } catch {
            wx.showToast({
                icon: 'error',
                title: '获取失败',
            })
            this.setData({
                prizeLoad: false
            })
        }
    },
    setRuleMask() {
        this.setData({
            ruleMask: !this.data.ruleMask
        })
    },
    toLogin() {
        let app = getApp();
        app.globalData.callLogin = true;
        wx.switchTab({
            url: '../mine/index',
        })
    },
    to(path, parmas) {
        wx.navigateTo({
            url: '/pages/home/' + path + parmas,
        })
    },
    navgator(e) {
        let path = e.currentTarget.dataset.path;
        let id = e.currentTarget.dataset.id;
        let powerFlag = e.currentTarget.dataset.power || false;
        let parmas = '';
        if (id) {
            parmas = '?id=' + id
        }
        if (powerFlag && !this.data.loginStatus) {
            this.login()
            return
        } else {
            this.to(path, parmas)
        }
    },
    getPageParams() {
        let app = getApp()
        this.setData({
            userInfo: app.globalData.userInfo,
            userId: app.globalData.userId,
            loginStatus: app.globalData.loginStatus,
        })
    },
    async getUserInfo() {
        this.setData({
            infoLoad: true
        })
        setTimeout(async () => {
            //登录 关闭
            getApp().globalData.loginFlag = false;
            getApp().globalData.getHomeFlag = false;
            let {
                getUserInfo
            } = getApp();
            let userInfoRes = await getUserInfo();
            if (userInfoRes.status == 200 && !Array.isArray(userInfoRes.data)) {
                this.setData({
                    loginStatus: true,
                    userInfo: userInfoRes.data
                })
                getApp().globalData.loginStatus = true;
                getApp().globalData.userInfo = userInfoRes.data;
                getApp().globalData.homeLogin = true;
            } else {
            }
            this.setData({
                infoLoad: false
            })
            return userInfoRes
        })
    },
    async login() {
        let {
            login,
            addUser,
            getUserInfo
        } = getApp();
        await login('登录');

        wx.showLoading({
            title: '登录中..',
            mask: true
        })
        let userInfoRes = await getUserInfo();
        if (userInfoRes.status == 200 && !Array.isArray(userInfoRes.data)) {
            this.setData({
                loginStatus: true,
                userInfo: userInfoRes.data
            })
            getApp().globalData.loginStatus = true;
            getApp().globalData.userInfo = userInfoRes.data;
            getApp().globalData.homeLogin = true;
            wx.hideLoading();
            wx.showToast({
                title: '登录成功',
            })
        } else {
            let addResult = await addUser();
            wx.hideLoading()
            if (addResult.status == 200) {
                wx.showToast({
                    title: '登录成功',
                })
                this.setData({
                    userInfo: addResult.data,
                    loginStatus: true
                })
                getApp().globalData.loginStatus = true;
                getApp().globalData.userInfo = addResult.data;
                getApp().globalData.homeLogin = true;
            } else {
                wx.showToast({
                    icon: 'error',
                    title: '授权失败',
                })
            }
        }
    },
    //图片的加载
    imgLoad() {
    },
    /**
     * 页面的初始数据
     */
    data: {
        scrollBottom:false,
        pageBottomFlag:false,
        pageNum1: 1,
        pageSize1: 6,
        pageNum2: 1,
        pageSize2: 6,
        pageNum3: 1,
        pageSize3: 6,
        pageNum4: 1,
        pageSize4: 6,
        position: 'center',
        ruleMask: false,
        scrollbar: false,
        enhanced: true,
        scroll: true,
        loginStatus: false,
        prizeList: [],
        isShowList: false,
        isShowLogin: false,
        prizeLoad: true,
        infoLoad: true,
        loading1: false, //是否展示 “正在加载” 字样
        loaded1: false, //是否展示 “已加载全部” 字样
        tipLoad1: true,
        loading2: false, //是否展示 “正在加载” 字样
        loaded2: false, //是否展示 “已加载全部” 字样
        tipLoad2: true,
        loading3: false, //是否展示 “正在加载” 字样
        loaded3: false, //是否展示 “已加载全部” 字样
        tipLoad3: true,
        loading4: false, //是否展示 “正在加载” 字样
        loaded4: false, //是否展示 “已加载全部” 字样
        tipLoad4: true,
        currentIndex: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        this.getUserInfo();
        await this.getPrizeList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        let {
            userInfo,
            getHomeFlag,
            loginStatus,
            homeLogin,
            mineLogin
        } = getApp().globalData;
        this.setData({
            loginStatus: loginStatus,
            userInfo: userInfo
        })
        if (!homeLogin && mineLogin) {
            await this.getUserInfo()
        } else if (getHomeFlag) {
            await this.getUserInfo()
        }
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
        this.onRefresh();
    },
    async onRefresh() {
        //导航条加载动画
        wx.showNavigationBarLoading();
        this.setData({
            pageNum1: 1,
            pageNum2: 1,
            pageNum3: 1,
            pageNum4: 1,
            pageSize1: 6,
            pageSize2: 6,
            pageSize3: 6,
            pageSize4: 6,
            prizeList: [],
            burstPrizeList: [],
            disPrizeList: [],
            hotPrizeList: [],
            loading1: false, //是否展示 “正在加载” 字样
            loaded1: false, //是否展示 “已加载全部” 字样
            tipLoad1: true,
            loading2: false, //是否展示 “正在加载” 字样
            loaded2: false, //是否展示 “已加载全部” 字样
            tipLoad2: true,
            loading3: false, //是否展示 “正在加载” 字样
            loaded3: false, //是否展示 “已加载全部” 字样
            tipLoad3: true,
            loading4: false, //是否展示 “正在加载” 字样
            loaded4: false, //是否展示 “已加载全部” 字样
            tipLoad4: true,
        })
        await this.getUserInfo();
        await this.getPrizeList();
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
    },
    tabChange(e) {
        this.setData({
            currentIndex: e.detail
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    async onReachBottom() {
    },
    touchStart(e){
        // this.setData({
        //   scrollStop: false
        // })
      },
      touchEnd(e){
        // this.setData({
        //   scrollStop: true
        // })
      },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})