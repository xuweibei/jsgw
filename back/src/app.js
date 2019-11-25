const Koa = require('koa')
// const path = require('path');
const app = new Koa()
const koaMinify = require('@chuchur/koa-minify')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 路由
const index = require('./routes/index')
const users = require('./routes/users')
const test = require('./routes/test')

// error handler
onerror(app)
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

koaMinify(__dirname + '/public',
  {
    entry: __dirname + '/public/less/index.less',
    output: __dirname + '/public/css/index.css'
  }
)
app.use(require('koa-static')(__dirname, '/public'))

// ejs模板渲染引擎
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(test.routes(), test.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
