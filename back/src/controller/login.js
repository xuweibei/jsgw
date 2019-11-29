// const {exec} = require('../db/db');
const {userData} = require('../model/createTables')
const login = async (username, password) => {
    // const sql = `SELECT * FROM users WHERE username='${username}' and password='${password}'`
    const rows = await userData.findAll({
        where: {
            username,
            password
        }
    });
    return rows[0] || {}
}

const uploadImg = async (url) => {
    console.log(url)
    const sql = `insert into image (url) values (${url})`
    return await exec(sql)[0]
}

module.exports = {
    login,
    uploadImg
}