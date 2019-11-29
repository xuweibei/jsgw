// 这个文件用来处理数据逻辑
// const {exec} = require('../db/db');
const {testData} = require('../model/createTables')
const test = async () => {
    // const sql = 'select * from test where 1=
    // console.log(createUser().findAll())
    return await testData.findAll({attributes: ['fruit', 'price']})
}

module.exports = {
    test
}