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
        prizeName:'',//奖品名称
        prizeNum:0,//奖品数量
        conditionsMet:'',//奖品满足条件
        signUpSet:[],//选中
        addText:[],//添加文本
        addImg:'',//添加图片
        datas:{
            prizeName:'',//奖品名称
            prizeNum:0,//奖品数量
            conditionsMet:'',//奖品满足条件
            addText:"",//添加文本
            addImg:'',//添加图片
        },
        prizeNums:[],
    },
    bindFormSubmit: function(e) {
        this.setData({
            activityTitle:e.detail.value,
        })
    },
    bindFormSubmitPrize:function(e){
        // this.setData({
        //     prizeName:e.detail.value,
        //     'datas.prizeName':e.detail.value,
        // });
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
        this.setData({
            conditionsMet:e.detail.value,
            // 'datas.conditionsMet':e.detail.value
        })
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
            // let i=e.currentTarget.dataset.index;
            // let image = "prizeNums["+i+"].addImg";
            // this.setData({
            //     [image]:'',
            // });
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
            console.log(item);
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
                console.log(item.prizeName);
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
                wx.cloud.callFunction({
                    name:'activity',
                    data:{
                        type:'create',
                        activityInfo:{
                            imgFileId:this.data.imgFileId,//banner
                            activityTitle:this.data.activityTitle,//活动标题
                            startDate:this.data.startDate +' '+ this.data.startTime,//开始时间
                            endDate:this.data.endDate +' '+ this.data.endTime,//结束时间
                            // prizeName:this.data.prizeName,//奖品名称
                            // prizeNum:this.data.prizeNum,//奖品数量
                            // conditionsMet:this.data.conditionsMet,//满足条件
                            // addImg:this.data.addImg,//添加图片
                            // addText:this.data.addText,//提加文本
                            signUpSet:this.data.signUpSet,//选中
                            prizeNums:this.data.prizeNums,//奖品信息
                        }
                    },
                    success(res){
                        console.log(res.result);
                        switch (res.result.status) {
                            case 200:
                                wx.showToast({
                                    title: '发布成功',
                                })
                                break;
                            case 500:
                                wx.showToast({
                                    title: '创建失败',
                                    icon:'none',
                                })
                                break
                            default:
                                break;
                        }
                    },
                })
            }
        })
        
    },
    // 新建奖项
    newBuilt:function(){
        let prizeNum = this.data.prizeNums;
        prizeNum.push(this.data.datas);
        this.setData({
            prizeNums:prizeNum,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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
        // wx.cloud.callFunction({
        //     name:'activity',
        //     data:{
        //         type:'create',
        //         activityInfo:{
        //             name:'妇女合适的接口返回看',
        //             endDate:'2022-10-10 12:01'
        //         }
        //     },
        //     success(res){
        //         console.log(res.result);
        //     },
        // })
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