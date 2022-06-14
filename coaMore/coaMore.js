// pages/coaMore/coaMore.js
const app =getApp()
const db=wx.cloud.database()
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
    number:1,
    course:"",
    list:[],
    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'教练详情',//标题
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
      db.collection('coachInformation').where({
        openId:options.id
      }).get({
        success: res => {
          console.log(res.data)
          console.log(res.data[0].points)
          if(res.data[0].points>=0&res.data[0].points<10000){
            that.setData({
             number:1
            })
          }else if(res.data[0].points>=10000&res.data[0].points<30000){
            that.setData({
              number:2
             })
          }else if(res.data[0].points>=30000&res.data[0].points<60000){
            that.setData({
              number:3
             })
          }else if(res.data[0].points>=60000&res.data[0].points<100000){
            that.setData({
              number:4
             })
          }else if(res.data[0].points>=100000&res.data[0].points<150000){
            that.setData({
              number:5
             })
          }else if(res.data[0].points>=150000&res.data[0].points<210000){
            that.setData({
              number:6
             })
          }else if(res.data[0].points>=210000&res.data[0].points<280000){
            that.setData({
              number:7
             })
          }else if(res.data[0].points>=280000&res.data[0].points<360000){
            that.setData({
              number:8
             })
          }else if(res.data[0].points>=360000&res.data[0].points<450000){
            that.setData({
              number:9
             })
          }else if(res.data[0].points>=450000){
            that.setData({
              number:10
             })
          }
          if(res.data[0].level!=that.data.number){
           db.collection('coachInformation').where({
              openId:options.id
          }).update({
             data:{
               level:that.data.number
             },
             success: res => {
              console.log(res)
            },
            fail: err => {
              icon: 'none',
                console.error('[数据库] [更新记录] 失败：', err)
            }
          })
          }else{

          }
          that.setData({
            list:res.data[0]
          })
          for(var i=0;i<res.data[0].goodCourse.length;i++){
            that.setData({
              course:that.data.course.concat(res.data[0].goodCourse[i]+",")
            }) 
          }
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
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
    idimg(){
      wx.previewImage({
        urls: this.data.list.idcard,
      })
    },
    idimgs(){
      wx.previewImage({
        urls: this.data.list.introduceImg,
      })
    },
    idimges(){
      wx.previewImage({
        urls: this.data.list.realCert,
      })
    }
  }
})
