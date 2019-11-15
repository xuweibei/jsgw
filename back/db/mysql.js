const mysql = require('mysql');
const {COMMENT, POSTS} = require('../model/createTables');
const {MYSQL_CONF} = require('../conf/index');

// 创建mysql链接
// const connect = mysql.createConnection(MYSQL_CONF);
const pool = mysql.createPool(MYSQL_CONF);

// connect.connect();

// 创建连接池
function exec(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err)
            }
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    })
} 
// 新建数据库表方法
const createTable = async (sql) => {
    return await exec(sql,[])
}
createTable(COMMENT);
createTable(POSTS);
module.exports = {
    exec
}
