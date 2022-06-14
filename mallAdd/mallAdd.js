// pages/mallAdd/mallAdd.js
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
    name:'',
    intro:'',
    price:'',
    sales:'',
    fennei:'',
    imgs:[],

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
    navTitle:'订单列表',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onload(){
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
          filePathObj = await this.chooseImg(2)
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
      add(){
         console.log(this.data.name)
         console.log(this.data.intro)
         console.log(this.data.price)
         console.log(this.data.sales)
         console.log(this.data.fennei)
         console.log(this.data.imgs)
         if(this.data.name==''|this.data.intro==''|this.data.price==''|this.data.sales==''|this.data.fennei==''|this.data.imgs.length==0){
          wx.showModal({
            title: '提示',
            content: '物品信息未完整，请填写后上传',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
         }else{
           db.collection('goodsInfo').add({
             data:{
              goodsName:this.data.name,
              goodsDesc:this.data.intro,
              goodsPrice:this.data.price,
              goodsType:this.data.fennei,
              goodsSalesVolume:this.data.sales,
              goodsPic:this.data.imgs
             },
             success: res => {
              wx.showToast({
                title: '新增记录成功',
              })
              wx.navigateBack({
                delta: -1,
              })
              console.log(res._id)
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '新增记录失败'
              })
            }
           })
         }
      }
  }
})
