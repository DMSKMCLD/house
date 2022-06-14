// pages/detail/detail.js
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
    coachprice:'',
    price:'block',
   coachname:'',
   coachphone:'',

    ordereva:false,
    ordertext:false,
    orderimg:false,

   bianhao:'',

    contant:[],

    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'订单详情',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options){ 
      var that =this
      that.setData({
        bianhao:options.id
      })
       db.collection('coachOrder').where({
         _id:options.id
       }).get({
        success: res => {
          console.log(res.data[0])
          db.collection('coachInformation').where({
            openid:res.data[0].openid
          }).get({
            success: res => {   
              console.log(res.data[0])
              that.setData({
                coachname:res.data[0].realName,
              coachphone:res.data[0].realPhone
              }) 
            },
            fail: err => {
              console.error(err)
            }
          })
          that.setData({
            contant:res.data[0]
          })
          if(res.data[0].makeSure[res.data[0].makeSure.length-1]=='订单已完成'&res.data[0].orderState[res.data[0].orderState.length-1]=='订单已完成'){
            that.setData({
              price:'block'
            })
            db.collection('coachWallet').where({
              orderSerial:options.id
            }).get({
              success: res => {
                console.log(res)
                 that.setData({
                   coachprice:res.data[0].changePrice
                 })
              },
              fail: err => {
                console.error(err)
              }
            })
          }else{
            that.setData({
              price:'none'
            })
          }
          if(res.data[0].clientEvaluation!=''){
            that.setData({
              ordereva:true
            })
          }else{
          }
          if(res.data[0].clientEvatext!=''){
            that.setData({
              ordertext:true
            })
          }else{
          }
          if(res.data[0].clientEvaimg!=''){
            that.setData({
              orderimg:true
            })
          }else{
          }

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
      //下拉刷新的时候，调用getList获取列表信息
      this.getList()
    },
    getList(){  
      db.collection('coachOrder').where({
        _id:this.data.bianhao
      }).get({
       success: res => {
         that.setData({
           contant:res.data[0]
         })
         if(res.data[0].clientEvaluation!=''){
           that.setData({
             ordereva:true
           })
         }else{
         }
         if(res.data[0].clientEvatext!=''){
           that.setData({
             ordertext:true
           })
         }else{
         }
         if(res.data[0].clientEvaimg!=''){
           that.setData({
             orderimg:true
           })
         }else{
         }

       },
       fail: err => {
         wx.showToast({
           icon: 'none',
           title: '查询记录失败'
         })
       }    
      })
      wx.stopPullDownRefresh()  
    }
  }
})
