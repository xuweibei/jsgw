const {sequelize} = require('../db/db');

// 获取职业分类，并按sort字段排序
const getClassify = async () => {
    const sql = "select classify, sort from gw_post_classify order by sort";
    const ret = await sequelize.query(sql)
    console.log(ret[0])
    return ret[0]
}
module.exports = {
    getClassify
}
