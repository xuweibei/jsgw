const Sequelize = require('sequelize');
const db = require('../db/db')
exports.Users = db.defineModel('gw_users', {
    user_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_name: Sequelize.STRING(100),
    pwd: Sequelize.STRING(100),
});


exports.Roles = db.defineModel('gw_role', {
    role_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    role_name: Sequelize.STRING(100)
});

exports.Group = db.defineModel('gw_group', {
    group_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    group_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    }
});