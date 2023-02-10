// pages/mine/createActivity/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputStartValue: '',//开始时间 start time 结束时间  end time
        inputEndValue: '',
        startTime: '10:00',//时间选择器
        startDate: '2016-09-01',
        endTime: '10:00',//时间选择器
        endDate: '2016-00-01',
        items: [//选中
            {value: '姓名', name: '姓名',checked:'true'},
            {value: '手机号', name: '手机号', checked: 'true'},
            {value: '性别', name: '性别'},
            {value: '年龄', name: '年龄'},
        ],
        isScroll:false,//解决input
        imgFileId:'',//上传图片的路径
        activityTitle:'',//活动标题
        signUpSet:[],//选中
        datas:{
            prizeName:'',//奖品名称
            prizeNum:0,//奖品数量
            conditionsMet:'',//奖品满足条件
            addText:"",//添加文本
            addImg:'',//添加图片
        },
        prizeNums:[],//上传服务端的奖品数据
        isActivity:false,//判断是否填写完成
        currentTime:'',//当前时间
        afterTime:'',//之后时间
        modifyInfo:[],//修改信息
        activityId:'',//我的活动id
    },
    //活动标题
    bindFormSubmit: function(e) {
        this.setData({
            activityTitle:e.detail.value,
        })
    },
    bindFormSubmitPrize:function(e){
        let i=e.currentTarget.dataset.index;
        let text = 'prizeNums['+i+'].prizeName';
        this.setData({
            [text]:e.detail.value           
        });
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
        switch (/^[0-9]*$/.test(e.detail.value)) {
            case true:
                let i=e.currentTarget.dataset.index;
                let image = "prizeNums["+i+"].prizeNum";
                this.setData({
                    [image]:e.detail.value
                });
                break;
            case false:
                wx.showToast({
                  title: '奖品只能输入数字',
                  icon:'none',
                })
                break;
            default:
                break;
        }
    },
    // 奖品满足条件
    conditionsMet:function(e){
        let i=e.currentTarget.dataset.index;
        let image = "prizeNums["+i+"].conditionsMet";
        this.setData({
            [image]:e.detail.value
        });
    },
    // 删除上传图片
    close:function(){
        wx.cloud.deleteFile({
            fileList: [this.data.imgFileId]
        }).then(res => {
            // handle success
            console.log("删除成功")
        }).catch(error => {
            // handle error
        })
        this.setData({
            imgFileId:'',
        })
    },
    // 文本btn
    addText:function(e){
        let _this = this;
        wx.showModal({
          cancelColor: '#000000',
          cancelText: '取消',
          confirmColor: '#756B95',
          confirmText: '确定',
          editable: true,
          placeholderText: '奖品介绍',
          showCancel: true,
          title: '添加奖品介绍',
          success: (res) => {
              if(res.confirm){
                    console.log(this.data);
                    let i=e.currentTarget.dataset.index;
                    let text = 'prizeNums['+i+'].addText';
                    _this.setData({
                        [text]:res.content           
                    });
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
        this.setData({
            signUpSet:e.detail.value
        })
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
    // 获取焦点事件
    bindfocus(e){
        this.setData({  
            isScroll:false
        })     
    },
    // 失去焦点事件
    closeblur(e) {
        this.setData({
        isScroll:true
        })
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
                    imgFileId:res.fileID,
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
                imgFileId:'',
            });
        }
        })
    },
    // 添加图片
    addImgs:function(e){
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
            var timestamp = (new Date()).valueOf();//新建日期对象并变成时间戳
            wx.cloud.uploadFile({
            cloudPath: "img/"+timestamp+".jpg", // 上传至云端的路径
            filePath: filePath, // 小程序临时文件路径
            success: res => {
                console.log('[上传文件] 成功：', res);
                let i=e.currentTarget.dataset.index;
                let image = "prizeNums["+i+"].addImg";
                _this.setData({
                    [image]:res.fileID
                });
                console.log(_this.data.datas);
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
        }
        })
    },
    //删除添加图片
    closeImg:function(e){
        wx.cloud.deleteFile({
            fileList: [this.data.addImg]
        }).then(res => {
            // handle success
            console.log("删除成功")
        }).catch(error => {
            // handle error
        })
        let i=e.currentTarget.dataset.index;
        let image = "prizeNums["+i+"].addImg";
        this.setData({
            [image]:'',
        });
    },
    // 删除奖项
    deletePrize:function(e){
        let i = e.currentTarget.dataset.index;
        this.data.prizeNums.splice(i,1);
        this.setData({
            prizeNums:this.data.prizeNums
        })
    },
    // 取消发布
    cancelRelease:function(){
        wx.navigateBack({});//跳转到前一个页面
    },
    // 立即发布
    immediatelyRelease:function(){
        this.data.prizeNums.forEach((item,index) => {
            if (this.data.imgFileId == '') {
                wx.showToast({
                    title: '请上传活动主图',
                    icon:'none',
                })
            }else if (this.data.activityTitle == '') {
                wx.showToast({
                    title: '请输入活动标题',
                    icon:'none',
                })
            }else if (this.data.startDate == '2016-09-01'){
                wx.showToast({
                    title: '请选择开始日期',
                    icon:'none',
                })
            }else if (this.data.endDate == '2016-00-01') {
                wx.showToast({
                    title: '请选择结束日期',
                    icon:'none',
                })
            }else if (item.prizeName == '') {
                wx.showToast({
                    title: '请输入奖品名称',
                    icon:'none',
                })
            }else if (item.prizeNum == '') {
                wx.showToast({
                    title: '请输入奖品数量',
                    icon:'none',
                })
            }else if (item.addText == '') {
                wx.showToast({
                    title: '请添加奖品介绍',
                    icon:'none',
                })
            }else if (item.addImg == '') {
                wx.showToast({
                    title: '请添加奖品介绍图片',
                    icon:'none',
                })
            }else {
                this.setData({
                    isActivity:true,
                })
            }
        })
        console.log(this.data.isActivity);
        switch (this.data.isActivity) {
            case false:
                break;
            case true:
                wx.cloud.callFunction({
                    name:'activity',
                    data:{
                        type:'create',
                        activityInfo:{
                            imgFileId:this.data.imgFileId,//banner
                            activityTitle:this.data.activityTitle,//活动标题
                            startDate:this.data.startDate +' '+ this.data.startTime,//开始时间
                            endDate:this.data.endDate +' '+ this.data.endTime,//结束时间
                            signUpSet:this.data.signUpSet,//选中
                            prizeNums:this.data.prizeNums,//奖品信息
                        }
                    },
                    success(res){
                        switch (res.result.status) {
                            case 200:
                                wx.showToast({
                                    title: '发布成功',
                                });
                                wx.navigateTo({
                                  url: '/pages/mine/mineCreatedActivity/index',
                                })
                                break;
                            case 500:
                                wx.showToast({
                                    title: '创建失败',
                                    icon:'none',
                                })
                                break
                            default:
                                break;
                        }
                    },
                })
                break;
            default:
                break;
        }
    },
    // 新建奖项
    newBuilt:function(){
        let prizeNum = this.data.prizeNums;
        prizeNum.push(this.data.datas);
        this.setData({
            prizeNums:prizeNum,
        })
    },
    // 立即修改
    immediatelyModify:function(){
        let _this = this;
        wx.showModal({
            title: '提示',
            content: '确定要修改此活动吗?',
            success (res) {
              if (res.confirm) {
                // 修改我的活动
                wx.cloud.callFunction({
                    name:'activity',
                    data:{
                        type:'modifyMyActivity',
                        toUpdateActivityInfo:{  
                            imgFileId:_this.data.imgFileId,//banner
                            activityTitle:_this.data.activityTitle,//活动标题
                            startDate:_this.data.startDate +' '+ _this.data.startTime,//开始时间
                            endDate:_this.data.endDate +' '+ _this.data.endTime,//结束时间
                            signUpSet:_this.data.signUpSet,//选中
                            prizeNums:_this.data.prizeNums,//奖品信息
                        },
                        activityId:_this.data.activityId,
                    },
                    success(res){
                        console.log(res.result);
                        switch (res.result.status) {
                            case 200:
                                wx.showToast({
                                    title: '修改成功',
                                    icon:'none',
                                });
                                wx.navigateBack({});
                                break;
                            case 0:
                                wx.showToast({
                                    title: '修改失败,请稍后在试',
                                    icon:'none',
                                })
                                break;
                            default:
                                break;
                        }
                    }
                });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let _this = this;
        let datas=JSON.parse(JSON.stringify(this.data.datas));
        this.setData({
            prizeNums:[datas]
        });
        wx.setNavigationBarTitle({
            title: '创建活动'
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#eb524c',
            animation: {
              duration: 400,
              timingFunc: 'easeIn'
            }
        })
        
        let timestamp = Date.parse(new Date());
        let date = new Date(timestamp);
        //获取年份  
        let Y =date.getFullYear();
        //获取月份  
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //获取当日日期 
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let time = Y+'-'+M+'-'+D;
        let afterTime = (Y+30) +'-'+M+'-'+D
        this.setData({
            currentTime:time,
            startDate:time,
        })
        this.setData({
            afterTime:afterTime,
            endDate:time,
        })
       
        switch (options.id) { 
            case undefined:
                break;
            default:
                _this.setData({
                    activityId:options.id,
                })
                wx.cloud.callFunction({
                    name:'activity',
                    data:{
                        type:'queryMyActivityList',
                    },
                    success(res){
                        switch (res.result.status) {
                            case 200:
                                res.result.data.data.forEach(item => {
                                    if (item._id == options.id) {
                                        _this.setData({
                                            modifyInfo:item
                                        });
                                    }else{
                                        return
                                    }
                                })
                                console.log(_this.data.modifyInfo);
                                _this.setData({
                                    imgFileId:_this.data.modifyInfo.imgFileId,
                                    activityTitle:_this.data.modifyInfo.activityTitle,
                                    startDate:_this.data.modifyInfo.startDate.substring(0,10),
                                    endDate:_this.data.modifyInfo.endDate.substring(0,10),
                                    prizeNums:_this.data.modifyInfo.prizeNums,
                                })
                                break;
                            case 0:
                                wx.showToast({
                                    title: '暂无活动，去创建吧!',
                                    icon:'none',
                                })
                                break;
                            default:
                                break;
                        }
                    },
                })
                break;
        }
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