const router = require('koa-router')()
const {test} = require('../controller/test') 
router.get('/', async (ctx, next) => {
  const data = await test()
  await ctx.render('index', {
    title: data
  })
})

router.get('/cart', async (ctx, next) => {
  await ctx.render('cart', {
    title: 'hello 购物车'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
