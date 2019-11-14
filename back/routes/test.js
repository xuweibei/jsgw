const router = require('koa-router')();
const {test} = require('../controller/test')

router.get('/api/test', async (ctx, next) => {
  const data = await test();
  ctx.body = data;
})


module.exports = router
