// 登录
const {
    login
} = require('../controller/login.Controller')
const passport = require('../middleware/passport')
const {
    SuccessModel,
    ErrorModel
} = require('../config/model')
module.exports = {
    'home': async ctx => {
        await ctx.render('login')
    },
    "login": async ctx => {
        // await ctx.logout()
        // ctx.session = {}
        // console.log(ctx.session)
        // ctx.body = {a: 1}
        const {
            account,
            password
        } = ctx.request.body;
        const data = await login(account)
        console.log(data, "打算接电话萨卡的很")

        if (password === data.password) {
            // ctx.body = new SuccessModel(data, "登录成功")
            // return 
            return passport.authenticate('local',
                function () {
                    ctx.body = new SuccessModel(data, "登录成功")
                    return ctx.login({
                        id: data.id,
                        username: data.account,
                        password
                    })
                })(ctx)
        }
        ctx.body = new ErrorModel('账号或者密码错误')
    },
    "logout": async ctx => {
        ctx.logout()
        ctx.body = {auth: ctx.isAuthenticated(), user: ctx.state.user}
    }
}
