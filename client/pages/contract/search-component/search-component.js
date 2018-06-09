// pages/contract/search-component/search-component.js
const { fetchData } = require('../../../lib/index.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    add_new_customer: function(e) {
      wx.navigateTo({
        url: '/pages/index/index',
      });
    },
    fetchContractList: function(value) {
      fetchData('customer/search', {
        method: 'POST',
        data: {
          value,
        }
      }).then(res => {
        this.triggerEvent('searchEvent', res);
      });
    },
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
      this.fetchContractList('');
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
      this.fetchContractList('');
    },
    inputTyping: function (e) {
      const value = e.detail.value
      this.setData({
        inputVal: value
      });
      this.fetchContractList(value);
    }
  }
})
