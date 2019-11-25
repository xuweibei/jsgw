const router = require('koa-router')();
const {SuccessModel} = require('../model/model');
const {test} = require('../controller/test')

router.get('/api/test', async (ctx, next) => {
  // console.log(ctx.query) // { id: '3' }
  // console.log(ctx.queryString) // /api/test?id=3
  const data = await test();
  ctx.body = new SuccessModel(data);
})
module.exports = router
