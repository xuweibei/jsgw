//员工接口
const {addDep, delDep, updateDep, insertEmployee, getEmployee, findDep,editEmp, readDep, findIdentity, delEmp, changeStatus} = require('../controller/depControllor')
const {SuccessModel, ErrorModel} = require('../config/model')
module.exports = {
    'departmentStructur': async (ctx, next) => {
        const depObj = await findDep()
        const identity = await findIdentity()
        const dep = await readDep()
        await ctx.render('departmentStructur', {depObj, identity, dep})
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
        const ret = await insertEmployee(ctx.request.body)
        if (ret) {
            return ctx.body = new SuccessModel('新增成功')
        }
        ctx.body = new SuccessModel('新增失败')
    },
    "get_tab": async ctx => {
        const ret = await getEmployee()
        if (ret) {
            ctx.body = new SuccessModel(ret, "获取列表成功")
            return;
        }
        ctx.body = new ErrorModel('获取列表失败')
    },
    "edit_emp":async ctx => {
        const ret = await editEmp(ctx.request.body)
        if (ret) {
             ctx.body = new SuccessModel('更新成功')
             return;
        }
       ctx.body = new ErrorModel('更新失败')
    },
    "del_emp": async ctx => {
        const {id} = ctx.request.body
        const ret = await delEmp(id)
        if (ret) {
            ctx.body = new SuccessModel('刪除员工成功')
            return
        }
        ctx.body = new ErrorModel('刪除员工失败')
    },
    "change_status": async ctx => {
        const {id} = ctx.request.body
        const ret = await changeStatus(id)
        if (ret) {
            ctx.body = new SuccessModel('状态修改成功')
            return
        }
        ctx.body = new ErrorModel('状态修改失败')
    }
}