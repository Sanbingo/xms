const { mysql } = require('../qcloud.js');
const moment = require('moment');
const { omit } = require('lodash');

// 根据理财ID获取详情
async function getFinanceInfoById(ctx) {
  const { id } = ctx.params;
  const res = await mysql('xms_finance_info').where({ id }).first();
  ctx.state.data = res;
}

// 根据财务ID更新详情
async function updateFinancdInfoById(ctx) {
  const { id } = ctx.params;
  // 根据ID更新，记得不能把ID带入进去，否则数据库会锁住，SQL执行不成功。
  const updateData = omit(ctx.request.body, 'id')
  await mysql('xms_finance_info').update(updateData).where({ id })
}

// 根据选择范围统计理财占比
async function calculateFinanceTypeRate(ctx) {
  // 0: 本周、1: 本月、2:本年
  const { rangeType } = ctx.request.body;
  let startDate;
  let endDate;
  let result;
  if (rangeType == 0) {
    const weekOfday = moment().format('E');//计算今天是这周第几天  
    startDate = moment().subtract(weekOfday - 1, 'days').format('YYYY-MM-DD');//本周一日期  
    endDate = moment(startDate).add(6, 'days').format('YYYY-MM-DD');//本周日日期  
    result = await mysql('xms_finance_info').where('startdate', '>=', startDate).andWhere('startdate', '<=', endDate);

  } else if (rangeType == 1) {
    const year = moment().format('YYYY');//计算年份
    const month = moment().format('MM');//计算月份
    result = await mysql('xms_finance_info').where('startdate', 'like', `%${year}-${month}%`);
  } else if (rangeType == 2) {
    const year = moment().format('YYYY');//计算年份
    result = await mysql('xms_finance_info').where('startdate', 'like', `%${year}%`);
  }
  ctx.state.data = result;
}

module.exports = {
  getFinanceInfoById,
  updateFinancdInfoById,
  calculateFinanceTypeRate
}