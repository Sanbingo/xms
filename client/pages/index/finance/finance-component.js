// pages/index/finance/finance-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {
          this.setData({
            item: {...newVal}
          })
      }
    },
    dataIndex: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    range: ['存款', '理财', '保险', '基金', '其它'],
    defaultSel: 1,
    item: {
    }
  },

  ready: function() {
    this.setData({
      item: {
        ...this.data.data,
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    twoWayBind: function(name, value) {
      this.setData({
        item: {
          ...this.data.item,
          [name]: value
        },
      }, () => {
        this.triggerEvent('myevent', {
          index: this.dataset.index,
          value: this.data.item
        });
      });
    },
    bindTypeChange: function(e) {
      this.twoWayBind('type', this.data.range[e.detail.value]);
    },
    bindInputMoneyChange: function (e) {
      this.twoWayBind('money', e.detail.value)
    },
    bindInputCardNoChange: function (e) {
      this.twoWayBind('cardNo', e.detail.value)
    },
    bindStartDateChange: function (e) {
      this.twoWayBind('startdate', e.detail.value);
    },
    bindEndDateChange: function (e) {
      this.twoWayBind('enddate', e.detail.value);
    },
    bindInputRemarkChange: function (e) {
      this.twoWayBind('remark', e.detail.value);
    },
  }
})
