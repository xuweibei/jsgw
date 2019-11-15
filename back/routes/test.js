const router = require('koa-router')();
const {SuccessModel} = require('../model/model');
const {test} = require('../controller/test')

router.get('/api/test', async (ctx, next) => {
  // console.log(ctx.req) // node原生request
  // console.log(ctx.request) // koa2  request
  const data = await test();
  ctx.body = new SuccessModel(data);
})


module.exports = router
