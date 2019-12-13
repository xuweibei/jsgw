// 登录
const {login} = require('../controller/login.Controller')
const {SuccessModel, ErrorModel} = require('../config/model')
module.exports = {
    'home': async ctx => {
        await ctx.render('login')
    },
    "login": async ctx => {
        const {account, password} = ctx.request.body;
        const data = await login(account, password)
        if (data.hasOwnProperty('dataValues')) {
            ctx.session.account = data.account
            ctx.body = new SuccessModel(data)
        } else {
            ctx.body = new ErrorModel('账号或者密码错误')
        }
    },
}