// pages/mallDetail/mallDetail.js
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
    bind:"showpopup",
    pd:false,//按钮
    panduan:false,//物流显示
    courier:'',//
    odd:'',//商家和单号
    shows:false,//点击商家
    show: false,
    list:'',
    id:'',
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
      db.collection('goodsOrder').where({
        _id:options.id
      }).get({
        success: res => {
          console.log(res.data)
          if(res.data[0].orderState[res.data[0].orderState.length-1].status=="商家已发货"){
              that.setData({
                pd:true,
                panduan:true,
                bind:""
              })
          }
          that.setData({
            list:res.data[0],
            id:options.id
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
    showpopup(){
       this.setData({
         shows:true
       })
    },
    getUserInf() {
      var that =this
      console.log(that.data.courier)
      console.log(that.data.odd)
      wx.showModal({
        title: '提示',
        content: '是否提交？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.setData({
              panduan:true,
              pd:true
            })
            var year=new Date().getFullYear()
            var month=new Date().getMonth()
            var day=new Date().getDate()
            var h=new Date().getHours()
            var m=new Date().getMinutes()
            var s=new Date().getSeconds()
            var time =year+'-'+(month+1)+'-'+day+' '+h+':'+m+':'+s
            console.log(time)
            const obj ={status:"商家已发货",time:time}
            db.collection('goodsOrder').where({
              _id:that.data.id
            }).update({
              data:{
                LogBusiness:that.data.courier,
                LogNumber:that.data.odd,   
                orderState:that.data.list.orderState.concat(obj)
              },
              success: res => {
                wx.showToast({
                  title: '新增记录成功',
                })
                wx.navigateBack({
                  delta:-1,
                })
              },
              fail: err => {
                wx.showToast({
                  icon: 'none',
                  title: '新增记录失败'
                })
              }
            })
            








          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    onClose() {
      this.setData({ shows: false });
    },
    kuaidi(event){
      if(event.detail.value==''){
        wx.showToast({
          icon:'error',
          title: '信息为空',
        })
      }else{
     this.setData({
        courier:event.detail.value
      })
      }
    
    },
    danhao(event){
      if(event.detail.value==''){
        wx.showToast({
          icon:'error',
          title: '信息为空',
        })
      }else{
      this.setData({
        odd:event.detail.value
      })
    }
    }
  }
})
