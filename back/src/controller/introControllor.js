
const {Intro} = require('../model/createTables')
const insertIntro = async (data, id) => {
    if (id) {
        const find =  await Intro.findOne({where: {id}});
            if (find) {
                const ret = await Intro.update({
                    id,
                    content: data
                }, {where: {id}})
                return ret
    }
        const ret = await Intro.create({
            id,
            content: data
        })
        return ret
    }
}

// 获取富文本信息
const getHtml = async (id) => {
    if (id) {
        const ret = await Intro.findOne({where: {id}})
        return ret;
    }
    
}
module.exports = {
    insertIntro,
    getHtml,
}