const mysql = require('mysql');
const sqls = require('../model/createTables');
const {MYSQL_CONF} = require('../config/index');

// 创建mysql链接
const pool = mysql.createPool(MYSQL_CONF);

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
const createTable = async (sqls) => {
    for (let key in sqls) {
        await exec(sqls[key],[])
    }
}
createTable(sqls);
// const sequelize = new Sequelize(MYSQL_CONF.database, MYSQL_CONF.user, MYSQL_CONF.password, {
//     host: MYSQL_CONF.host,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// })
// sequelize
// .authenticate()
//   .then(() => {
//     console.log('链接成功');
    // const createTable = async (sqls) => {
    //     for (let key in sqls) {
    //         await sqls[key](sequelize)
    //         // await exec(sqls[key],[])
    //         // 同步建表
    //         await sequelize.sync()
    //     }
    // }
    // createTable(sqls);
//   })
//   .catch(err => {
//     console.error('链接数据库失败:', err);
// });
module.exports = {
    exec
}