// pages/clientele/client.js
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
    name:"客户信息",
    img:"icon-xinxixiantu"
   },
   {
     name:"客户积分",
     img:"icon-wodejifen"
   },
   {
    name:"客户订单",
    img:"icon-order"
   },
   {
     name:"课程评价",
     img:"icon-pingjia"
   }
 ],

 isShow:false,//是否显示左侧按钮
 backgroundColor:'white',//背景颜色
 navTitle:'客户管理',//标题
 isWhite:false,//是否白色胶囊
 titleColor:'#000',//字体颜色
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){

    },
    client(event){
      console.log(event.currentTarget.id)
      if(event.currentTarget.id=="客户积分"){
          wx.navigateTo({
            url: '/pages/cliIntegral/cliIntegral',
          })
      }else if(event.currentTarget.id=="客户信息"){
        wx.navigateTo({
          url: '/pages/cliMessage/cliMessage',
        })
      }else if(event.currentTarget.id=="客户订单"){
        wx.navigateTo({
          url: '/pages/cliOrder/cliOrder',
      })
      }else{
        wx.navigateTo({
          url: '/pages/cliEvaluation/cliEvaluation',
      })
      }
    }
  }
})
