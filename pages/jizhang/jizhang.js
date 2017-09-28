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
    selectItem: {recordid:0,id: 'canyin', type: 10, name: '餐饮', image: 'canyin.png'},
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
                  iscreate: options.iscreate == undefined?1:0,
      });
      try {
        var res = wx.getSystemInfoSync() 
        console.log(res.windowWidth) 
        let width = res.windowWidth/5;
        this.setData({cardwidth:width})
      } catch (e) {
        // Do something when catch error
      }
      if(this.data.iscreate == 1){
        var date = util.formatYYYYMMDD(new Date())
        this.setData({ date: date })
        console.log(util.formatYYYYMMDD(new Date()));
      }
      else{
        //更新本地data
        var item = common.TempData.IndexSelectItem;
        this.setData({
          date: item.date,
          monthkey: item.date.substr(0,7),
          moneyaccount: item.account,
          remark: item.remark,
          selectItem: { recordid: item.recordid, id: item.id, type: item.type, name: item.name, image: item.typeimg }
        })
      }
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
      this.insertARecord();
      wx.showToast({
        title: '记账成功',
        icon: 'success',
        duration: 2000, complete: function (res) {
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1,
            })
          },1000)
         
        }          
      })      
  },

  
  //再记一笔按钮点击
  handleAgainTap: function (e) {
    console.log('完成点击')
    this.insertARecord();
    var that = this;
    wx.showToast({
      title: '记账成功',
      icon: 'success',
      duration: 2000,
      complete: function(res){
        that.setData({
          moneyaccount:0,
          remark:''
        });
      }
    })   
  },

  //删除按钮
  handleDeleteTap:function(e){

   var deleteblock =()=>{
     var daykey = this.data.date;
     var monthkey = daykey.substr(0, 7);//2017-09
     var monthObject = wx.getStorageSync(monthkey)
     var dayObject = null;
     var deleteIndex = 0;
     var ItemObject = null;
     
     for (let day of monthObject.days) {
       var j = 0;
       for (let item of day.list) {
         if (item.recordid == this.data.selectItem.recordid) {
           deleteIndex = j;
           dayObject = day;
           console.log('找到了该记录！', item);
           ItemObject = item;
         }
         j = j + 1;
       }
     }
     if (dayObject && ItemObject) {
       if (dayObject.type > 10) {
         dayObject.income = dayObject.income - ItemObject.income;
         monthObject.income = monthObject.income - ItemObject.income; } 
       else{ 
         dayObject.outcome = dayObject.outcome - ItemObject.outcome;
         monthObject.outcome = monthObject.outcome - ItemObject.outcome; 
       }
      //  dayObject.list.remove(ItemObject);
       dayObject.list.splice(deleteIndex, 1);
       wx.setStorageSync(monthkey, monthObject)
     }
   };


    wx.showModal({
      title: '提示',
      content: '是否删除该记录',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          deleteblock();
          wx.navigateBack({
            delta: 1,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

   
  },
  //插入或修改一条记录
  insertARecord:function(e){

      var addobj = {};
      var mincome = 0;
      var moutcome = 0;
      var daykey = this.data.date;
      var monthkey = daykey.substr(0, 7);//2017-09
      var monthObject = wx.getStorageSync(monthkey)
      if (!monthObject) {
        monthObject = {
          "month": monthkey,
          "income": 0.0,
          "outcome": 0.0,
          "days": []
        };
      }
      mincome = monthObject.income;
      moutcome = monthObject.outcome;

      var ItemObject;
      var dayObject = {
        "day": daykey,
        "income": 0,
        "outcome": 0,
        "list": [],
      };
      //是否存在这一天 
      var index;
      var isfind = false;
      //当天是否存在记录
      for (index = 0; index < monthObject.days.length; index++) {
        var obj = monthObject.days[index];
        if (obj.day === daykey) {
          dayObject = obj;
          isfind = true;
        }
      }     
      var dayincome = dayObject.income;
      var dayoutcome = dayObject.outcome;
      if (this.data.iscreate == true) {

        ItemObject =
          {
           "recordid": Math.random().toString(12).substr(2),
            "date": this.data.date,
            "type": this.data.selectItem.type,
            "name": this.data.selectItem.name,
            "typeimg": this.data.selectItem.image,
            "remark": this.data.remark,
            "account": this.data.moneyaccount,
          }
        var money = parseFloat(this.data.moneyaccount);
        if (this.data.selectItem.type < 10) {//收入
          dayincome = parseFloat(dayincome) + money;
          mincome = parseFloat(mincome) + money;
        }
        else {
          dayoutcome = dayoutcome - money;
          moutcome = moutcome - money;
        }
        dayObject.list.push(ItemObject);
      }
      else{
        //根据recordid查找到该记录
        for (let day of monthObject.days) {
          for (let item of day.list) {
            if (item.recordid == this.data.selectItem.recordid) {
              ItemObject = item;
              console.log('找到了该记录！', item);
            }
          }
        }
        var money = parseFloat(this.data.moneyaccount);
        if (this.data.selectItem.type < 10) {//收入
          dayincome = parseFloat(dayincome) + money - ItemObject.account;
          mincome = parseFloat(mincome) + money - ItemObject.account;
          ItemObject.account = money;
        }
        else {
          dayoutcome = dayoutcome - money + ItemObject.account;
          moutcome = moutcome - money + ItemObject.account;          
          ItemObject.account = money;
         } 
        ItemObject.remark = this.data.remark;
      }
      dayObject.income = dayincome;
      dayObject.outcome = dayoutcome;

      var daylist = dayObject.list;
      if (isfind == false) {
        monthObject.days.push(dayObject);
      }
      monthObject.income = mincome;
      monthObject.outcome = moutcome;
      console.log(monthObject);
      wx.setStorageSync(monthkey, monthObject);
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