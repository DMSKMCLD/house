// pages/mallAdjust/mallAdjust.js
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
    danche:[],
    yaling:[],
    huling:[],
    tuoyuan:[],
    yujia:[],
    liliang:[],
    qita:[],
    text1:'全部商品',
    text2:'默认排序',

    lister:[],
    alllister:[], 

    option1: [
      { text: '全部商品', value: 0 },
      { text: '动感单车', value: 1 },
      { text: '哑铃', value: 2 },
      { text: '壶铃', value: 3 },
      { text: '椭圆机', value: 4 },
      { text: '瑜伽球', value: 5 },
      { text: '力量训练器', value: 6 },
      { text: '其他器械', value:7 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '销量排序', value: 'b' },
    ],
    value1: 0,
    value2: 'a',

    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'商城调整',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色 
  },

  /**
   * 组件的方法列表
   */
  methods: {
   async onLoad(){ 
      var that =this
      let count =await db.collection('goodsInfo').count()
      count=count.total
      let all=[]
      for(let i=0;i<count;i+=20){
        let list = await db.collection('goodsInfo').skip(i).get()
        all =all.concat(list.data)
      }
      console.log(all)
      for(var i=0;i<all.length;i++){
        if(all[i].goodsType=="动感单车"){
          that.setData({
            danche:that.data.danche.concat(all[i])
          })
        }else if(all[i].goodsType=="哑铃"){
          that.setData({
            yaling:that.data.yaling.concat(all[i])
          })
        }else if(all[i].goodsType=="壶铃"){
          that.setData({
            huling:that.data.huling.concat(all[i])
          })
        }else if(all[i].goodsType=="椭圆机"){
          that.setData({
            tuoyuan:that.data.tuoyuan.concat(all[i])
          })
        }else if(all[i].goodsType=="瑜伽球"){
          that.setData({
            yujia:that.data.yujia.concat(all[i])
          })
        }else if(all[i].goodsType=="力量训练器"){
          that.setData({
            liliang:that.data.liliang.concat(all[i])
          })
        }else if(all[i].goodsType=="其他器械"){
          that.setData({
            qita:that.data.qita.concat(all[i])
          })
        }
      }
      that.setData({
        alllister:all,
        lister:all
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
    fgoods({detail}){
      console.log(detail)
      console.log(this.data.option1[detail].text)
      this.setData({
        text1:this.data.option1[detail].text
      })
      if(this.data.text1=="全部商品"){
        this.setData({
          lister:[].concat(this.data.alllister)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.alllister
          })
        }else if(this.data.text2=="销量排序"){  
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="动感单车"){
        this.setData({
          lister:[].concat(this.data.danche)
        })
        console.log(this.data.danche)
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.danche
          })
        }else if(this.data.text2=="销量排序"){
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="哑铃"){
        this.setData({
          lister:[].concat(this.data.yaling)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.yaling
          })
        }else if(this.data.text2=="销量排序"){
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="壶铃"){
        this.setData({
          lister:[].concat(this.data.huling)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.huling
          })
        }else if(this.data.text2=="销量排序"){ 
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="椭圆机"){
        this.setData({
          lister:[].concat(this.data.tuoyuan)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.tuoyuan
          })
        }else if(this.data.text2=="销量排序"){
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="瑜伽球"){
        this.setData({
          lister:[].concat(this.data.yujia)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.yujia
          })
        }else if(this.data.text2=="销量排序"){
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });    
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="力量训练器"){
        this.setData({
          lister:[].concat(this.data.liliang)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.liliang
          })
        }else if(this.data.text2=="销量排序"){
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="其他器械"){
        this.setData({
          lister:[].concat(this.data.qita)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.qita
          })
        }else if(this.data.text2=="销量排序"){
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });  
         this.setData({
           lister:arr
         })
        }
      }
    },
    sgoods({detail}){
      console.log(detail)
      if(detail=='a'){
        this.setData({
          text2:'默认排序'
        })
      }else if(detail=='b'){
        this.setData({
          text2:'销量排序'
        })
      }
      if(this.data.text1=="全部商品"){
        this.setData({
          lister:[].concat(this.data.alllister)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.alllister
          })
        }else if(this.data.text2=="销量排序"){  
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="动感单车"){
        this.setData({
          lister:[].concat(this.data.danche)
        })
        console.log(this.data.danche)
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.danche
          })
        }else if(this.data.text2=="销量排序"){
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="哑铃"){
        this.setData({
          lister:[].concat(this.data.yaling)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.yaling
          })
        }else if(this.data.text2=="销量排序"){
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="壶铃"){
        this.setData({
          lister:[].concat(this.data.huling)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.huling
          })
        }else if(this.data.text2=="销量排序"){ 
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="椭圆机"){
        this.setData({
          lister:[].concat(this.data.tuoyuan)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.tuoyuan
          })
        }else if(this.data.text2=="销量排序"){
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="瑜伽球"){
        this.setData({
          lister:[].concat(this.data.yujia)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.yujia
          })
        }else if(this.data.text2=="销量排序"){
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });    
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="力量训练器"){
        this.setData({
          lister:[].concat(this.data.liliang)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.liliang
          })
        }else if(this.data.text2=="销量排序"){
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });
         this.setData({
           lister:arr
         })
        }
      }else if(this.data.text1=="其他器械"){
        this.setData({
          lister:[].concat(this.data.qita)
        })
        if(this.data.text2=="默认排序"){
          this.setData({
            lister:this.data.qita
          })
        }else if(this.data.text2=="销量排序"){
          var arr=this.data.lister
          arr.sort(function(a,b){
            return a.goodsSalesVolume < b.goodsSalesVolume ? 1 : -1
         });  
         this.setData({
           lister:arr
         })
        }
      }
    },
    remove(event){
        wx.showModal({
          title: '提示',
          content: '是否删除该条商品信息？',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              db.collection('goodsInfo').where({
                _id:event.currentTarget.dataset.id
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
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
    },
    amend(event){
      console.log(event.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/mallCreat/mallCreat?id='+event.currentTarget.dataset.id,
      })
    },
    add(){
      wx.navigateTo({
        url: '/pages/mallAdd/mallAdd',
      })
    },
  }
})
