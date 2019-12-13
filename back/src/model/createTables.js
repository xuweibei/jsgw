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


// const Roles = db.defineModel('gw_role', {
//     role_id: {
//         type: Sequelize.INTEGER(11),
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true
//     },
//     department: Sequelize.STRING(30),

// })

//账户表
const Account = db.defineModel('gw_account', {
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
const Identity = db.defineModel('gw_identity', {
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
})
// .bulkCreate([{id: 1,identity: '超级管理员'}, {id: 2,identity: '管理员'}, {id: 3,identity: '员工'}], [{updateOnDuplicate:true}])

//部门表
const Department = db.defineModel('gw_department', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //部门：列：前端、后端、产品、行政......
    department: {
        type: Sequelize.STRING(50)
    },
    dep_status: {
        type: Sequelize.STRING(2),
        allowNull: false,
        defaultValue: '1'
    }
});
//侧边栏一级导航表
const First_broad = db.defineModel('gw_first_broad', {
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
const Second_broad = db.defineModel('gw_second_broad', {
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
const Employee = db.defineModel('gw_employee', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //员工姓名
    name : {type: Sequelize.STRING(30), unique: true},
    //联系电话
    phone: {type: Sequelize.STRING(11)},
    //状态：1使用中，0禁用中
    status:{
        type: Sequelize.STRING(1),
        defaultValue: '0'
    },
    ident_id: Sequelize.STRING(3),
    //部门id,对应部门表department的主键
    dep_id: {
        type: Sequelize.INTEGER(11)
    },
    //账号id,对应账号表account的主键
    account_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    }
});
//职位表
const Post = db.defineModel('gw_post', {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        //职位分类（对应部门表的主键）
        dep_id: {
            type: Sequelize.INTEGER(11)
        },
        //职位名称
        post_name: {
            type: Sequelize.STRING(30)
        },
        //排序
        sort: {
            type: Sequelize.INTEGER(11)
        },
        //最低薪水
        low_salary: {
            type: Sequelize.INTEGER(11)
        },
       // 最高薪水
       top_salary: {
           type: Sequelize.INTEGER(11)
        }
    })
module.exports = {
    Users,
    Department,
    First_broad,
    Second_broad,
    Employee,
    Identity,
    Account,
    Post
    // Roles
}
