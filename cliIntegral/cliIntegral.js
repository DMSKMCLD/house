// pages/cliIntegral/cliIntegral.js
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
    page:'1',
    psges:'',
    lister:[],//数据接收
    alllister:[],

    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'客户积分',//标题
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
    let count =await db.collection('userInformation').count()
    count=count.total
    let all=[]
    for(let i=0;i<count;i+=20){
      let list = await db.collection('userInformation').skip(i).get()
      all =all.concat(list.data)
    }
    that.setData({
      alllister:all
    })
    var length=all.length/15
    that.setData({
      pages:length,
      lister:all.splice(0,15)
    }) 
  }, 
  onReachBottom:function() {
    if(this.data.page<this.data.pages){ 
      this.setData({
          lister:(this.data.lister).concat(this.data.alllister),
          page:Number(this.data.page)+1
      })
    }else{
      wx.showToast({
        icon:'error',
        title: '无更多数据',
      })
    }
  },
   //监听用户下拉动作
   onPullDownRefresh(){
    //下拉刷新的时候，调用getList获取列表信息
    this.getList()
  },
  async getList(){
    this.setData({
      page:'1'
    })
    let count =await db.collection('userInformation').count()
    count=count.total
    let all=[]
    for(let i=0;i<count;i+=20){
      let list = await db.collection('userInformation').skip(i).get()
      all =all.concat(list.data)
    }
    console.log(all)
    this.setData({
      alllister:all,
      lister:all.splice(0,15)
    }) 
    wx.stopPullDownRefresh()  
  }
  }
})
