// 公司交流
const {
    Exchange
} = require('../model/createTables')

const {
    sequelize
} = require('../db/db');
const upTalk = async (pic, content, title, department, username) => {
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
    const sql = `select id, username, department_id, exchange_title, create_time from gw_exchange limit ${offset}, ${limit}`
    // const ret = await Exchange.findAll({
    //     attributes: { exclude: ['exchange_content', 'exchange_pic'] }
    // });

    const ret = await sequelize.query(sql, {
        replacements: ['active'],
        type: sequelize.QueryTypes.SELECT
    })
    const total = await Exchange.count()
    const arr = []
    ret && ret.forEach(item => {
        arr.push(item)
    })
    // ret.total = total
    return {arr, total}
}

const talkDetail = async (id) => {
    const find = await Exchange.findOne({
        where: {
            id
        }
    })

    return find
}

const delTalk = async id => {
    const find = Exchange.findOne({where: {id}})
    console.log(find, "杀菌灯哈师大")
    if (find) {
        const ret = Exchange.destroy({where: {id}})
        console.log(ret)
        if (ret) {
            return ret
        }
        return ''
    }
    return ''
}

module.exports = {
    upTalk,
    reTalk,
    talkDetail,
    delTalk
}
