const {login} = require('../controller/login')
const {SuccessModel, ErrorModel} = require('../model/model')
const jwt = require('jsonwebtoken')
module.exports = {
    'home': async (ctx, next) => {
        await ctx.render('login', {a: 1, b: 2})
     },
    'login': async ctx => {
        const {username, password} = ctx.request.body
        const result = await login(username, password)
        if (result.username) {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: result.username
              }, 'asd12312');
            ctx.body = new SuccessModel({token}, '登录成功');
            return;
        }
        ctx.body = new ErrorModel('登录失败');
        // ctx.render('login')
    }
}