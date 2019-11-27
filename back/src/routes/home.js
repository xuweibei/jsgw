const {login} = require('../controller/login')
const {SuccessModel, ErrorModel} = require('../model/model')
const jwt = require('jsonwebtoken')
module.exports = {
    'home': async (ctx, next) => {
        await ctx.render('home')
     },
    'login': async ctx => {
        const {username, password} = ctx.request.body
        console.log(ctx.request.body, '雷克萨京东卡圣诞节三')
        const result = await login(username, password)
        if (result.username) {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: result.username
              }, 'asd12312');
              const data = {token}
            ctx.body = new SuccessModel(data, '登录成功');
            return;
        }
        ctx.body = new ErrorModel('登录失败');
    }
}