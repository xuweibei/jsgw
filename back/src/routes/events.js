const {SuccessModel, ErrorModel} = require('../config/model')
const {insertEvent, getEvent} = require('../controller/eventController')
module.exports = {
    "events": async ctx => {
        const ret = await getEvent()
        console.log(ret)
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
    }
}