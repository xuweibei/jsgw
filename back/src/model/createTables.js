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


exports.Roles = db.defineModel('gw_role', {
    role_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    department: Sequelize.STRING(30)
})

module.exports = {
    Users,
    Department,
    employee,
    account,
    identity,
    department,
    first_broad,
    second_broad
}

//账户表
exports.account = db.defineModel('gw_account', {
     id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //账号
    account: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    //密码
    password: {
        type: Sequelize.STRING(50),

    },
    //身份id,对应identity表的主键
    identity_id: {
        type: Sequelize.INTEGER(11),
    }
});

//身份表
exports.identity = db.defineModel('gw_identity', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //身份：超级管理员，普通管理员，普通员工
    identity: {
        type: Sequelize.STRING(50)
    }
});
//部门表
exports.department = db.defineModel('gw_department', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //部门：列：前端、后端、产品、行政......
    department: {
        type: Sequelize.STRING(50)
    }
});
//侧边栏一级导航表
exports.first_broad = db.defineModel('gw_first_broad', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //一级导航名称：列：官网首页、关于我们、产品咨讯、公司交流、加入我们、员工管理......
    broad_name: {
        type: Sequelize.STRING(50)
    }
});
//侧边栏二级导航表
exports.second_broad = db.defineModel('gw_second_broad', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //二级导航名称：列：官网首页、关于我们、产品咨讯、公司交流、加入我们、员工管理......
    se_broad_name: {
        type: Sequelize.STRING(50)
    },
    //一级导航id
    first_id:{
        type: Sequelize.INTEGER(11)
    }
});
//员工表
exports.employee = db.defineModel('gw_employee', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //员工姓名
    name : {type: Sequelize.STRING(30), unique: true},
    //联系电话
    phone: {type: Sequelize.STRING(11), unique: true},
    //状态：1使用中，0禁用中
    status:{
        type: Sequelize.STRING(1)
    },
    //部门id,对应部门表department的主键
    dep_id: {
        type: Sequelize.INTEGER(11)
    },
    //账号id,对应账号表account的主键
    account_id: {
        type: Sequelize.INTEGER(11)
    }
});


