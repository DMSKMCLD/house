// pages/cliOrder/cliOrder.js
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
    firstarr:[],
    secondarr:[],
    thirdarr:[],
    
    page:'1',
    psges:'',
    lister:[],//数据接收
    alllister:[],

    option1: [
      { text: '不限类型', value: 0 },
      { text: '客户已下单', value: 1 },
      { text: '订单已完成', value: 2 },
      { text: '客户已取消', value: 3 },
    ],
    option2: [
      { text: '不限地点', value: 'a' },
      { text: '在家练', value: 'b' },
      { text: '健身房', value: 'c' },
    ],
    value1: 0,
    value2: 'a',

    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'客户订单',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    detection(){
      this.setData({
        firstarr:[],
        secondarr:[],
        lister:[]
      })
      if(this.data.value1==Number(0)){
        //类型全部
        this.setData({
          firstarr:this.data.alllister
        })
        //地点不同
        if(this.data.value2=='a'){
          this.setData({
            secondarr:this.data.firstarr
          })
          this.setData({
            lister:this.data.secondarr
          })
        }else if(this.data.value2=='b'){
          for(var j=0;j<this.data.firstarr.length;j++){
            if(this.data.firstarr[j].orderType=="在家练"){
              this.setData({
                secondarr:this.data.secondarr.concat(this.data.firstarr[j])
              })
              this.setData({
                lister:this.data.lister.concat(this.data.secondarr)
              })
            }else{
            }
          }
        }else if(this.data.value2=='c'){
          for(var j=0;j<this.data.firstarr.length;j++){
            if(this.data.firstarr[j].orderType=="健身房"){
              this.setData({
                lister:this.data.lister.concat(this.data.firstarr[j])
              })
            }else{
            }
          }
        }else{
        }        
      }else if(this.data.value1==Number(1)){
        for(var k=0;k<this.data.alllister.length;k++){
          if(this.data.alllister[k].orderState[this.data.alllister[k].orderState.length-1]=="客户已下单"){
            this.setData({
              firstarr:this.data.firstarr.concat(this.data.alllister[k])
            })
          }
        }    //地点不同
        if(this.data.value2=='a'){
          this.setData({
            secondarr:this.data.firstarr
          })
          this.setData({
            lister:this.data.secondarr
          })
        }else if(this.data.value2=='b'){
          for(var j=0;j<this.data.firstarr.length;j++){
            if(this.data.firstarr[j].orderType=="在家练"){
              this.setData({
                secondarr:this.data.secondarr.concat(this.data.firstarr[j])
              })
              this.setData({
                lister:this.data.lister.concat(this.data.secondarr)
              })
            }else{
            }
          }
        }else if(this.data.value2=='c'){
          for(var j=0;j<this.data.firstarr.length;j++){
            if(this.data.firstarr[j].orderType=="健身房"){
              this.setData({
                lister:this.data.lister.concat(this.data.firstarr[j])
              })
            }else{
            }
          }
        }else{
        }  
      }else if(this.data.value1==Number(2)){
        for(var k=0;k<this.data.alllister.length;k++){
          if(this.data.alllister[k].orderState[this.data.alllister[k].orderState.length-1]=="订单已完成"){
            this.setData({
              firstarr:this.data.firstarr.concat(this.data.alllister[k])
            })
          } 
        } 
        //地点不同
        if(this.data.value2=='a'){
          this.setData({
            secondarr:this.data.firstarr
          })
          this.setData({
            lister:this.data.secondarr
          })
        }else if(this.data.value2=='b'){
          for(var j=0;j<this.data.firstarr.length;j++){
            if(this.data.firstarr[j].orderType=="在家练"){
              this.setData({
                secondarr:this.data.secondarr.concat(this.data.firstarr[j])
              })
              this.setData({
                lister:this.data.lister.concat(this.data.secondarr)
              })
            }else{
            }
          }
        }else if(this.data.value2=='c'){
          for(var j=0;j<this.data.firstarr.length;j++){
            if(this.data.firstarr[j].orderType=="健身房"){
              this.setData({
                lister:this.data.lister.concat(this.data.firstarr[j])
              })
            }else{
            }
          }
        }else{
        }  
      }else if(this.data.value1==Number(3)){
        for(var k=0;k<this.data.alllister.length;k++){
          if(this.data.alllister[k].orderState[this.data.alllister[k].orderState.length-1]=="客户已取消"){
            this.setData({
              firstarr:this.data.firstarr.concat(this.data.alllister[k])
            })
         
          }
        }    //地点不同
        if(this.data.value2=='a'){
          this.setData({
            secondarr:this.data.firstarr
          })
          this.setData({
            lister:this.data.secondarr
          })
        }else if(this.data.value2=='b'){
          for(var j=0;j<this.data.firstarr.length;j++){
            if(this.data.firstarr[j].orderType=="在家练"){
              this.setData({
                secondarr:this.data.secondarr.concat(this.data.firstarr[j])
              })
              this.setData({
                lister:this.data.lister.concat(this.data.secondarr)
              })
            }else{
            }
          }
        }else if(this.data.value2=='c'){
          for(var j=0;j<this.data.firstarr.length;j++){
            if(this.data.firstarr[j].orderType=="健身房"){
              this.setData({
                lister:this.data.lister.concat(this.data.firstarr[j])
              })
            }else{
            }
          }
        }else{
        } 
      }else{
      }
    },
    onfirstChange({ detail }) {
      this.setData({ 
        value1: detail ,
        lister:[]
      });
      this.detection()
    },
    onsecondChange({ detail }) {
      console.log(detail)
      this.setData({ 
        value2: detail,
        lister:[]
      });
      this.detection()
    },
    async onLoad(){ 
      var that =this
      that.setData({
        lister:[]
      })
      wx.startPullDownRefresh()     //页面加载的时候，开始页面刷新动画
      that.getList()
      let count =await db.collection('coachOrder').count()
      count=count.total
      let all=[]
      for(let i=0;i<count;i+=20){
        let list = await db.collection('coachOrder').skip(i).get()
        all =all.concat(list.data)
      }   
       var length=(all.length)/4
      that.setData({
        alllister:all.reverse(),
        pages:length,
      })
      var arr =all.slice(0,4)
      that.setData({
        lister:arr
      })
    }, 
    onReachBottom:function() {
      console.log(this.data.page)
      console.log(this.data.pages)
      if(this.data.pages<=this.data.page){
        wx.showToast({
          icon:"error",
          title: '无更多内容',
        })
      }else{
        var yanxu =this.data.alllister.slice(this.data.page*4,this.data.page*4+4)
        console.log(yanxu)
       this.setData({
         page:Number(this.data.page)+1,
         lister:this.data.lister.concat(yanxu)
       })
      }
     },
     //监听用户下拉动作
     onPullDownRefresh(){
      //下拉刷新的时候，调用getList获取列表信息
      this.getList()
    },
    async getList(){
      this.setData({
        page:'1'
      })
      let count =await db.collection('coachOrder').count()
      count=count.total
      let all=[]
      for(let i=0;i<count;i+=20){
        let list = await db.collection('coachOrder').skip(i).get()
        all =all.concat(list.data)
      }
      console.log(all)
      var arrs =all.reverse().slice(0,4)
      this.setData({
        alllister:all,
        lister:arrs,
        value1:0,
        value2:'a'
      }) 
      wx.stopPullDownRefresh()  
    },
    navdetail(event){
        wx.navigateTo({
          url: '/pages/detail/detail?id='+event.currentTarget.dataset.id,
        })
    }
  }
})