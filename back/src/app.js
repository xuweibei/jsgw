/*
 * ��̨��������ļ� // 18760660507
 * */
const Koa = require("koa");
const path = require("path");
const fs = require("fs");
const views = require("koa-views"); // ģ����
const json = require("koa-json"); // json��ʽ�����м��
const onerror = require("koa-onerror"); // ����koa�������
const koaBody = require("koa-body"); // ����body��������
const passport = require("./middleware/passport");
const session = require("koa-session");
const cors = require("koa2-cors"); // �����м��
const logger = require("koa-logger"); // ��־�����м��
const koaMinify = require("@chuchur/koa-minify"); // less���
const morgan = require("koa-morgan");
// ����Ӧ��
const app = new Koa();
// ����koaĬ�ϴ�����ʾ
app.keys = ["zzkj_@123"];

const CONFIG = {
    key: "koa:sess", // ����key
    // maxAge: 100, // �����ȷ��cookie����Ч�ڣ�Ĭ����һ�졣
    autoCommit: true,
    /** (boolean �Զ����ύͷ */
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true, // ��ʾ�Ƿ����ͨ��javascript���޸ģ����true����Ӱ�ȫ
    signed: true,
    /** (boolean) signed or not (default true) */
    rolling: false, // (boolean) ǿ����ÿ����Ӧ�����ûỰ��ʶ��cookie�����ڽ�����ΪԭʼmaxAge���������ù��ڵ���ʱ
    renew: false // (boolean) ���Ự�����ʱ�����Ự���������ǿ���ʼ�ձ����û���¼
};
onerror(app);
// ����session
app.use(session(CONFIG, app));

app.use(passport.initialize());
app.use(passport.session());
//���ÿ�������
app.use(
    cors({
        origin: function(ctx) {
            if (ctx.url === "/") {
                // ������������url�²��������
                return false;
            }
            return "*"; // �������ֻ����ĳ���������з���
        },
        exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
        maxAge: 5,
        credentials: true,
        allowMethods: ["PUT, POST, GET, DELETE, OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization", "Accept"]
    })
);

// ����post����bodyЯ������ ������key:value��ʽ
app.use(
    koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 200 * 1024 * 1024 // �����ϴ��ļ���С������ƣ�Ĭ��2M
        }
    })
);
app.use(json());
app.use(logger());
// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV.indexOf("dev") > -1) {
    // console.log("���Ƽ�������˽��ú�")
    require("events").EventEmitter.defaultMaxListeners = 0; // ���less�ļ�ջ���
    app.use(morgan("dev"));
    // lessת��css
    koaMinify(__dirname + "/assets", {
        entry: __dirname + "/assets/less/main.less",
        output: __dirname + "/assets/css/main.css"
    });

    // logger
    app.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
    // console.log("��������")
} else {
    console.log("���ϻ���");
    const logFileName = path.join(__dirname, "logs", "access.log");
    const writeStream = fs.createWriteStream(logFileName, {
        flags: "a"
    });
    // console.log(logFileName, "�����ɵ������˽ӵ�����")
    app.use(
        morgan("combined", {
            stream: writeStream
        })
    );
}

app.use(require("koa-static")(__dirname, "/assets"));

// handlebars ģ���������
const viewsParam = require("./views/index");
app.use(views(__dirname + "/views", viewsParam));

// routes
const router = require("./routes/index");
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
