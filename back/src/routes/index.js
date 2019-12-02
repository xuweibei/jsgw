const router = require('koa-router')()
const home = require('./home')
router.get('/', home.home)
module.exports = router
