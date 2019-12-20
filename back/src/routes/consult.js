const {insertInfo, getInfo, delInfo, hideInfo} = require('../controller/infoControl')
const {SuccessModel, ErrorModel} = require('../config/model')
// 资讯
module.exports = {
    'infoCenter': async (ctx, next) => {
        await ctx.render('infoCenter')
    },
    "insert_info": async ctx => {
        const {html, title} = ctx.request.body;

        const ret = await insertInfo(html, title);
        if (ret) {
            ctx.body = new SuccessModel('添加资讯成功')
            return
        }
        ctx.body = new ErrorModel('添加资讯失败')
    },
    "get_info": async ctx => {
        const ret = await getInfo()
        if (ret.length > 0) {
            ctx.body = new SuccessModel({list: ret}, "获取讯息成功")
            return
        }
        ctx.body = new ErrorModel( "获取讯息失败")
    },
    "del_info": async ctx => {
        const {id} = ctx.request.body
        const ret = await delInfo(id)
        if (ret) {
            ctx.body = new SuccessModel("删除资讯成功")
            return 
        }
        ctx.body = new ErrorModel("删除失败")
    },
    "hide_info": async ctx => {
        const {id} = ctx.request.body
        const ret = await hideInfo(id)
        if (ret) {
            ctx.body = new SuccessModel("隐藏资讯成功")
            return 
        }
        ctx.body = new ErrorModel("隐藏资讯失败")
    },
    "edit_info": async ctx => {
        const {id, html, title} = ctx.request.body
        console.log(id, html, title)
        ctx.body = {a: 1}
    }
}