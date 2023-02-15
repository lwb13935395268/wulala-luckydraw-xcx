

// components/activity/activity.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        // styleIsolation: 'shared'
    },
    externalClasses: ['mt-50'],
    properties: {
        title: {
            type: String,
            value: '标题'
        },
        startDate: {
            type: String,
            value: '开始日期'
        },
        endDate: {
            type: String,
            value: '结束日期'
        },
        status:{
            type:Number,
            value:0
            //0,正常；1已参与，2结束
        },
        imageUrl:{
            type:String,
            value:'../../images/icon-activity_1.png'
        },
        isSet:{
            type:Boolean,
            value:false
        },
        toSetRouter:{
            type:String,
            value:''
        }
    },
    /**
     * 组件的初始数据
     */
    data: {

    },
    loadImg(){
        this.triggerEvent('loadImg', myEventDetail, myEventOption);
    },
    /**
     * 组件的方法列表
     */
    methods: {
        navgator(){
            wx.navigateTo({
                url: this.properties.toSetRouter,
            })
        }
    }
})