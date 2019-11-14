// 这个文件用来处理数据逻辑
const {exec} = require('../db/mysql');

const test = async () => {
    const sql = 'select * from test where 1=1'
    return await exec(sql);
}

module.exports = {
    test
}