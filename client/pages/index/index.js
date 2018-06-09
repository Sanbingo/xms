// var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    personalInfo: {
    },
    financeProducts: [],
    initProducts: {
      cardNo: '',
      type: '理财',
      money: '',
      startdate: '',
      enddate: '',
      remark: ''
    },
  },
  formSubmit: function (e) {
    // console.log("submit", this.data);
    const { personalInfo = {}, financeProducts = [] } = this.data;
    // 检测理财信息是否填写，如果没有填写则保存
    const that = this;
    wx.request({
      method: 'POST',
      url: `${config.service.host}/weapp/customer/add`,
      data: this.data,
      success(result) {
        util.showSuccess('创建成功!');
        that.setData({
          personalInfo: {},
          financeProducts: []
        }, () => {
          console.log('after success', that.data)
        })
      },
    })
  },

  // 个人信息双向数据绑定
  onPersonalEvent: function (e) {
    this.setData({
      personalInfo: {
        ...this.data.personalInfo,
        ...e.detail
      },
    });
  },
  // 理财信息双向数据绑定
  onFinanceEvent: function (e, index) {
    var index = e.detail.index;
    var value = e.detail.value;
    const data = this.data.financeProducts;
    data[index] = value;
    this.setData({
      financeProducts: data,
    });
  },
  // 新建理财信息
  addFinance: function () {
    this.setData({
      financeProducts: [...this.data.financeProducts, this.data.initProducts]
    }, () => {
      console.log('fp', this.data.financeProducts);
    });
  },
  // 删除理财信息
  deleteCurFinanceItem: function (e) {
    debugger;
    const { index } = e.currentTarget.dataset;
    this.data.financeProducts.splice(index, 1);
    this.setData({
      financeProducts: this.data.financeProducts,
    }, () => {
      console.log('del data', this.data.financeProducts);
    });
  }
});
