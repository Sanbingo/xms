const { mysql } = require('../qcloud.js');
const moment = require('moment');

// 以客户为维度，获取客户生日提醒和理财提醒
/*
[{
  name: '客户姓名',
  tel: '客户电话',
  isBirthDay: true,
  isFinanceEnd: true,
  financeTypeName: ['理财', '基金', '保险']
}]
*/
async function getNoticeByDeadline(ctx) {
  const { deadline } = ctx.request.body;
  let startDate;
  let endDate;

  if (deadline == 0) { // 今天
    startDate = moment().format('YYYY-MM-DD');
    endDate = moment().format('YYYY-MM-DD');
  } else if (deadline == 2) { // 明天和后天
    startDate = moment().add(1, 'days').format('YYYY-MM-DD');
    endDate = moment().add(2, 'days').format('YYYY-MM-DD');
  } else if (deadline == 7) { // 下一周的起始和结束日期
    const weekOfday = moment().format('E');//计算今天是这周第几天  
    startDate = moment().add(7 - weekOfday + 1, 'days').format('YYYY-MM-DD');//下周一日期  
    endDate = moment(startDate).add(6, 'days').format('YYYY-MM-DD');//下周日日期
  }
  console.log(startDate, endDate);
  // 获取所有客户信息
  const allCustomer = await mysql('xms_customer_info');
  // 生日没到期的客户
  const noBirthdayCus = allCustomer.filter(item => item.birthday < startDate || item.birthday > endDate);
  
  // 生日到期的客户
  const tempArray = allCustomer.filter(item => {
    item.birthday >= startDate && item.birthday <= endDate
    // 只需计算月和天，不用计算年！
    if (item.birthday.slice(5) === startDate.slice(5)) {
      return true;
    } 
    return false;
  }).map(item => ({
    cid: item.cid,
    name: item.name,
    telephone: item.telephone,
    isBirthDay: true,
    isFinanceEnd: false,
    datetime: item.birthday,
    financeTypeName: []
  }))
  // 获取所有到期的财务信息
  const fin = await mysql('xms_finance_info').where('enddate', '>=', startDate).andWhere('enddate', '<=', endDate);
  fin.forEach(f => {
    let ifExist = false;
    let idx;
    tempArray.forEach((t, index) => {
      if (f.cid === t.cid) {
        ifExist = true;
        idx = index;
      }
    });
    // 如果存在，则改变isFinanceEnd和financeTypeName字段
    if (ifExist) {
      tempArray[idx].isFinanceEnd = true,
      tempArray[idx].financeTypeName.push(f.type)
    } else {
      // 如果不存在，则新建一条信息插入到tempArray后面
      const temObj = noBirthdayCus.filter(item => item.cid == f.cid)[0];
      if (temObj) {
        const newObj = {
          cid: temObj.cid,
          name: temObj.name,
          telephone: temObj.telephone,
          isBirthday: false,
          isFinanceEnd: true,
          datetime: f.enddate,
          financeTypeName: [f.type]
        }
        tempArray.push(newObj);
      }
    }
  })
  ctx.state.data = tempArray;
}

module.exports = {
  getNoticeByDeadline
}