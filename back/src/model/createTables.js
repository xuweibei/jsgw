const Sequelize = require('sequelize');
const db = require('../db/db')
const Users = db.defineModel('gw_users', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    account : {type: Sequelize.STRING(50),unique: true},
    password: Sequelize.STRING(50),
    identity_id: Sequelize.BOOLEAN(4),
    status: Sequelize.BOOLEAN(4)
})

const Department = db.defineModel('gw_department', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    department: Sequelize.STRING(30)
})

const Employe = db.defineModel('gw_employe', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name : {type: Sequelize.STRING(30), unique: true},
    phone: {type: Sequelize.STRING(11), unique: true},
    status: Sequelize.BOOLEAN(4),
    dep_id: Sequelize.INTEGER(11),
    account_id: Sequelize.INTEGER(11)
})

module.exports = {
    Users,
    Department,
    Employe
}