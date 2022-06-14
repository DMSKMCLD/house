// pages/baDetail/baDetail.js
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
    dongjie:'false',
    jiedong:'false',
    openid:'',
    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'余额详情',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色
  },

  /**
   * 组件的方法列表
   */
  methods: {
   async onLoad(options){ 
      var that =this
      console.log(options.openid)
      that.setData({
        openid:options.openid
      })
      db.collection('coachInformation').where({
        openId:options.openid
      }).get({
        success: res => {
          console.log(res.data[0])
          if(res.data[0].freeze=='false'){
            console.log("ad")
             that.setData({
               dongjie:true,
               jiedong:false
             })
          }else{
            that.setData({
              dongjie:false,
              jiedong:true
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

      let count =await db.collection('coachWallet').count()
      count=count.total
      let all=[]
      for(let i=0;i<count;i+=20){
        let list = await db.collection('coachWallet').where({
          _openid:options.openid
        }).skip(i).get()
        all =all.concat(list.data)
      }
      console.log(all)
      that.setData({
        list:all.reverse()
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
     dongjie(){
       var that=this
      wx.showModal({
        title: '请输入一个冻结的原因！',
        content: '',
        editable:true,
        success (res) {
          if (res.confirm) {
            console.log(res.content)
            wx.showToast({
              icon:'none',
              title: '冻结成功，教练将不能提现',
            })
            db.collection('coachInformation').where({
              openId:that.data.openid
            }).update({
              data:{
                freeze:'true',
                freezeReason:res.content
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
     },
     jiedong(){
       var that =this
      wx.showModal({
        title: '提示',
        content: '是否解冻当前账户余额？',
        success (res) {
          if (res.confirm) {
            db.collection('coachInformation').where({
              openId:that.data.openid
            }).update({
              data:{
                freeze:'false',
                freezeReason:''
              },
              success: res => {
                wx.showToast({
                  title: '修改记录成功',
                })
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
