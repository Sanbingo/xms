// pages/contract/contract-tiem/contract-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    dataIndex: {
      type: Number,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  created: function() {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    phoneTap (event) {
      const { phone } = event.target.dataset;
      if (phone) {
        wx.makePhoneCall({
          phoneNumber: phone 
        })
      }
      
    }
  }
})
