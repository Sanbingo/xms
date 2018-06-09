const config = require('../config.js')
const util = require('../utils/util.js')
const prefix = 'weapp'

const fetchData = (url, cfg) => {
  let {
    data = {},
    contentType = "application/json",
    method = "GET",
  } = { ...cfg };
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.service.host}/${prefix}/${url}`,
      method,
      data,
      header: {
        'content-type': contentType,
      },
      success: ({data}) => {
        resolve(data);
        },
      fail: ({data}) => {
        console.log('request fail', data);
        reject(data);
        }
    });
  });
}
module.exports = {
  fetchData
}