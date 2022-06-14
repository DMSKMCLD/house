// pages/mallOrder/mallOrder.js
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
    page:1,
    pages:'',
    lists:[],
    alllists:[],
    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'商城订单',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色  
  },

  /**
   * 组件的方法列表
   */
  methods: {
   async onLoad(){ 
      var that =this
      let count =await db.collection('goodsOrder').count()
      count=count.total
      let all=[]
      for(let i=0;i<count;i+=20){
        let list = await db.collection('goodsOrder').skip(i).get()
        all =all.concat(list.data)
      }
      console.log(all)
      var length =all.length/5
      that.setData({
        alllists:all.reverse(),
        pages:length,
        lists:this.data.lists.concat(all.slice(0,5))
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
    onReachBottom(){
     if(this.data.pages<=this.data.page){
      wx.showToast({
        icon:"error",
        title: '无更多内容',
      })
     }else{
       var yanxu = this.data.alllists.slice(this.data.page*5,this.data.page*5+5)
       console.log(yanxu)
       this.setData({
         page:this.data.page+1,
         lists:this.data.lists.concat(yanxu)
       })
     } 
    },
    getList(){
      wx.stopPullDownRefresh()  
    },
    navdetail(event){
      console.log(event.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/mallDetail/mallDetail?id='+event.currentTarget.dataset.id,
      })
    }
  }
})
