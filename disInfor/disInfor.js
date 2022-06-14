// pages/disInfor/disInfor.js
const db=wx.cloud.database()
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
    label:[],
    maincontent:[],
    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'帖子详情',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options){ 
      console.log(options.id)
      var that =this
      db.collection("postInformation").where({
        _id:options.id
      }).get({
        success:res=> {
         console.log(res)
         for(var i=0;i<res.data[0].topicList.length;i++){
            that.setData({
              label:that.data.label.concat(res.data[0].topicList[i])
            })
         }
         that.setData({
          maincontent:res.data[0]
         })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
        }
      })
      wx.startPullDownRefresh()     //页面加载的时候，开始页面刷新动画
      that.getList()
    },
     //监听用户下拉动作
     onPullDownRefresh(){
      console.log("下拉刷新的监听");
      //下拉刷新的时候，调用getList获取列表信息
      this.getList()
    },
    getList(){
      wx.stopPullDownRefresh()  
    },
    getimage(){
      wx.previewImage({
        urls:this.data.maincontent.fileList,
      })
    }
  }
})
