// pages/mallCreat/mallCreat.js
const db=wx.cloud.database()
const app=getApp()
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
    name:'',
    intro:'',
    price:'',
    sales:'',
    fennei:'',
    imgs:[],
    id:'',

    show: false,
    actions: [
      {
        name: '动感单车',
      },
      {
        name: '哑铃',
      },
      {
        name: '壶铃',
      },
      {
        name: '椭圆机',
      },
      {
        name: '瑜伽球',
      },
      {
        name: '力量训练器',
      },
      {
        name: '其他器械',
      },
    ],

    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'商品详情',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色  
  },

  /**
   * 组件的方法列表
   */
  methods: {
  onLoad(options){ 
    var that =this
    console.log(options.id)
    that.setData({
      id:options.id
    })
      db.collection('goodsInfo').where({
        _id:options.id
      }).get({
        success: res => {
          console.log(res.data[0])
          that.setData({
            name:res.data[0].goodsName,
            intro:res.data[0].goodsDesc,
            price:res.data[0].goodsPrice,
            sales:res.data[0].goodsSalesVolume,
            fennei:res.data[0].goodsType,
            imgs:res.data[0].goodsPic
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
  getList(){
    wx.stopPullDownRefresh()  
  },
  //监听用户下拉动作
  onPullDownRefresh(){
        console.log("下拉刷新的监听");
        //下拉刷新的时候，调用getList获取列表信息
        this.getList()
  },
  press(event){
    var that =this
    console.log(event.currentTarget.dataset.index)
    wx.showModal({
      title: '提示',
      content: '是否要删除图片？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var arr= that.data.imgs
          arr.splice(event.currentTarget.dataset.index,1)
          console.log(arr)
          that.setData({
            imgs:arr
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  async uploadFileTap(res) {
    // 上传类型
    const type = res.currentTarget.dataset.type
    let filePathObj = null
    let filePathList = []
    if (type == 'file') {
      filePathObj = await this.chooseMessageFile(1, 'file')
      if (!filePathObj) return
      filePathList.push(filePathObj.tempFiles[0].path)
    } else if (type == 'img') {
      filePathObj = await this.chooseImg(1)
      if (!filePathObj) return
      filePathList = filePathObj.tempFilePaths
    } else {
      return
    }
    console.log("选择文件信息 ====>", filePathObj)
    let cloudPathList = []
    for (let i = 0; i < filePathList.length; i++) {
      const cloudPathObj = await this.upLoadFile(filePathList[i], 'file')
      if (!cloudPathObj) {
        continue
      }
      console.log(cloudPathObj)
      console.log(cloudPathObj.fileID)
      cloudPathList.push(cloudPathObj.fileID)
    }
     var arrs=this.data.imgs.concat(cloudPathList)
     if(arrs.length>2){
       console.log("dw")
      wx.cloud.deleteFile({
        fileList:['cloudPathObj.fileID'],
        success: res => {
          console.log(res.fileList)
        },
        fail: console.error
      })
      wx.showModal({
        title: '提示',
        content: '图片最多为两张，请重新上传',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
     }else{
      this.setData({
        imgs:arrs
      })
     }
  },
  /** 选择图片封装函数
   * @param count 照片数量
   * @param sizeType 照片的质量, 默认 ['original', 'compressed']
   * @param sourceType 照片来源, 默认 ['album', 'camera']
   */
  chooseImg(count, sizeType, sourceType) {
    if (!count) count = 1
    if (!sizeType) sizeType = ['original', 'compressed']
    if (!sourceType) sourceType = ['album', 'camera']
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: count,
        sizeType: sizeType,
        sourceType: sourceType,
        success(res) {
          resolve(res)
          wx.showLoading({
            title: '加载中',
          })
          setTimeout(function () {
            wx.hideLoading( 
            )
            //  wx.showToast({
            //  title: '上传成功',
            // icon:'success'
            // })
          }, 2000)
        },
        fail(err) {
          resolve(false)
        wx.showToast({
          title: '上传取消',
          icon:"error"
        })
          console.error("===== 选取照片失败 =====", err)
        }
      })
    })
  },
  /** 
   * 上传文件封装函数, 文件名随机性处理，由17位随机字符+13位时间戳组成
   * @param {string} filePath 要上传图片的临时路径
   * @param {string} cloudPathPrefix 云数据库存储文件路径前缀
   */
  upLoadFile(filePath, cloudPathPrefix) {
    // 取随机名
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomStr = '';
    for (let i = 17; i > 0; --i) {
      randomStr += str[Math.floor(Math.random() * str.length)];
    }
    randomStr += new Date().getTime()
    return new Promise((resolve, reject) => {
      let suffix = /\.\w+$/.exec(filePath)[0] //正则表达式返回文件的扩展名
      let cloudPath = cloudPathPrefix + '/' + randomStr + suffix
      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: filePath,
        success(res) {
          resolve(res)
        },
        fail(err) {
          resolve(false)
          console.error("===== 上传文件失败 =====", err)
        },
      })
    })
  },
  fn(){
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onSelect(event) {
    console.log(event.detail.name);
    this.setData({
      fennei:event.detail.name
    })
  },
  xiugai(){
    db.collection('goodsInfo').where({
      _id:this.data.id
    }).update({
      data:{
        goodsName:this.data.name,
        goodsDesc:this.data.intro,
        goodsPrice:this.data.price,
        goodsSalesVolume:this.data.sales,
        goodsType:this.data.fennei,
        goodsPic:this.data.imgs
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
  }
  }
})
