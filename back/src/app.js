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
const koaBody = require('koa-body');
const session = require('koa-session')
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
app.keys = ['zzkj_@123'];

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
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
// 解析session
app.use(session(CONFIG, app));
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
app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));
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
