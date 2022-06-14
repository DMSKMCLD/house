// pages/coaAudit/coaAudit.js
const app =getApp()
const db =wx.cloud.database()
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
    pdimg:true,
    list:[],
    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'教练审核',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async onLoad(){ 
      var that =this
      wx.startPullDownRefresh()     //页面加载的时候，开始页面刷新动画
      that.getList()
      let count =await db.collection('coachAudit').count()
      count=count.total
      let all=[]
      for(let i=0;i<count;i+=20){
        let list = await db.collection('coachAudit').skip(i).get()
        all =all.concat(list.data)
      }
      console.log(all)
      if(all.length!=0){
        that.setData({
          pdimg:false
        })
      }else{
        
      }
      that.setData({
        list:all
      })
    },
     //监听用户下拉动作
     onPullDownRefresh(){
      console.log("下拉刷新的监听");
      //下拉刷新的时候，调用getList获取列表信息
      this.getList()
    },
    async getList(){
      var that=this
      let count =await db.collection('coachAudit').count()
      count=count.total
      let all=[]
      for(let i=0;i<count;i+=20){
        let list = await db.collection('coachAudit').skip(i).get()
        all =all.concat(list.data)
      }
      console.log(all)
      if(all.length!=0){
        that.setData({
          pdimg:false
        })
      }else{
        
      }
      that.setData({
        list:all
      })
      wx.stopPullDownRefresh()  
    },
    detail(event){
       wx.navigateTo({
         url: '/pages/coaDetail/coaDetail?id='+event.currentTarget.dataset.id,
       })
    }
  }
})
