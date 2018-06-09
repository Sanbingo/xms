// pages/owner/owner.js
const echarts = require('../../ec-canvas/echarts.js');
const { fetchData } = require('../../lib/index.js');
const { isArray } = require('../../utils/util.js');

const financeTypeConst = ['存款', '理财', '基金', '保险', '其它'];
function setOptionData(data) {
  var option = {
    title: {
      text: 'XXX银行理财占比',
      subtext: '纯属虚构',
      x: 'center'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: financeTypeConst
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '75%',
        center: ['50%', '60%'],
        label: {
          normal: {
            position: 'inner',
            formatter: "{b}({d}%)"
          }
        },
        data,
      }
    ]
  };
  return option;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    tabs: ['本周', '本月', '本年'],
    activeIndex: 0,
  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id,
    });
    this.fetchDataFunc(e.currentTarget.id);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    // 获取组件
    
    // this.init();
    this.fetchDataFunc(this.data.activeIndex);
  },
  fetchDataFunc: function(index) {
    fetchData('finance/occupy/query', {
      method: 'POST',
      data: { rangeType: index }
    }).then(res => {
      const data = financeTypeConst.map(name => {
        let value = 0;
        if (isArray(res.data)) {
          value = res.data.reduce((a, b) => {
            if (b.type === name) {
              return a + parseFloat(b.money)
            }
            return a;
          }, 0);
        }
        return ({
          value,
          name
        })
      });
      this.chart.setOption(setOptionData(data))
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.chart) {
      this.chart.dispose();
    }
  },

  init: function () {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },


})