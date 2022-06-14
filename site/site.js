// pages/site/sit.js
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
    latitude: '',
    longitude: '',
    markers: [
      {
        id: 1,
        title:'虎山健身馆',
        latitude: 29.599994,
        longitude:106.541858,
        iconPath: '../../icon/biaoji.png',
        width:25,
        height:25
      }
    ],

    address:'',
    name:'',
    isShow:false,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'健身场地',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色 
  },

  /**
   * 组件的方法列表
   */
  methods: {
   onLoad(){ 
     var that=this
     wx.getLocation({
      type: 'gcj02', //返回可以用于 wx.openLocation 的经纬度
      success (res) {
        console.log(res)
        that.setData({
         latitude:res.latitude,
         longitude:res.longitude
        })
      wx.openLocation({
          latitude:that.data.latitude,
          longitude:that.data.longitude,
          scale: 18
        })
      }
     })
   },
  markertap(e){
    console.log(e)
    wx.openLocation({
      latitude:that.data.latitude,
      longitude:that.data.longitude,
      scale: 18
    })
  }
  }
})
