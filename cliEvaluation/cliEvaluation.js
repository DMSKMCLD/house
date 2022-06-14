// pages/cliEvaluation/cliEvaluation.js
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
    chunfang:[],
    kecheng:[],
    jiaolian:[],
    lister:[],
    alllister:[],
    option1: [
      { text: '全部评价', value: 0 },
      { text: '教练评价', value: 1 },
      { text: '课程评价', value: 2 },
    ],
    option2: [
      { text: '默认分类', value: 'a' },
      { text: '好评', value: 'b' },
      { text: '中评', value: 'c' },
      { text: '差评', value: 'd' },
    ],
    value1: 0,
    value2: 'a',

    isShow:true,//是否显示左侧按钮
    backgroundColor:'white',//背景颜色
    navTitle:'课程评价',//标题
    isWhite:false,//是否白色胶囊
    titleColor:'#000',//字体颜色 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async onLoad(){ 
      var that =this
      let count =await db.collection('commentInfo').count()
      count=count.total
      let all=[]
      for(let i=0;i<count;i+=20){
        let list = await db.collection('commentInfo').skip(i).get()
        all =all.concat(list.data)
      }
     console.log(all)
     for(var j=0;j<all.length;j++){
       if(all[j].commentType=="课程评价"){
          that.setData({
            kecheng:that.data.kecheng.concat(all[j])
          })
       }else if(all[j].commentType=="教练评价"){
        that.setData({
          jiaolian:that.data.jiaolian.concat(all[j])
        })
       }
     }
     this.setData({
       alllister:all.reverse(),
       lister:all.reverse()
     })
    wx.startPullDownRefresh()     //页面加载的时候，开始页面刷新动画
    that.getList()
      },
     //监听用户下拉动作
     onPullDownRefresh(){
          //下拉刷新的时候，调用getList获取列表信息
          this.getList()
        },
    getList(){
          wx.stopPullDownRefresh()  
        },
    navdetail(event){
      console.log(event.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/evaDetail/evaDetail?id='+event.currentTarget.dataset.id,
      })    
    },
    first({detail}){
      this.setData({
        value1:detail
      })
      if(this.data.value1==0){
        this.setData({
          lister:this.data.alllister
        })
        if(this.data.value2=='a'){
        }else if(this.data.value2=='b'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="好评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }else if(this.data.value2=='c'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="中评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }else if(this.data.value2=='d'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="差评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }
      }else if(this.data.value1==1){
        this.setData({
          lister:this.data.jiaolian
        })
        if(this.data.value2=='a'){
        }else if(this.data.value2=='b'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="好评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }else if(this.data.value2=='c'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="中评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }else if(this.data.value2=='d'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="差评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }
      }else if(this.data.value1==2){
        this.setData({
          lister:this.data.kecheng
        })
        if(this.data.value2=='a'){
        }else if(this.data.value2=='b'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="好评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }else if(this.data.value2=='c'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="中评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }else if(this.data.value2=='d'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="差评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }
      }
    },
    second({detail}){
      this.setData({
        value2:detail
      })
      if(this.data.value1==0){
        this.setData({
          lister:this.data.alllister
        })
        if(this.data.value2=='a'){
        }else if(this.data.value2=='b'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="好评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }else if(this.data.value2=='c'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="中评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }else if(this.data.value2=='d'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="差评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }
      }else if(this.data.value1==1){
        this.setData({
          lister:this.data.jiaolian
        })
        if(this.data.value2=='a'){
        }else if(this.data.value2=='b'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="好评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }else if(this.data.value2=='c'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="中评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }else if(this.data.value2=='d'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="差评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }
      }else if(this.data.value1==2){
        this.setData({
          lister:this.data.kecheng
        })
        if(this.data.value2=='a'){
        }else if(this.data.value2=='b'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="好评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }else if(this.data.value2=='c'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="中评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }else if(this.data.value2=='d'){
          this.setData({
            chunfang:[]
          })
          for(var k=0;k<this.data.lister.length;k++){
            if(this.data.lister[k].level=="差评"){
              this.setData({
                chunfang:this.data.chunfang.concat(this.data.lister[k])
              })
            }   
           } 
          this.setData({
              lister:[].concat(this.data.chunfang)
          }) 
        }
      }
    }
  }
})
