// const {exec} = require('../db/db');
const {Users} = require('../model/createTables')
const login = async (account, password) => {
    // const sql = `SELECT * FROM users WHERE username='${username}' and password='${password}'`
    const rows = await Users.findAll({
        attributes: ['account', 'status'],
        where: {
            account,
            password
        }
    });
    return rows[0] || {}
}
const register = async (account, password) => {
    // const sql = `SELECT * FROM users WHERE username='${username}' and password='${password}'`
    const rows = await Users.findAll({
        attributes: ['account', 'status'],
        where: {
            account,
            password
        }
    });
    return rows[0] || {}
}

module.exports = {
    login,
    register
}