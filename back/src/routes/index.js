const router = require('koa-router')()
const home = require('./home')
router.get('/', home.home)
      .get('/delivery/store-delivery', home.storeDelivery)
      .get('/delivery/department-structur', home.departmentStructur)
module.exports = router
