const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koaMinify = require('@chuchur/koa-minify');

const index = require('./routes/index');
const users = require('./routes/users');
const test = require('./routes/test');

// 创建应用
const app = new Koa();

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

// !less转css插件配置
koaMinify(__dirname + '/public',
  {
    entry: __dirname + '/public/less/index.less',
    output: __dirname + '/public/css/index.css'
  }
)
app.use(require('koa-static')(__dirname, '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


/**
 * views
 * Must be used before any router is used
 */
// handlebars 模板参数设置
const viewsParam = require('./views/index');
app.use(views(__dirname + '/views', viewsParam));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(test.routes(), test.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
