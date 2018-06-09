// pages/customer/form/form-modal.js
const { fetchData } = require('../../../lib/index.js');
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onLoad: function(options) {
    const { id, cid, mode } = options;
    // 根据理财ID获取详情
    fetchData('finance/'+ id).then(res => {
      this.setData({
        financeInfo: res.data,
        mode,
        cid,
      });
    })
  },
  onFinanceEvent: function (e, index) {
    var value = e.detail.value;
    this.setData({
      financeInfo: value,
    });
  },
  // 保存
  saveTap: function() {
    const { id } = this.data.financeInfo;
    fetchData('finance/'+id, {
      method: 'POST',
      data: this.data.financeInfo || {}
    }).then(res => {
      util.showSuccess('保存成功!');
      wx.navigateBack({})
    })
  },
  // 新建
  confirmTap: function() {
    const { cid } = this.data;
    fetchData('customer/'+cid+'/finance', {
      method: 'POST',
      data: {
        ...this.data.financeInfo,
        cid
      }
    }).then(res => {
      console.log('ddddd')
      util.showSuccess('创建成功!');
      wx.navigateBack({})
    });
  }
})