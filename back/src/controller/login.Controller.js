// const {exec} = require('../db/db');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
const {Account} = require('../model/createTables')
const login = async (account) => {
    // const sql = `SELECT * FROM users WHERE username='${username}' and password='${password}'`
    const rows = await Account.findOne({
        where: {
            account
        }
    });
    if (rows && rows.dataValues) {
        const password = md5.update(rows.dataValues.password).digest("hex")
        console.log(password)
        const account = rows.dataValues.account
        const id = rows.dataValues.id
        return {id, account, password}
    }
    return {}
}

module.exports = {
    login
}