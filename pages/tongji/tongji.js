// pages/tongji/tongji.js
var wxCharts = require('../../utils/wxcharts.js');

var pieChart = null;
var ringChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    date:'',
  },

  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },    

  updateData: function () {
    // ringChart.updateData({
    //   title: {
    //     name: '80%'
    //   },
    //   subtitle: {
    //     color: '#ff0000'
    //   }
    // });
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  

    this.drawring();
    var myDate = new Date()
    var formatday = myDate.getFullYear() + '年' +( myDate.getMonth() + 1) + '月';
    console.log(formatday)
    this.setData({date:formatday});
  },

  bindDateChange:function(e){

    console.log('picker发送选择改变，携带值为', e.detail.value)
    var str = e.detail.value
    var showdatestr =str.replace('-', '年') + '日'
    this.setData({
      date: showdatestr
    })

  },
  drawring:function(){

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    ringChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'ring',
      extra: {
        ringWidth: 55,
        pie: {
          offsetAngle: -45
        }
      },
      series: [{
        name: '成交量1',
        data: 15,
        stroke: false
      }, {
        name: '成交量2',
        data: 35,
        stroke: false
      }, {
        name: '成交量3',
        data: 78,
        stroke: false
      }, {
        name: '成交量4',
        data: 63,
        stroke: false
      }, {
        name: '成交量4',
        data: 63,
        stroke: false
      }, {
        name: '成交量4',
        data: 63,
        stroke: false
      }, {
        name: '成交量4',
        data: 63,
        stroke: false
      }],
      disablePieStroke: false,
      width: windowWidth,
      height: 250,
      dataLabel: true,
      legend: true,
      background: '#f5f5f5',
      padding: 0
    });
    ringChart.addEventListener('renderComplete', () => {
      console.log('renderComplete');
    });
    setTimeout(() => {
      ringChart.stopAnimation();
    }, 500);

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