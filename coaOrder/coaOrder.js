const app =getApp()
const db  =wx.cloud.database()
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
    list:[],
    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'教练列表',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async onLoad(){ 
      var that =this
      let count =await db.collection('coachInformation').count()
      count=count.total
      let all=[]
      for(let i=0;i<count;i+=20){
        let list = await db.collection('coachInformation').skip(i).get()
        all =all.concat(list.data)
      }
      console.log(all)
      that.setData({
        list:all
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
    all(event){
      console.log(event.currentTarget.dataset.openid)
      wx.navigateTo({
        url: '/pages/orderDetail/orderDetail?openid='+event.currentTarget.dataset.openid,
      })
    }
  }
})
