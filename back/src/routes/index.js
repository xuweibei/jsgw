const router = require('koa-router')()
const home = require('./home')
<<<<<<< HEAD
router.get('/', public.root)
      .get('/test', public.test)
      .get('/test1', public.test1)
      .get('/test2', public.test2)
      .get('/test3', public.test3)
      .get('/index', public.index)
      .get('/home', home.home)
      .post('/login', home.login)
      .post('/upload', home.upload)
      .get('/delivery/store-delivery', home.storeDelivery)
      .get('/delivery/department-structur', home.departmentStructur)
=======
router.get('/', home.home)
>>>>>>> a111b88a19f89c87742e2cbf6181d537a403f6cb
module.exports = router
