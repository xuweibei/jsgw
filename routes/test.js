const router = require('koa-router')();
const {test} = require('../controller/test')

router.get('/test', async (ctx, next) => {
  const data = await test();
  ctx.body = data;
})


module.exports = router
