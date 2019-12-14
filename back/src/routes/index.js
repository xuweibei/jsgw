const router = require('koa-router')()
const home = require('./home')
router.get('/', home.home)
      .get('/delivery/store-delivery', home.storeDelivery)
      .get('/delivery/department-structur', home.departmentStructur)
      .get('/help-content', home.helpContent)  //帮助中心
      .get('/job-class', home.jobClass)
      .get('/index-manage', home.indexManage)
      .get('/companyTalk', home.companyTalk)
      .get('/productsCenter', home.productsCenter)
module.exports = router
