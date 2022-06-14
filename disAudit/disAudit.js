// pages/disAudit/disAudit.js
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
    bottompage:false,
    list:[],
    imgwidth:'',
    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'帖子审核',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色 
  },

  /**
   * 组件的方法列表
   */
  methods: {
   async onLoad(){ 
      var that =this
      let count =await db.collection('postInformation').count()
      count=count.total
      let all=[]
      for(let i=0;i<count;i+=20){
        let list = await db.collection('postInformation').where({postStatus:"审核中"}).skip(i).get()
        all =all.concat(list.data)
      }
      console.log(all)
      if(all.length==0){
         that.setData({
           bottompage:true
         })
      }else{
        that.setData({
          bottompage:false
        })
      }
      that.setData({
        list:all
      })
      for(var i=0;i<that.data.list.length;i++){
        if(that.data.list[i].fileList.length==1|that.data.list[i].fileList.length==2|that.data.list[i].fileList.length==3){
          that.setData({
            imgwidth:'30%'
          })
        }else if(that.data.list[i].fileList.length==4){
          that.setData({
            imgwidth:'25%'
          })
        }else if(that.data.list[i].fileList.length==5){
          that.setData({
            imgwidth:'20%'
          })
        }else if(that.data.list[i].fileList.length==6){
          that.setData({
            imgwidth:'16.6%'
          })
        }else if(that.data.list[i].fileList.length==7){
          that.setData({
            imgwidth:'14%'
          })
        }
        else if(that.data.list[i].fileList.length==8){
          that.setData({
            imgwidth:'12%'
          })
        }else{
          that.setData({
            imgwidth:'11%'
          })
        }
      }
      wx.startPullDownRefresh()     //页面加载的时候，开始页面刷新动画
      that.getList()
    },
     //监听用户下拉动作
     onPullDownRefresh(){
      console.log("下拉刷新的监听");
      //下拉刷新的时候，调用getList获取列表信息
      this.getList()
    },
    async getList(){
      var that =this
      let count =await db.collection('postInformation').count()
      count=count.total
      let all=[]
      for(let i=0;i<count;i+=20){
        let list = await db.collection('postInformation').where({postStatus:"审核中"}).skip(i).get()
        all =all.concat(list.data)
      }
      console.log(all)
      that.setData({
        list:all
      })
      for(var i=0;i<that.data.list.length;i++){
        if(that.data.list[i].fileList.length==1|that.data.list[i].fileList.length==2|that.data.list[i].fileList.length==3){
          that.setData({
            imgwidth:'30%'
          })
        }else if(that.data.list[i].fileList.length==4){
          that.setData({
            imgwidth:'25%'
          })
        }else if(that.data.list[i].fileList.length==5){
          that.setData({
            imgwidth:'20%'
          })
        }else if(that.data.list[i].fileList.length==6){
          that.setData({
            imgwidth:'16.6%'
          })
        }else if(that.data.list[i].fileList.length==7){
          that.setData({
            imgwidth:'14%'
          })
        }
        else if(that.data.list[i].fileList.length==8){
          that.setData({
            imgwidth:'12%'
          })
        }else{
          that.setData({
            imgwidth:'11%'
          })
        }
      }
      wx.stopPullDownRefresh()  
    },
    clickimg(event){
      wx.previewImage({
        urls: [event.currentTarget.dataset.img],
      })
    },
    through(event){
      console.log(event.currentTarget.dataset.id)
      wx.showModal({
        title: '提示',
        content: '是否通过帖子审核？',
        success (res) {
          if (res.confirm) {
            db.collection('postInformation').where({
              _id:event.currentTarget.dataset.id
            }).update({
              data:{
                postStatus:'已通过'
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
                wx.showToast({
                  title: '更新失败，请稍后重试！',
                })
                console.error('[数据库] [更新记录] 失败：', err)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    rejected(event){
      console.log(event.currentTarget.dataset.id)
      wx.showModal({
        title: '提示',
        content: '是否驳回帖子审核？',
        success (res) {
          if (res.confirm) {
            db.collection('postInformation').where({
              _id:event.currentTarget.dataset.id
            }).update({
              data:{
                postStatus:'未通过'
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
                wx.showToast({
                  title: '更新失败，请稍后重试！',
                })
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
