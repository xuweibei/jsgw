const mysql = require('mysql');

const {MYSQL_CONF} = require('../conf/index');

// 简历链接
const connect = mysql.createConnection(MYSQL_CONF);


connect.connect();

// 定义方法处理sql语句f
function exec(sql) {
    return new Promise((resolve, reject) => {
        connect.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            // 成功返回数据
            resolve(result);
        })
    })
}

module.exports = {
    exec
}
