// pages/mine/selectAvatar/index.js
Page({
    select(e) {
        let imgIndex=e.currentTarget.dataset.index
        this.setData({
            selectImgIndex: imgIndex,
            selectImg:this.data.avatarList[imgIndex].avatarUrl
        });
    },
    use(){
        getApp().globalData.selectImg=this.data.selectImg;
        getApp().back()
    },
    /**
     * 页面的初始数据
     */
    data: {
        selectImgIndex: 0,
        avatarList: [],
        num:0,
        // show:true/
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getAvatarList();
        this.setData({
            show:true
        })
    },
    loadImg(){
        this.data.num++;
        console.log(this.data.num);
        if(this.data.avatarList.length==this.data.num){
            this.setData({
                show:false
            })
        }
    },
    async getAvatarList() {
        let {
            getAvatarList
        } = getApp();
        let res = await getAvatarList();
        if (res.status == 200) {
            let seleceIndex = res.data.findIndex(val => {
                return val.avatarUrl === getApp().globalData.userInfo.avatarUrl
            });
            this.setData({
                avatarList: res.data,
                selectImgIndex: seleceIndex
            })
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