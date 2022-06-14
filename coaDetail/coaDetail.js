// pages/coaDetail/coaDetail.js
const app= getApp()
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
    list:[],
    course:'',
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
    onLoad(options){
      var that =this
      wx.startPullDownRefresh()     //页面加载的时候，开始页面刷新动画
      that.getList()
      console.log(options.id)
      db.collection('coachAudit').where({
        _id:options.id
      }).get({
        success: res => {
          that.setData({
            list:res.data[0]
          })
          for(var i=0;i<res.data[0].goodCourse.length;i++){
            that.setData({
              course:that.data.course.concat(res.data[0].goodCourse[i]+",")
            }) 
          }
          console.log(res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
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
    idimg(){
      wx.previewImage({
        current: this.data.list.idCard[0], // 当前显示图片的 http 链接
        urls: this.data.list.idCard // 需要预览的图片 http 链接列表
      })
    },
    idimgs(){
      wx.previewImage({
        current: this.data.list.introduceImg[0], // 当前显示图片的 http 链接
        urls: this.data.list.introduceImg // 需要预览的图片 http 链接列表
      })
    },
    idimges(){
      wx.previewImage({
        current: this.data.list.realCert[0], // 当前显示图片的 http 链接
        urls: this.data.list.realCert // 需要预览的图片 http 链接列表
      })
    },
    through(){
      var that=this
      wx.showModal({
        title: '提示',
        content: '确认教练通过审核？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            db.collection('coachInformation').add({
              data:{
                _id:that.data.list._id,
                accurateAddress:[],
                backgroundImage:"https://636c-cloud1-8g2fugfn795510c9-1311427822.tcb.qcloud.la/userBgImage/oF9e34vvBD7QnFGRttWgSi44ANV4.png",
                charmValue:0,
                classNumber:0,
                creatPrice:0,
                creatWallet:'0',
                employedAge:that.data.list.employedAge,
                goodCourse:that.data.list.goodCourse,
                goodNum:0,
                idCard:that.data.list.idCard,
                idNumber:that.data.list.idNumber,
                introduceImg:that.data.list.introduceImg,
                level:1,
                openid:that.data.list._openid,
                points:'0',
                position:that.data.list.position,
                realBirthDate:that.data.list.realBirthDate,
                realCert:that.data.list.realCert,
                realGender:that.data.list.realGender,
                realHeight:that.data.list.realHeight,
                realLocation:that.data.list.realLocation,
                realName:that.data.list.realName,
                realPhone:that.data.list.realPhone,
                realWeight:that.data.list.realWeight,
                serviceType:that.data.list.serviceType,
                state:'已下线',
                wechatImg:that.data.list.wxchatImg,
                wechatName:that.data.list.wxchatName,
                wechatPhone:that.data.list.wxchatPhone,
                workLocation:that.data.list.workLocation
              },
              success: res => {
                wx.showToast({
                  title: '修改成功',
                })
                db.collection('coachAudit').where({
                  _id:that.data.list._id
                }).remove({
                  success: res => {
                    wx.navigateBack({
                      delta: -1,
                    })
                  },
                  fail: err => {
                  }
                })
              },
              fail: err => {
                wx.showToast({
                  icon: 'none',
                  title: '新增记录失败'
                })
                console.error('[数据库] [新增记录] 失败：', err)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.showToast({
              title: '已取消',
            })
          }
        }
      })
    },
    rejected(){
      var that =this
      wx.showModal({
        title: '提示',
        content: '是否驳回教练申请？',
        success (res) {
          if (res.confirm){
            wx.cloud.callFunction({
              name: "sendMsg",
              data: {
                openid:that.data.list._openid
              }
            }).then(res => {
              console.log("推送消息成功", res)
            wx.navigateBack({
              delta: -1,
            })
            db.collection('coachAudit').where({
              _id:that.data.list._id
            }).remove({
              success: res => {
                wx.navigateBack({
                  delta: -1,
                })
              },
              fail: err => {
              }
            })
            }).catch(res => {
              console.log("推送消息失败", res)
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})
