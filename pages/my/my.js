// pages/mypage/mypage.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        UserLogin : false,
        userInfo: null,
        Adminstator: false,
        // 点击次数记录
        TapAccount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var UserLogin = app.globalData.UserLogin;
        if(!UserLogin){
          wx.navigateTo({
            url: '../login/login',
          })
        }else{
            let userInfo = app.globalData.userInfo;
            this.setData({
                userInfo: userInfo,
                UserLogin : true
            })
        }
    },

    // 跳转函数
    Navigate: function (e) {
      let url = e.currentTarget.dataset.url
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `${url}?id=${id}`,
      })
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