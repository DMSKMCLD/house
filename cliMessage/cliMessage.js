// pages/cliMessage/cliMessage.js
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
    navTitle:'客户信息',//标题
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
      that.setData({
        lister:[]
      })
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
      var length=all.length/7
      that.setData({
        pages:length,
        lister:all.splice(0,7)
      }) 
      console.log(that.data.pages)
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
        lister:all.splice(0,7)
      }) 
      console.log(this.data.lister)
      wx.stopPullDownRefresh()  
    },
    dongjie(){
      var that =this
      wx.showModal({
        title: '请说明一个原因冻结该账户余额',
        content: '',
        editable:true,
        success (res) {
          if (res.confirm) {
            db.collection('userInformation').where({
              openId:that.data.openid
            }).update({
              data:{
                freeze:Boolean(true),
                freezeReason:'冻结原由为'+res.content
              },
              success: res => {
                wx.showToast({
                  title: '修改记录成功',
                }),
                wx.navigateBack({
                  delta: -1,
                })
              },
              fail: err => {
                icon: 'none',
                  console.error('[数据库] [更新记录] 失败：', err)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    jiedong(){
      var that= this
      wx.showModal({
        title: '提示',
        content: '是否解冻该账号余额？',
        success (res) {
          if (res.confirm) {
            db.collection('userInformation').where({
        openId:that.data.openid
      }).update({
        data:{
         freeze:Boolean(false),
         freezeReason:''
        },
        success: res => {
          wx.showToast({
            title: '修改记录成功',
          }),
          wx.navigateBack({
            delta: -1,
          })
        },
        fail: err => {
          icon: 'none',
            console.error('[数据库] [更新记录] 失败：', err)
        }
      })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })



      
   
    }
  }
})
