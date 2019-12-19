// const {sequelize} = require('../db/db');
const {Intro} = require('../model/createTables')

const insertIntro = async (data) => {
    const find =  await Intro.findAll();
    if (find && find.length === 0) {
        const ret = await Intro.create({
            content: data
        })
        return ret
    }
    const ret = Intro.update({
        content: data
    }, {
        where: {id: 1}
    }) 
    return ret
}

// 获取富文本信息
const getHtml = async () => {
    const ret = await Intro.findOne({where: {id: 1}})
    return ret;
}
module.exports = {
    insertIntro,
    getHtml
}