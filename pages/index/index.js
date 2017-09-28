//index.js
//获取应用实例
const app = getApp()
var ExampleData = require('../../data/index')
var util = require('../../utils/util')

Page({
  data: { 
    userInfo: {},
    hasUserInfo: false,
    showbudge:false,
    budgevalue:5000,
    waterData:{},
    monthkey:'',
    scrollheight:200,
  },

  onLoad: function () {

    var monthkey = util.formatYYYYMM(new Date()); 
    this.data.monthkey = monthkey;
    this.setData({ scrollheight: app.globalData.screenHeight - 240});
  },

  onShow:function(e){
    var data = ExampleData.readData(this.data.monthkey);
    console.log(data)
    this.setData({ waterData: data }); 

  }, 

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  //去添加记账
  gotojizhang:function(){
   wx.navigateTo({
     url: '../jizhang/jizhang',
   })
  },

  //设置预算
  setbudgettap:function(){
    var show = false;
    this.setData({ showbudge: show });
  },

 //计算器界面
  gotojisuanqi:function(){
    wx.navigateTo({
      url: '../jisuanqi/jisuanqi',
    })
  },

  //统计界面
  gototongji:function(){
    wx.navigateTo({
      url: '../tongji/tongji',
    })
  },
  togglebudgetap:function(){
      var show = !this.data.showbudge;
      this.setData({showbudge:show});
  },
  inputconfirm:function(e){
     console.log(e.detail.value);
     var value = e.detail.value;
     this.setData({ budgevalue: value, showbudge:false });
  },
  inputbindblur:function(e){
    console.log(e.detail.value);
    var value = e.detail.value;
    this.setData({ budgevalue: value});
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
