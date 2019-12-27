// const {exec} = require('../db/db');
const crypto = require('crypto');

const {Account, Employee, Identity} = require('../model/createTables')
const login = async (account) => {
    // const sql = `SELECT * FROM users WHERE username='${username}' and password='${password}'`
    const rows = await Account.findOne({
        where: {
            account
        }
    });
    console.log(rows)
    if (rows && rows.dataValues) {
        const password = crypto.createHash('md5').update(rows.dataValues.password).digest("hex")
        const ident = rows.dataValues.identity_id
        const account = rows.dataValues.account
        const id = rows.dataValues.id
        const emp = await Employee.findOne({where: {id}, attributes: ['name']})
        const ide = await Identity.findOne({where: {id: ident}, attributes: ['identity']})
        const name = emp.dataValues.name
        const identity = ide.dataValues.identity
        return {id, account, password, name, identity}
    }
    return {}
}

// 获取员工信息
// const userInfo = async (account) => {}
module.exports = {
    login
}