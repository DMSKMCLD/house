// pages/mall/malls.js
const app =getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[
      {
        name:"商城订单",
        img:"icon-order"
      },{
       name:"商品调整",
       img:'icon-tiaozheng'
      }],
      isShow:false,//是否显示左侧按钮
      backgroundColor:'white',//背景颜色
      navTitle:'商城管理',//标题
      isWhite:false,//是否白色胶囊
      titleColor:'#000',//字体颜色
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){

    },
    mall(event){
      console.log(event.currentTarget.id)
      if(event.currentTarget.id=="商城订单"){
         wx.navigateTo({
           url: '/pages/mallOrder/mallOrder',
         })
      }else{
        wx.navigateTo({
          url: '/pages/mallAdjust/mallAdjust',
        })
      }
    }
  }
})
