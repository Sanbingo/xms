// pages/index/personal/personal-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function(newVal, oldVal) {
        this.setData({
          item: newVal,
        })
      }
    }
  },
  
  ready: function () {
    this.setData({
      item: this.data.data,
    }, () => {
      // console.log('sssss', this.data.item)
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    item: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    twoWaybind: function(name, value) {
      this.setData({
        item: {
          ...this.data.item,
          [name]: value
        }
      });
    },
    bindInputNameChange: function(e) {
      this.twoWaybind('name', e.detail.value);
      this.triggerEvent('myevent', {'name': e.detail.value})
    },
    bindInputTelephoneChange: function (e) {
      this.twoWaybind('telephone', e.detail.value);
      this.triggerEvent('myevent', { 'telephone': e.detail.value })
    },
    bindInputAddressChange: function (e) {
      this.twoWaybind('address', e.detail.value);
      this.triggerEvent('myevent', { 'address': e.detail.value })
    }, 
    bindInputIdNumberChange: function (e) {
      this.twoWaybind('idNumber', e.detail.value);
      this.triggerEvent('myevent', { 'idNumber': e.detail.value })
    },
    bindBirthdayChange: function (e) {
      this.twoWaybind('birthday', e.detail.value);
      this.triggerEvent('myevent', { 'birthday': e.detail.value })
    },
    bindInputRemarkChange: function (e) {
      this.twoWaybind('remark', e.detail.value);
      this.triggerEvent('myevent', { 'remark': e.detail.value })
    },
  }
})
