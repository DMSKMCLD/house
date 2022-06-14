// pages/login/logins.js
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
    loginopenid:'',
    useropenid:'',
    userphone:'',
    userimg:'',
    username:'',
    userinfor:'false',
    userinfors:'false',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      var that = this
      wx.getStorage({
        key: 'openiddtime',
        success (res) {
           that.setData({
             loginopenid:res.data
           }) 
          var timestamp=Date.parse(new Date())
          if(that.data.loginopenid<timestamp){
            wx.showModal({
              title: '提示',
              content: '当前登录信息已过期，请重新登录',
              success (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            // wx.clearStorage()
          }else{
            wx.switchTab({
              url: '/pages/clientele/clientele',
            })
          }        
        },
        fail:err=>{
          console.error(err)
        }
      })
    },
    loginwe(){
      this.setData({
        userinfor:'false',
        userinfors:'false'
      })
      wx.getUserProfile({
        desc: '信息验证',
        success: (res) => {
          console.log(res.userInfo)
          
          this.setData({
            userimg:res.userInfo.avatarUrl,
            username:res.userInfo.nickName,
            userinfor:"true"
          })   
          this.gain()
        },
        fail:(res)=>{
          wx.showToast({
            icon:'error',
            title: '授权失败',
          })
          this.setData({
            userinfors:'false',
            userinfor:'false'
          })
        }
      })
    },
    // 获取用户手机号码
    getPhoneNumber: function (e) {
      var that =this
      that.setData({
        // userinfor:'false',
        userinfors:'false'
      })
          if(e.detail.errMsg=='getPhoneNumber:ok') {
            // 允许
            wx.cloud.callFunction({
              name: 'getPhoneNumber',
              data: {
                id: e.detail.cloudID
              },
              success: res => {
                 console.log(res)
                that.setData({
                  userinfors:"true",
                  userphone:res.result.openData.list[0].data.purePhoneNumber,
                  useropenid: res.result.openid
                })
                that.gain()
              },
              fail: err => {
                that.setData({
                  userinfors:'false',
                  userinfor:'false'
                })
                wx.showToast({
                  icon: 'none',
                  title: 'fail',
                })
              }
            })
          }else {
            that.setData({
              userinfor:'false',
              userinfors:'false'
            })
            // 拒绝
            wx.showToast({
              icon: 'error',
              title: '手机号授权失败',
            })
          } 
    },   
    gain(){
      console.log(this.data.userinfor)
      console.log(this.data.userinfors)
     if(this.data.userinfor== 'true'&this.data.userinfors=='true'){
                  function setStorageSyncSecond(key, value, time) {
                    value = value ? value : 1
                    wx.setStorageSync(key, value)
                    var t = time ? +time : 24 * 3600
                    if (t > 0) {
                      console.log(t)
                      var timestamp = new Date().getTime()+ t
                      console.log(timestamp)
                      wx.setStorageSync(key + 'dtime', timestamp + "")
                    } else {
                      wx.removeStorageSync(k + 'dtime')
                    }
                  }
                  db.collection('managementInformation').where({
                    openId:this.data.useropenid
                  }).get({
                    success:res=>{
                      console.log(res)
                      if(res.data.length==1){
                        db.collection('managementInformation').where({
                          openId:this.data.useropenid
                        }).update({
                          data: {
                            wechatName:this.data.username,
                            wechatImg:this.data.userimg,
                            phoneNumber:this.data.userphone,
                          },
                          success: res => {
                            console.log("修改记录成功")
                          },
                          fail: err => {
                            console.error('[数据库] [更新记录] 失败：', err)
                          }
                        })    
                        wx.showModal({
                          title: '登陆成功！！',
                          icon:'success',
                          duration:2500
                      })
                      setStorageSyncSecond('username',this.data.username,86400000,)
                      setStorageSyncSecond('userimg',this.data.userimg,86400000)
                      setStorageSyncSecond('userphone',this.data.userphone,86400000)
                      setStorageSyncSecond('openid',this.data.useropenid,86400000)        
                      console.log(this.data.useropenid)
                      console.log(this.data.userphone)
                      console.log(this.data.username)
                      console.log(this.data.userimg)              
                      wx.switchTab({
                          url: '/pages/clientele/clientele',
                      })
                      }else{
                        wx.showModal({
                          title:'提示',
                          content:'当前微信未注册，如您已注册，请切换为注册微信登录！'
                        })
                      }
                    },
                    fail:err=>{
                      console.error(err)
                    }
                  })
      }else{
      }
    }
   
  }       
})
