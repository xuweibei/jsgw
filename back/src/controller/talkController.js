// 公司交流
const {
    Exchange
} = require('../model/createTables')

const {
    sequelize
} = require('../db/db');
const upTalk = async (pic, content, title) => {
    const ret = await Exchange.create({
        username: "lei",
        department_id: '1',
        exchange_content: content,
        exchange_pic: pic,
        exchange_title: title
    })

    return ret
}

const reTalk = async (limit, page) => {
    const offset = (page - 1) * limit
    const sql = `select username, department_id, exchange_title, create_time from gw_exchange limit ${offset}, ${limit}`
    // const ret = await Exchange.findAll({
    //     attributes: { exclude: ['exchange_content', 'exchange_pic'] }
    // });

    const ret = await sequelize.query(sql, {
        replacements: ['active'],
        type: sequelize.QueryTypes.SELECT
    })
    // console.log(ret)
    return ret
}

const talkDetail = async (id) => {
    const find = await Exchange.findOne({where: {id}})

    return find
}


module.exports = {
    upTalk,
    reTalk,
    talkDetail
}