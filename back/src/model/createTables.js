const Sequelize = require('sequelize');
const db = require('../db/db')
exports.three = db.defineModel('project_master', {
    p_id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    p_name: Sequelize.STRING(100),
    p_academy: Sequelize.STRING(100),
    p_start_date: Sequelize.STRING(10),
    p_end_date: Sequelize.STRING(10),
    p_days: Sequelize.DECIMAL(10, 1),
    p_place: Sequelize.STRING(20),
    p_owner: Sequelize.STRING(10),
    p_operator: Sequelize.STRING(10),
    p_is_fee: Sequelize.BIGINT(1),
    p_state: Sequelize.BIGINT(2),  // 开启，关闭
    p_bz: Sequelize.STRING(255),
});

exports.one = db.defineModel('one', {
    p_id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    p_name: Sequelize.STRING(100),
    p_academy: Sequelize.STRING(100),
    p_start_date: Sequelize.STRING(10),
    p_end_date: Sequelize.STRING(10),
    p_days: Sequelize.DECIMAL(10, 1),
    p_place: Sequelize.STRING(20),
    p_owner: Sequelize.STRING(10),
    p_operator: Sequelize.STRING(10),
    p_is_fee: Sequelize.BIGINT(1),
    p_state: Sequelize.BIGINT(2),  // 开启，关闭
    p_bz: Sequelize.STRING(255),
});

exports.two = db.defineModel('two', {
    p_id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    p_name: Sequelize.STRING(100),
    p_academy: Sequelize.STRING(100),
    p_start_date: Sequelize.STRING(10),
    p_end_date: Sequelize.STRING(10),
    p_days: Sequelize.DECIMAL(10, 1),
    p_place: Sequelize.STRING(20),
    p_owner: Sequelize.STRING(10),
    p_operator: Sequelize.STRING(10),
    p_is_fee: Sequelize.BIGINT(1),
    p_state: Sequelize.BIGINT(2),  // 开启，关闭
    p_bz: Sequelize.STRING(255),
});

exports.testData = db.defineModel('test', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    fruit: Sequelize.STRING(100),
    price: Sequelize.STRING(100)
});
exports.userData = db.defineModel('user', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username: Sequelize.STRING(100),
    password: Sequelize.STRING(100)
});