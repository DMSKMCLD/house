// pages/evaluationDetail/evaDetail.js
const db =wx.cloud.database()
const app =getApp()
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
    kecheng:true,
    jiaolian:true,
    lister:[],
    tag:'',
    id:'',
    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'评价详情',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options){
      var that=this
      console.log(options.id) 
      this.setData({
        id:options.id
      })
      db.collection('commentInfo').where({
        _id:options.id
      }).get({
        success: res => {
          console.log(res.data[0])
          this.setData({
            lister:res.data[0]
          })
          if(that.data.lister.commentType=="课程评价"){
            that.setData({
              kecheng:true,
              jiaolian:false
             })
          }else if(that.data.lister.commentType=="教练评价"){
            that.setData({
              kecheng:false,
              jiaolian:true
            })
          }
          for(var i=0;i<res.data[0].tags.length;i++){
            this.setData({
              tag:this.data.tag.concat(res.data[0].tags[i]+',')
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
      db.collection('commentInfo').where({
        _id:this.data.id
      }).get({
        success: res => {
          console.log(res.data[0])
          this.setData({
            lister:res.data[0]
          })
          this.setData({
            tag:''
          })
          for(var i=0;i<res.data[0].tags.length;i++){
            this.setData({
              tag:this.data.tag.concat(res.data[0].tags[i]+',')
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
      wx.stopPullDownRefresh()  
    },
    remove(){
      wx.showModal({
        title: '提示',
        content: '确定删除该条评论?',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            db.collection('commentInfo').wherr({
              _id:this.data.id
            }).remove({
              success: res => {
                wx.showToast({
                  title: '删除成功',
                })
                wx.navigateBack({
                  delta: -1,
                })
              },
              fail: err => {
                wx.showToast({
                  icon: 'none',
                  title: '删除失败',
                })
                console.error('[数据库] [删除记录] 失败：', err)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    yulan(){
      wx.previewImage({
        urls:this.data.lister.picList,
      })
    }
  }
})
