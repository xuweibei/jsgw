const {login} = require('../controller/login')
const {addDep, delDep, updateDep} = require('../controller/depControllor')
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
    },
    "add-dep": async ctx => {
        const {name} = ctx.request.body;
        const ret = await addDep(name)
        if (ret) {
            ctx.body = new SuccessModel('创建分组成功')
            return
        }
        ctx.body = new ErrorModel('分组已存在')
    },
    "del_dep": async ctx => {
        const {id} = ctx.request.body
        const ret = await delDep(id)
        if (ret) {
            ctx.body = new SuccessModel('删除分组成功')
            return;
        }
        ctx.body = new ErrorModel('删除分组失败')
    },
    "edit_dep": async ctx => {
        const {name, id} = ctx.request.body
        const ret = await updateDep(name, id)
        if (ret) {
            ctx.body = new SuccessModel('修改分组成功')
            return
        }
        ctx.body = new ErrorModel('分组名已存在')
    },
    "insert_stf": async ctx => {
        console.log(ctx.request.body)
        ctx.body = {a: 1}
    }
}