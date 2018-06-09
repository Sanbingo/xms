// pages/customer/detail/customer-detail.js
var utils = require('../../../utils/util.js');
const { fetchData } = require('../../../lib/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id;
    this.setData({
      cid: id,
    });
    this.fetchAll(id);
  },
  fetchAll: function(id) {
    fetchData('customer/' + id).then(res => {
      this.setData({
        ...res.data
      });
    })
    fetchData('customer/' + id + '/finance').then(res => {
      this.setData({
        financeInfo: res.data || []
      });
    })
  },
  // 点击卡片 -> 编辑 -> 保存
  onCardTap: function (event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../form/form-modal?id=' +id,
    });
  },
  onAddNewTap: function (event) {
    console.log('cid: ', this.data.cid);
    wx.navigateTo({
      url: '../form/form-modal?mode=add&cid='+this.data.cid,
    });
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
    this.fetchAll(this.data.cid);
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