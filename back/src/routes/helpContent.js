const {saveCententTitle} = require('../controller/depControllor')
const {SuccessModel, ErrorModel} = require('../config/model')

module.exports = {
    'helpContent' : async ctx =>{
        await ctx.render('helpContent')
    },
    //产品中心（存储[志强]）
    "add_centent_title": async ctx => {
        const data = await saveCententTitle(ctx.request.body)
        if (data) {
            if (data.status === 0) {
                ctx.body = new SuccessModel(data, data.message)
            } else if (data.status === 1) {
                ctx.body = new ErrorModel(data.message)
            }
            return
        } else {
            ctx.body = new ErrorModel('存储失败')
        }
    },
}
