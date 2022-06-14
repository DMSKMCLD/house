// pages/orderDetail/orderDetail.js
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
    page:'1',
    psges:'',
    lister:[],//数据接收
    alllister:[],
    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'订单列表',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色 
  },

  /**
   * 组件的方法列表
   */
  methods: {
   async onLoad(options){
     console.log(options.openid) 
      var that =this
      let count =await db.collection('coachOrder').count()
      count=count.total
      let all=[]
      for(let i=0;i<count;i+=20){
        let list = await db.collection('coachOrder').where({openId:options.openid}).skip(i).get()
        all =all.concat(list.data)
      }
      console.log(all)
      that.setData({
        alllister:all
      })
      var length=all.length/7
      that.setData({
        pages:length,
        lister:all.splice(0,7)
      }) 
      wx.startPullDownRefresh()     //页面加载的时候，开始页面刷新动画
      that.getList()
    },
    onReachBottom:function() {
      console.log(this.data.page)
      console.log(this.data.pages)
       if(this.data.page<this.data.pages){  
         this.setData({
             lister:(this.data.lister).concat(this.data.alllister),
             page:Number(this.data.page)+3
         })
         console.log(this.data.lister)
       }else{
         wx.showToast({
           icon:'error',
           title: '无更多数据',
         })
       }
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
    navdetail(event){
      console.log(event.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/detail/detail?id='+event.currentTarget.dataset.id,
      })

    }
  }
})
