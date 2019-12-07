const router = require('koa-router')()
const home = require('./home')
router.get('/', home.home)
      .get('/delivery/store-delivery', home.storeDelivery)
      .get('/delivery/department-structur', home.departmentStructur)
      .get('/job-class', home.jobClass)
      .get('/index-manage', home.indexManage)
      .get('/company-talk', home.companyTalk)
      .get('/products-center', home.productsCenter)
      .get('/info-center', home.infoCenter)
      .get('/turn-manage', home.turnManage)
module.exports = router
