// pages/disList/disList.js
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
   more:false,

    arr:[],//已通过
    arrs:[],//未通过

    if:true,

    option1: [
      { text: '全部列表', value: 0 },
      { text: '已通过', value: 1 },
      { text: '未通过', value: 2 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '热度排序', value: 'b' },
    ],
    value1: 0,
    value2: 'a',

    not:[],
    list:[],
    lists:[],//不变的全部记录数量

    lister:true,
    noter:false,
    imgwidth:'',
    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'帖子分类',//标题
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
        let list = await db.collection('postInformation').skip(i).get()
        all =all.concat(list.data)
      }
      console.log(all)
      that.setData({
        list:all,
        lists:all
      })
      for(var i=0;i<that.data.list.length;i++){
        console.log(that.data.list[i])
        console.log(that.data.list[i].fileList.length)
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
      for(var j=0;j<that.data.list.length;j++){
        if(that.data.list[j].postStatus=="已通过"){
          that.setData({
            arr:that.data.arr.concat(that.data.list[j])
          })
        }else if(that.data.list[j].postStatus=="未通过"){
          that.setData({
            arrs:that.data.arrs.concat(that.data.list[j])
          })
        }else{
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
        let list = await db.collection('postInformation').skip(i).get()
        all =all.concat(list.data)
      }
      console.log(all)
      that.setData({
        list:all
      })
      wx.stopPullDownRefresh()  
    },
    onfirstChange({detail}){
      console.log(this.data.option1[detail].text)  
      if(this.data.option1[detail].text=='全部列表'){
        console.log(this.data.list)
        this.setData({
          list:this.data.lists,
          noter:false,
          lister:true,
          more:false
        })
      }else if(this.data.option1[detail].text=='已通过'){
        console.log(this.data.arr)
        this.setData({
          list:this.data.arr,
          noter:false,
          lister:true,
          more:true
        })
      }else if(this.data.option1[detail].text=='未通过'){
        console.log(this.data.arrs)
        this.setData({
          not:this.data.arrs,
          noter:true,
          lister:false,
          more:false
        })
      }
      if(this.data.option1[detail].text=='已通过'){
         this.setData({
           if:false
         }) 
      }else{
        this.setData({
          if:true
        }) 
      }
    },
    onsecondChange({detail}){
      console.log(detail)
      for(var k=0;k<this.data.option2.length;k++){
         if(this.data.option2[k].value==detail){
           var text =this.data.option2[k].text
       if(text=='默认排序'){
         console.log(this.data.arr)
        this.setData({
          list:this.data.arr
       })
       }else if(text=='热度排序'){
         var copyarr=[].concat(this.data.arr)
        copyarr.sort(function(a,b){
          return a.postHots < b.postHots ? 1 : -1
        });
          console.log(copyarr)
          this.setData({
             list:copyarr
          })
         }
         }
      }
    },
    remove(event){
      console.log(event.currentTarget.dataset.id)
      wx.showModal({
        title: '提示',
        content: '删除后帖子将不会有记录,是否删除？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            db.collection('postInformation').where({
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
    choose(event){
      console.log(event.currentTarget.dataset.id)
      wx.showModal({
        title: '提示',
        content: '当前帖子未通过,是否改为通过？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
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
                  icon:'error',
                  title: '修改记录失败',
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    more(event){
      console.log(event.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/disInfor/disInfor?id='+event.currentTarget.dataset.id,
      })
    }
  }
})
