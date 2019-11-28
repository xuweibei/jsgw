const {exec} = require('../db/db');

const login = async (username, password) => {
    const sql = `SELECT * FROM users WHERE username='${username}' and password='${password}'`
    const rows = await exec(sql);
    return rows[0] || {}
}

module.exports = {
    login
}