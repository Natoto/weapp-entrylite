// pages/jizhang/jizhang.js 

var common = require('../../data/index.js');
var util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    entryIcons:[],
    expendIcons:[],
    cardwidth:50,
    selectItem: {id: 'canyin', type: 10, name: '餐饮', image: '../../resource/canyin.png'},
    iscreate:true,
    date:"",
    monthkey:"",
    moneyaccount:0.0,
    remark:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
      // var entryjson = Entry.incomeTypes;
      // console.log(entryjson);
      common.sayHello('MINA')
      console.log(common.incomeTypes);
      this.setData({entryIcons:common.incomeTypes,
                  expendIcons:common.expendTypes,
      });
      try {
        var res = wx.getSystemInfoSync() 
        console.log(res.windowWidth) 
        let width = res.windowWidth/5;
        this.setData({cardwidth:width})
      } catch (e) {
        // Do something when catch error
      }
      var date = util.formatYYYYMMDD(new Date())
      
      this.setData({date:date})      
      console.log(util.formatYYYYMMDD(new Date()));
  },

  bindDateChange:function(e){

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //完成按钮点击
  handleDoneTap:function(e){
      console.log('完成点击')

      var addobj = {};
      var mincome = 0;
      var moutcome = 0;
      var daykey = this.data.date;
      var monthkey = daykey.substr(0,7);//2017-09
      var monthObject = wx.getStorageSync(monthkey)
      if(!monthObject){
        monthObject = {"month":monthkey,
        "income":0.0,
        "outcome":0.0,
        "days":[]};
      }
      mincome = monthObject.income;
      moutcome = monthObject.outcome;

      var ItemObject;
      var dayObject = {
            "day": daykey,
            "income":0,
            "outcome": 0,
            "list":[],
        };
      //是否存在这一天 
      var index; 
      var isfind = false;
      //当天是否存在记录
      for(index = 0; index<monthObject.days.length; index++)
      {
          var obj = monthObject.days[index];
          if(obj.day === daykey){            
              dayObject = obj;
            isfind = true;
          }
      }

      var dayincome = dayObject.income;
      var dayoutcome = dayObject.outcome;

      if (this.data.iscreate == true){        
        ItemObject = 
        {
          "date":this.data.date,
          "type":this.data.selectItem.type,
          "name":this.data.selectItem.name,
          "typeimg":this.data.selectItem.image,
          "remark":this.data.remark,
          "account": this.data.moneyaccount,
        }
        var money = parseFloat(this.data.moneyaccount);
        if(this.data.selectItem.type<10){//收入
          dayincome = parseFloat(dayincome) + money;
          mincome = parseFloat(mincome) + money;
        }
        else{
          dayoutcome = dayoutcome - money;
          moutcome = moutcome - money;
        }    
        dayObject.list.push(ItemObject);
      }
      var daylist = dayObject.list;
      dayObject = {
        "day":daykey,
        "income": parseFloat(dayincome),
        "outcome": parseFloat(dayoutcome),
        "list": daylist
      }
      if (isfind == false) {
        monthObject.days.push(dayObject);
      }
      monthObject.income = mincome;
      monthObject.outcome = moutcome;

      console.log(monthObject);

      wx.setStorageSync(monthkey, monthObject)
      
      wx.showToast({
        title: '记账成功',
        icon: 'success',
        duration: 2000
      })      
  },

  //再记一笔按钮点击
  handleAgainTap: function (e) {

  },

  //输入金额区域
  bindmoneyinput:function(e){
    console.log(e.detail.value)
    this.setData({moneyaccount : e.detail.value});
  },
  //输入备注区域
  bindremarkinput: function (e) {
    console.log(e.detail.value)
    this.data.remark = e.detail.value;
  },

 bindItemSelected:function(e){
  console.log(e.currentTarget.dataset.item);
  var item = e.currentTarget.dataset.item;
  this.setData({ selectItem:item})
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})