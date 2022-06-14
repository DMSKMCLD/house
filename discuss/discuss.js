// pages/discuss/discus.js
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
        name:"帖子审核",
        img:"icon-xmioon_shenhexiaoxi"
      },{
       name:"帖子列表",
       img:'icon-liebiao'
      }
    ],
    isShow:false,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'论坛管理',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){

    },
    discuss(event){
      console.log(event.currentTarget.id)
      if(event.currentTarget.id=="帖子审核"){
          wx.navigateTo({
            url: '/pages/disAudit/disAudit',
          })
      }else if(event.currentTarget.id=="帖子列表"){
        wx.navigateTo({
          url: '/pages/disList/disList',
        })
      }
    }
  }
})
