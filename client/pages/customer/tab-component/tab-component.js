// pages/customer/tab/tab-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab: {
      type: Array,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready: function () {
    this.setData({
      customerList: this.data.tab || []
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTabItemTap: function(event) {
      const { cid } = event.currentTarget.dataset;
      wx.navigateTo({
        url: '/pages/customer/detail/customer-detail?id=' + cid,
      });
    }
  }
})
