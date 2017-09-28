// pages/jisuanqi/jisuanqi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numbers:['AC','%','/','1','2','3','4','5','6','7','8','9','.','0','BACK'],
    oprations:['x','-','+'],
    opliststr:'',
    result:0,
    op1:0,
    op2:0, 
    op:'',
    ispressequal:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { 
  },

  //按钮点击
  handleTap:function(e){
    console.log(e.currentTarget.dataset.item);
    var input = e.currentTarget.dataset.item;
    var str = this.data.opliststr + input;
    this.handleopnumber(input)   
  },


  handleopnumber:function(e){

      var result = this.data.result;
      var op1 = this.data.op1;
      var op2 = this.data.op2;
      var opliststr = this.data.opliststr;
      var lastchar = opliststr.substr(opliststr.length-1,1)      
      switch(e){
        case 'AC': 
          opliststr = '';
          result = 0;   
          op1 = 0;
          op2 = 0;
          this.data.op='';       
          break;          
        case '%':
        case '/': 
        case 'x':
        case '+':
        case '-': 
          if (this.isopsymbol(lastchar)) {
            opliststr = opliststr.substr(0, opliststr.length - 1) + e;
          } else {
            opliststr = opliststr + e;
          }
          this.data.op = e;
          this.data.ispressequal = true; 
        break;
        case '=':  
           this.data.ispressequal = false; 
           result = this.getresult(e);  
           opliststr = result + '';    
           op1 = result;
           op2 = 0;    
           break;
        case 'BACK':
          opliststr = opliststr.substr(0, opliststr.length - 1)           
          op2 = op2 / 10; 
          break;
        default:
          /*如何获取两个操作数 */
          opliststr = opliststr + e; 
          if(!this.data.ispressequal){
            op1 = op1   + e; 
            console.log('op1:',op1);
          }else{
            op2 = op2   + e; 
            console.log('op2:', op2);
          } 
          break;
      } 
      this.setData({result: result, op1: op1, op2: op2, opliststr: opliststr})
  },

  // requalTap:function(e){
  //   var op2 = this.data.result + this.data.op1;  
  //   this.setData({result:op2})
  // },

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
  
  },

  getresult: function (opration) {

    var op1 = parseFloat(this.data.op1);
    var op2 = parseFloat(this.data.op2);
    var result = 0;
    console.log('op1:',op1, '  ',this.data.op, '---> op2:',op2);
    switch (this.data.op) {
      case 'AC': 
        result = 0;
        break;
      case '%': 
        result = op1 % op2;
        break;
      case '/':
        result = op1 / op2;
        break;
      case '+':
        result = op1 + op2;
        break;
      case '-':
        result = op1 - op2;
        break;
      case 'x':
        result = op1 * op2;
        break;
      case '=':
        result = this.data.result;
        break;
      case 'BACK':
        break;
      default:
        break;
    }
    this.setData({ op: opration });
    return result;
  },

  isopsymbol: function (e) {

    if(e == undefined){
      return false;
    }
    var istrue = true;
    switch (e) {
      case 'AC':
        break;
      case '%':
        break;
      case '/':
        break;
      case '+':
        break;
      case '-':
        break;
      case 'x':
        break;
      case '=':
        break;
      case 'BACK':
        break;
      default:
        istrue = false;
        break;
    }
    return istrue;
  },

})