// pages/index/index.js
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
       name:"教练审核",
       img:"icon-xmioon_shenhexiaoxi"
     },{
      name:"教练信息",
      img:'icon-xinxixiantu'
     },{
       name:"接单信息",
       img:"icon-order"
     },{
      name:"教练余额",
      img:"icon-wodejifen"
    }
   ],
   isShow:false,//是否显示左侧按钮
   backgroundColor:'white',//背景颜色
   navTitle:'教练管理',//标题
   isWhite:false,//是否白色胶囊
   titleColor:'#000',//字体颜色
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      console.log(app.globalData.height)
    },
    coach(event){
      console.log(event.currentTarget.id)
      if(event.currentTarget.id=="教练审核"){
         wx.navigateTo({
           url: '/pages/coaAudit/coaAudit',
         })
      }else if(event.currentTarget.id=="教练信息"){
         wx.navigateTo({
           url: '/pages/coaMessage/coaMessage',
         })
      }else if(event.currentTarget.id=="接单信息"){
         wx.navigateTo({
           url: '/pages/coaOrder/coaOrder',
         })
      }else if(event.currentTarget.id=="教练余额"){
        wx.navigateTo({
          url: '/pages/coaBalance/coaBalance',
        })
      }else{

      }
    }
  }
})
