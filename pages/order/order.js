// pages/order/order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //点位数
    orderNumber : 0,
    //检测因子价格管理数据
    detectionFactionList : [],

    //检测类型相关数据
    monitorTmplIdList : ['0'],
    monitorTmplValueList : ['请选择检测类型'],
    monitorTmplIndex : 0,

    //测试名称相关数据
    testIdList : ['0'],
    testValueList : ['请选择测试'],
    testIndex : 0,

    //方法名称相关数据
    methodIdList : ['0'],
    methodValueList : ['请选择方法'],
    methodIndex : 0,

    //分析项组相关数据
    itemGroupIdList : ['0'],
    itemGroupValueList : ['请选择分析项组'],
    itemGroupIndex : 0,

    //送样日期
    sendDate : '请输入送样日期',
    //送样时间
    sendTime : '请输入送样时间',
    //采样完成日期
    sampleCompleteDate : '请输入采样完成日期',
    //采样完成时间
    sampleCompleteTime : '请输入采样完成时间',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var orderList = app.globalData.orderList;
    var orderNumber = options.orderNumber;
    var monitorTmplIdList = JSON.parse(options.monitorTmplIdList);
    var monitorTmplValueList = JSON.parse(options.monitorTmplValueList);
    var monitorTmplIndex = 0;
    var detectionFactionList = JSON.parse(options.detectionFactionList);
    var testIdList = this.data.testIdList;
    var testValueList = this.data.testValueList;
    var testIndex = 0;
    var methodIdList = this.data.methodIdList;
    var methodValueList = this.data.methodValueList;
    var methodIndex = 0;
    var itemGroupIdList = this.data.itemGroupIdList;
    var itemGroupValueList = this.data.itemGroupValueList;
    var itemGroupIndex = 0;
    if(orderList[orderNumber].monitorTmplId != ''){
      for(var i = 0 ; i < monitorTmplIdList.length ; i++){
        if(orderList[orderNumber].monitorTmplId == monitorTmplIdList[i]){
          monitorTmplIndex = i;
        }
      }
      for(var i = 0 ; i < detectionFactionList.length ; i++){
        if(detectionFactionList[i].ext$.monitortmplid.indexOf(orderList[orderNumber].monitorTmplId) > -1){
          var testType = true;
          for(var j = 0 ; j < testIdList.length ; j++){
            if(testIdList[j] == detectionFactionList[i].testId){
              testType = false;
              break;
            }
          }
          //装载测试名称数据
          if(testType){
            testIdList[testIdList.length] = detectionFactionList[i].testId;
            testValueList[testValueList.length] = detectionFactionList[i].testName;
          }
          if(orderList[orderNumber].testId != '' && orderList[orderNumber].testId == detectionFactionList[i].testId){
            var methodType = true;
            for(var j = 0 ; j < methodIdList.length ; j++){
              if(methodIdList[j] == detectionFactionList[i].methodId){
                methodType = false;
                break;
              }
            }
            //装载方法名称数据
            if(methodType){
              methodIdList[methodIdList.length] = detectionFactionList[i].methodId;
              methodValueList[methodValueList.length] = detectionFactionList[i].methodName;
            }
            if(orderList[orderNumber].methodId != '' && orderList[orderNumber].methodId == detectionFactionList[i].methodId){
              var itemGroupType = true;
              for(var j = 0 ; j < itemGroupIdList.length ; j++){
                if(itemGroupIdList[j] == detectionFactionList[i].itemGroupId){
                  itemGroupType = false;
                  break;
                }
              }
              //装载分析项组数据
              if(itemGroupType){
                itemGroupIdList[itemGroupIdList.length] = detectionFactionList[i].itemGroupId;
                itemGroupValueList[itemGroupValueList.length] = detectionFactionList[i].itemGroupName
              }
            }
          }
        }
      }
    }

    for(var j = 0 ; j < testIdList.length ; j++){
      if(orderList[orderNumber].testId != '' && orderList[orderNumber].testId == testIdList[j]){
        testIndex = j;
      }
    }
    for(var j = 0 ; j < methodIdList.length ; j++){
      if(orderList[orderNumber].methodId != '' && orderList[orderNumber].methodId == methodIdList[j]){
        methodIndex = j;
      }
    }
    for(var j = 0 ; j < itemGroupIdList.length ; j++){
      if(orderList[orderNumber].itemGroupId != '' && orderList[orderNumber].itemGroupId == itemGroupIdList[j]){
        itemGroupIndex = j;
      }
    }

    this.setData({
      orderNumber : orderNumber,
      detectionFactionList : detectionFactionList,
      monitorTmplIndex : monitorTmplIndex,
      monitorTmplIdList : monitorTmplIdList,
      monitorTmplValueList : monitorTmplValueList,
      testIdList : testIdList,
      testValueList : testValueList,
      testIndex : testIndex,
      methodIdList : methodIdList,
      methodValueList : methodValueList,
      methodIndex : methodIndex,
      itemGroupIdList : itemGroupIdList,
      itemGroupValueList : itemGroupValueList,
      itemGroupIndex : itemGroupIndex,
      sendDate : orderList[orderNumber].sendDate != '' ? orderList[orderNumber].sendDate : '请输入送样日期',
      sendTime : orderList[orderNumber].sendTime != '' ? orderList[orderNumber].sendTime : '请输入送样时间',
      sampleCompleteDate : orderList[orderNumber].sampleCompleteDate != '' ? orderList[orderNumber].sampleCompleteDate : '请输入采样完成日期',
      sampleCompleteTime : orderList[orderNumber].sampleCompleteTime != '' ? orderList[orderNumber].sampleCompleteTime : '请输入采样完成时间'
    });
  },
  
  //检测类型点击下拉显示框
  monitorTmplSelectTap() {
    this.setData({
      monitorTmplSelectShow: !this.data.monitorTmplSelectShow,
      testSelectShow : false,
      methodSelectShow : false,
      itemGroupSelectShow : false
    });
  },
    
  //检测类型点击下拉列表
  monitorTmplDataSet(e) {
    var monitorTmplIndex = e.detail.value;
    var monitorTmplIdList = this.data.monitorTmplIdList;
    var detectionFactionList = this.data.detectionFactionList;
    var testIdList = this.data.testIdList;
    var testValueList = this.data.testValueList;
    for(var i = 0 ; i < detectionFactionList.length ; i++){
      if(detectionFactionList[i].ext$.monitortmplid.indexOf(monitorTmplIdList[monitorTmplIndex]) > -1){
        var type = true;
        for(var j = 0 ; j < testIdList.length ; j++){
          if(testIdList[j] == detectionFactionList[i].testId){
            type = false;
            break;
          }
        }
        if(type){
          testIdList[testIdList.length] = detectionFactionList[i].testId;
          testValueList[testValueList.length] = detectionFactionList[i].testName;
        }
      }
    }
    this.setData({
      testIdList : testIdList,
      testValueList : testValueList,
      monitorTmplIndex : monitorTmplIndex,
    });
  },
  
  //测试名称点击下拉列表
  testDataSet(e) {
    var testIndex = e.detail.value;
    var testIdList = this.data.testIdList;
    var detectionFactionList = this.data.detectionFactionList;
    var monitorTmplId = this.data.monitorTmplIdList[this.data.monitorTmplIndex];
    var methodIdList = this.data.methodIdList;
    var methodValueList = this.data.methodValueList;
    for(var i = 0 ; i < detectionFactionList.length ; i++){
      if(detectionFactionList[i].ext$.monitortmplid.indexOf(monitorTmplId) > -1 && testIdList[testIndex] == detectionFactionList[i].testId){
        var type = true;
        for(var j = 0 ; j < methodIdList.length ; j++){
          if(methodIdList[j] == detectionFactionList[i].methodId){
            type = false;
            break;
          }
        }
        if(type){
          methodIdList[methodIdList.length] = detectionFactionList[i].methodId;
          methodValueList[methodValueList.length] = detectionFactionList[i].methodName;
        }
      }
    }
    this.setData({
      methodIdList : methodIdList,
      methodValueList : methodValueList,
      testIndex : testIndex,
    });
  },
    
  //方法名称点击下拉列表
  methodDataSet(e) {
    var methodIndex = e.detail.value;
    var methodIdList = this.data.methodIdList;
    var detectionFactionList = this.data.detectionFactionList;
    var testId = this.data.testIdList[this.data.testIndex];
    var monitorTmplId = this.data.monitorTmplIdList[this.data.monitorTmplIndex];
    var itemGroupIdList = this.data.itemGroupIdList;
    var itemGroupValueList = this.data.itemGroupValueList;
    for(var i = 0 ; i < detectionFactionList.length ; i++){
      if(detectionFactionList[i].ext$.monitortmplid.indexOf(monitorTmplId) > -1 && testId == detectionFactionList[i].testId && methodIdList[methodIndex] == detectionFactionList[i].methodId){
        var type = true;
        for(var j = 0 ; j < itemGroupIdList.length ; j++){
          if(itemGroupIdList[j] == detectionFactionList[i].itemGroupId){
            type = false;
            break;
          }
        }
        if(type){
          itemGroupIdList[itemGroupIdList.length] = detectionFactionList[i].itemGroupId;
          itemGroupValueList[itemGroupValueList.length] = detectionFactionList[i].itemGroupName
        }
      }
    }
    this.setData({
      itemGroupIdList : itemGroupIdList,
      itemGroupValueList : itemGroupValueList,
      methodIndex : methodIndex,
    });
  },

  //分析项组点击下拉列表
  itemGroupDataSet(e) {
    this.setData({
      itemGroupIndex : e.detail.value,
    });
  },
  
  //送样日期
  sendDate(e){
    this.setData({
      sendDate : e.detail.value
    });
  },

  //送样时间
  sendTime(e){
    this.setData({
      sendTime : e.detail.value
    });
  },

  //采样完成日期
  sampleCompleteDate(e){
    this.setData({
      sampleCompleteDate : e.detail.value
    });
  },

  //采样完成时间
  sampleCompleteTime(e){
    this.setData({
      sampleCompleteTime : e.detail.value
    });
  },

  //保存数据并返回前一页面
  submit(){
    var dataType = false;
    if(this.data.monitorTmplIndex == 0){
      dataType = true;
    }
    if(this.data.testIndex == 0){
      dataType = true;
    }
    if(this.data.methodIndex == 0){
      dataType = true;
    }
    if(this.data.itemGroupIndex == 0){
      dataType = true;
    }
    if(this.data.sendDate == ''){
      dataType = true;
    }
    if(this.data.sendTime == ''){
      dataType = true;
    }
    if(this.data.sampleCompleteDate == ''){
      dataType = true;
    }
    if(this.data.sampleCompleteTime == ''){
      dataType = true;
    }
    if(dataType){
      wx.showToast({
        title: '请完善点位信息',
        icon: 'none',
        duration: 1500
      });
    }else{
      var orderList = app.globalData.orderList;
      orderList[this.data.orderNumber].monitorTmplId = this.data.monitorTmplIdList[this.data.monitorTmplIndex];
      orderList[this.data.orderNumber].testId = this.data.testIdList[this.data.testIndex];
      orderList[this.data.orderNumber].methodId = this.data.methodIdList[this.data.methodIndex];
      orderList[this.data.orderNumber].itemGroupId = this.data.itemGroupIdList[this.data.itemGroupIndex];
      orderList[this.data.orderNumber].sendDate = this.data.sendDate;
      orderList[this.data.orderNumber].sendTime = this.data.sendTime;
      orderList[this.data.orderNumber].sampleCompleteDate = this.data.sampleCompleteDate;
      orderList[this.data.orderNumber].sampleCompleteTime = this.data.sampleCompleteTime;
      app.globalData.orderList = orderList;
      wx.navigateBack();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})