const {SuccessModel, ErrorModel} = require('../config/model')
const {insertEvent, getEvent, delEvent} = require('../controller/eventController')
module.exports = {
    "events": async ctx => {
        const ret = await getEvent()
        await ctx.render('events', {arr: ret})
    },
    "insert_event": async ctx => {
        const {time, title, content} = ctx.request.body
        const ret = await insertEvent(time, title, content)
        if (ret) {
            ctx.body =  new SuccessModel('插入事件成功')
            return
        }
        ctx.body = new ErrorModel("插入事件失败")
    },
    "del_event": async ctx => {
        const {id} = ctx.request.body
        const ret = await delEvent(id)
        
        if (ret) {
            ctx.body =  new SuccessModel('删除事件成功')
            return
        }
        ctx.body = new ErrorModel("删除事件失败")
    }
}