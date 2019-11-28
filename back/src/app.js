const Koa = require('koa');
// 解决less文件栈溢出
require('events').EventEmitter.defaultMaxListeners = 0
// 模板插件
const views = require('koa-views');
// json格式处理中间件
const json = require('koa-json');
// 处理koa程序错误
const onerror = require('koa-onerror');
// 解析body传输数据
const bodyparser = require('koa-bodyparser');

// 跨域中间件
const cors = require('koa2-cors');

// 日志生成中间件
const logger = require('koa-logger');
// 自定义方法动态生成css
const {createCss} = require('./utils/utils')

// 创建应用
const app = new Koa();
// error handler
onerror(app)
// 解决跨域
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   await next();
// });
// 解决options请求
/**
 * 由于做了跨域,所以前端用post请求后台接口的时候,会有预检,及时options请求,解决的方法,在nodejs里对options的请求直接返回200,具体的做法是在app.js加入如下代码:
 */
// app.use(async (ctx, next)=> {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   if (ctx.method == 'OPTIONS') {
//     ctx.body = 200; 
//   } else {
//     await next();
//   }
// });

//设置跨域请求
app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/') { // 这边设置在这个url下不允许跨域
      return false;
    }
    return '*'; // 这边设置只允许某个域名进行访问
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['PUT, POST, GET, DELETE, OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 解析post请求body携带内容 解析成key:value形式
app.use(bodyparser())
app.use(json())
app.use(logger())

// !less转css插件配置
createCss()
app.use(require('koa-static')(__dirname, '/assets'))

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
const router = require('./routes/index');
app.use(router.routes())
   .use(router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
