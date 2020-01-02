/*
 * 后台程序入口文件 // 18760660507
 * */
const Koa = require('koa');
const views = require('koa-views'); // 模板插件
const json = require('koa-json'); // json格式处理中间件
const onerror = require('koa-onerror'); // 处理koa程序错误
const koaBody = require('koa-body'); // 解析body传输数据
const passport = require('./middleware/passport');
const session = require('koa-session')
const cors = require('koa2-cors'); // 跨域中间件
const logger = require('koa-logger'); // 日志生成中间件
const koaMinify = require('@chuchur/koa-minify'); // less插件
// 创建应用
const app = new Koa();
// error handler
// require('events').EventEmitter.defaultMaxListeners = 0; // 解决less文件栈溢出
// 代替koa默认错误提示
onerror(app)
app.keys = ['zzkj_@123'];

const CONFIG = {
    key: 'koa:sess', // 加密key
    // maxAge: 100, // 这个是确定cookie的有效期，默认是一天。
    autoCommit: true,
    /** (boolean 自定义提交头 */
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true, // 表示是否可以通过javascript来修改，设成true会更加安全
    signed: true,
    /** (boolean) signed or not (default true) */
    rolling: false, // (boolean) 强制在每个响应上设置会话标识符cookie。过期将重置为原始maxAge，重新设置过期倒计时
    renew: false, // (boolean) 当会话快过期时续订会话，这样我们可以始终保持用户登录
}

// 解析session
app.use(session(CONFIG, app));


app.use(passport.initialize())
app.use(passport.session())
//设置跨域请求
app.use(cors({
    origin: function (ctx) {
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
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
}));
app.use(json())
app.use(logger())

// less转化css
app.use(async (ctx, next) => {
    koaMinify(assets, {
        entry: path.join(__dirname, '/assets/less/') + 'main.less',
        output: path.join(__dirname, '/assets/less/') + 'main.css'
    })
    next()
})
app.use(require('koa-static')(__dirname, '/assets'))


// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// handlebars 模板参数设置
const viewsParam = require('./views/index');
app.use(views(__dirname + '/views', viewsParam));

// routes
const router = require('./routes/index');
app.use(router.routes())
    .use(router.allowedMethods());


module.exports = app;
