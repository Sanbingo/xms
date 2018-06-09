/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)


// 客户信息
router.get('/customer', controllers.customer.getCustomer)
router.post('/customer/add', controllers.customer.addCustomer)
router.get('/customer/:id', controllers.customer.getCustomerById)
router.get('/customer/:id/finance', controllers.customer.getAllFinanceByCustomerId)
router.post('/customer/:id/finance', controllers.customer.addFinanceByCustomerId)
router.post('/customer/search', controllers.customer.getCustomerListByName)

// 财务信息
router.get('/finance/:id', controllers.finance.getFinanceInfoById)
router.post('/finance/:id', controllers.finance.updateFinancdInfoById)
router.post('/finance/occupy/query', controllers.finance.calculateFinanceTypeRate)

// 首页信息
router.post('/notice', controllers.notice.getNoticeByDeadline)

module.exports = router
