// pages/contract/contract.js
const { fetchData } = require('../../lib/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  fetchContractList: function() {
    fetchData('customer').then(({ data }) => {
      if (data) {
        this.setData({
          customerList: data.list
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchContractList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.fetchContractList();
  },
  // 点击查看客户详情
  contractTap: function(event) {
    const { cid } = event.currentTarget.dataset;
    if (cid) {
      wx.navigateTo({
        url: '/pages/customer/detail/customer-detail?id=' + cid,
      });
    }
  },
  // 查询联系人
  onSearchEvent: function(event) {
    const { data } = event.detail;
    this.setData({
      customerList: data
    })
  }
})