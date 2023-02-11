// components/tab/tab.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        titleList:{
            type:[],
        },
        fixedHead:{
            type:Boolean,
            value:true
        },
        scroll:{
            type:Boolean,
            value:true
        },
        tabFun:{
            type:Function
        }
    },
    lifetimes: {
        attached(){
            // console.log(e);
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        currentIndex: 0, //默认是活动项
    },
    options:{
        multipleSlots: true 
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 切换swiper-item触发bindchange事件
        pagechange: function (e) {
            // 通过touch判断，改变tab的下标值
            // console.log(e);
            // if ("touch" === e.detail.source) {
            // let currentPageIndex = this.data.currentIndex;
            // currentPageIndex = (currentPageIndex + 1) % 2;
            // 拿到当前索引并动态改变
            
            var myEventDetail = e.detail.current // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('myevent', myEventDetail, myEventOption);
            this.setData({
                currentIndex: e.detail.current,
            })
            // }
        },

        //点击tab时触发
        titleClick: function (e) {
            if(e.currentTarget.dataset.idx!=this.data.currentIndex){

            this.setData({
                currentIndex: e.currentTarget.dataset.idx
            })
            return
            }
        },
    }
})