// pages/customer/tab-item/tab-item-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      observer: function(newVal, oldVal) {
        const bool = wx.getStorageSync(`${newVal.datetime}-${newVal.cid}`)
        newVal.ifDone = bool || false;
        // 获取缓存数据
        this.setData({
          item: newVal
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  ready: function() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    callPhone: function(event) {
      const { telephone } = event.currentTarget.dataset;
      if (telephone) {
        wx.makePhoneCall({
          phoneNumber: telephone
        })
      }
    },
    makeFlag: function(event) {
      const { cid, datetime } = event.currentTarget.dataset;
      // 根据日期和客户ID获取缓存数据
      const bool = wx.getStorageSync(`${datetime}-${cid}`)
      if (bool) {
        wx.setStorageSync(`${datetime}-${cid}`, false);
      } else {
        wx.setStorageSync(`${datetime}-${cid}`, true);
      }
      // 同步列表
      this.setData({
        item: {
          ...this.data.item,
          ifDone: !bool
        }
      });
    }
  }
})
