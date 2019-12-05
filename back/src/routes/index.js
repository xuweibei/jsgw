const router = require('koa-router')()
const home = require('./home')
router.get('/', home.home)
      .get('/delivery/store-delivery', home.storeDelivery)
      .get('/delivery/department-structur', home.departmentStructur)
      .get('/help-content', home.helpContent)  //帮助中心
module.exports = router
