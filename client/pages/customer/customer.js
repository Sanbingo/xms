// pages/customer/customer.js
const { fetchData } = require('../../lib/index.js');
const sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

const dayMap = {
  0: 0,
  1: 2,
  2: 7
}

Page({
  data: {
    tabs: ["今天", "后2天", "后7天"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    this.getCustomerData();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  onShow: function () {
    this.getCustomerData();
  },
  tabClick: function (e) {
    const { id } = e.currentTarget;
    // 0：今天，1：明后天，2：一个礼拜后
    this.getCustomerData(id);
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
  },
  onCustomerTap: function (event) {
    var customerId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/customer-detail?id=' + customerId,
    });
  },
  getCustomerData: function(index){
    fetchData('notice', {
      method: 'POST',
      data: {
        deadline: dayMap[index || this.data.activeIndex]
      }
    }).then(res => {
      if (res.code === 0) {
        this.setData({
          customerList: res.data
        });
      }
    });
  }
});