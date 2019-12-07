const {login} = require('../controller/login')
const {SuccessModel, ErrorModel} = require('../config/model')
module.exports = {
    "login": async ctx => {
        const {account, password} = ctx.request.body;
        const data = await login(account, password)
        // console.log(Number(data.status))
        if (data.hasOwnProperty('dataValues')) {
            ctx.session.account = data.account
            ctx.body = new SuccessModel(data)
        } else {
            ctx.body = new ErrorModel('账号或者密码错误')
        }
    }
}