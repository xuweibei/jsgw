const {Events} = require('../model/createTables')

const insertEvent = async (time, title, content) => {
    const insert = await Events.create({time, event_title: title, event_content: content})
    return insert && insert.dataValues
}

const getEvent = async () => {
    const ret = await Events.findAll()
    const arr = []
    if (ret) {
        ret.forEach(item => {
            item.dataValues.titleTime = item.dataValues.time.split('/').join('-')
            arr.push(item.dataValues)
        })
        return arr
    }
    return arr
}
module.exports = {
    insertEvent,
    getEvent
}