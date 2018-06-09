
const { mysql } = require('../qcloud.js');

// 获取全部客户信息
async function getCustomer (ctx) {
  const result = await mysql('xms_customer_info');
  ctx.state.data = {
    list: result
  }
}
// 根据ID获取客户信息
async function getCustomerById (ctx) {
  const { id } = ctx.params;
  const res = await mysql('xms_customer_info').where({cid: id}).first();
  ctx.state.data = res;
}
// 根据用户名获取客户信息列表
async function getCustomerListByName(ctx) {
  const { value } = ctx.request.body;
  const result = await mysql('xms_customer_info').where('name', 'like', `%${value}%`);
  ctx.state.data = result;
}

// 根据客户ID获取旗下所有的理财信息
async function getAllFinanceByCustomerId(ctx) {
  const { id } = ctx.params;
  const res = await mysql('xms_finance_info').where({ cid: id  });
  ctx.state.data = res;
}

// 新增客户信息&理财信息
async function addCustomer (ctx) {
  const { personalInfo, financeProducts=[] } = ctx.request.body;
  const [cid] = await mysql('xms_customer_info').insert(personalInfo).returning('cid');
  //Todo: 过滤无效的理财信息，比如：金额为空
  if (financeProducts.length) {
    const insertData = financeProducts.map(item => Object.assign({}, item, {cid}));
    await mysql('xms_finance_info').insert(insertData);
  }
}

// 根据客户ID新增理财信息
async function addFinanceByCustomerId (ctx) {
  console.log('sssss')
  await mysql('xms_finance_info').insert(ctx.request.body);
}

module.exports = {
  getCustomer,
  getCustomerById,
  getCustomerListByName,
  addCustomer,
  getAllFinanceByCustomerId,
  addFinanceByCustomerId,
  
}