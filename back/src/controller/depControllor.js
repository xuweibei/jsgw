const {
    sequelize
} = require('../db/db');


const {
    Department,
    Identity,
    Employee,
    Account,
    Company
} = require('../model/createTables')



// 生成随机密码
function randomn(n) {
    let res = ''
    for (; res.length < n; res += Math.random().toString(36).substr(2).toUpperCase()) {}
    return res.substr(0, n)
}
// 添加分组
const addDep = async (dep) => {
    const add = await Department.findOne({
        where: {
            department: dep
        }
    })
    if (add && add.dataValues) {
        if (add.dataValues.dep_status === '0') {
            const update = await Department.update({
                dep_status: '1'
            }, {
                where: {
                    department: dep
                }
            })
            return update[0]
        }
        return false
    } else {
        const ret = await Department.findOrCreate({
            where: {
                department: dep
            }
        })
        return ret && ret[1]
    }

}
// 查找分组信息
const findDep = async () => {
    // const sql1 = 'SELECT d.department, d.id, num.dep_id as dep_id, IFNULL(num.count,0) as sum from gw_department d LEFT JOIN (select e.dep_id as dep_id, count(e.dep_id) as count from gw_employee as e LEFT JOIN gw_department as d on e.dep_id=d.id where d.dep_status=1 group by e.dep_id,d.department) as num on d.id=num.dep_id'
    const sql1 = 'select d.department, e.dep_id, d.id,count(dep_id) as num from gw_department as d LEFT JOIN gw_employee as e on e.dep_id=d.id and e.status=1 where d.dep_status=1 group by dep_id,d.id, department'
    // 获取分组
    const ret = await sequelize.query(sql1, {
        replacements: ['active'],
        type: sequelize.QueryTypes.SELECT
    })
    const sql = 'select COUNT(1) as num from gw_employee where gw_employee.status=1'
    // 获取全部员工
    const count = await sequelize.query(sql, {
        replacements: ['active'],
        type: sequelize.QueryTypes.SELECT
    })
    const obj = {
        dep: ret,
        allDep: count
    }
    return obj || {}
}
// 获取分组信息
const readDep = async () => {
    const ret = await Department.findAll({
        where: {
            dep_status: "1"
        }
    })
    let arr = []
    ret.forEach(item => {
        arr.push(item.dataValues)
    })
    return arr || []
}
// 删除分组
const delDep = async (id) => {
    const ret = await Department.findOne({
        where: {
            id
        }
    })
    const sql = `update gw_employee as e set e.status=0 where e.dep_id=${id}`
    sequelize.query(sql, {
        replacements: ['active'],
        type: sequelize.QueryTypes.SELECT
    })
    if (ret.dataValues) {
        const del = await Department.update({
            dep_status: '0'
        }, {
            where: {
                id
            }
        })
        return del[0]
    }
}

// 更新分组名称
const updateDep = async (name, id) => {
    const ret = await Department.findAll({
        where: {
            department: name
        }
    })
    if (ret && ret.length > 0) {
        return false
    }
    const update = await Department.update({
        department: name
    }, {
        where: {
            id
        }
    })
    return update[0]
}
// 获取身份信息
const findIdentity = async () => {
    const ret = await Identity.findAll()
    let ident = []
    ret.forEach(item => {
        ident.push(item.dataValues)
    })
    return ident
}
// 插入员工信息
const insertEmployee = async (obj) => {
    // 查找部门id
    if (!obj.password) {
        obj.password = randomn(8)
    }
    const findDepID = await Department.findOne({
        where: {
            department: obj.department
        }
    })
    const dep_id = findDepID.id
    const findIndetId = await Identity.findOne({
        where: {
            Identity: obj.author
        }
    })
    const ident_id = findIndetId.id
    const ret = await Employee.findOne({
        where: {
            name: obj.name
        }
    })
    if (ret) {
        return await Employee.update({
            status: "1"
        }, {
            where: {
                name: obj.name
            }
        })
    } else {
        return sequelize.transaction(function (t) {
            // 要确保所有的查询链都有return返回
            return Employee.create({
                name: obj.name,
                phone: obj.phone,
                ident_id,
                dep_id
            }, {
                transaction: t
            }).then(function () {
                return Account.create({
                    account: obj.account,
                    password: obj.password,
                    identity_id: ident_id
                }, {
                    transaction: t
                });
            });

        })
    }
}

// 获取员工
const getEmployee = async (limit, page, keyword) => {
    if (keyword) {
        const sql = `select e.id, e.name, e.phone, d.department, i.identity,e.active from gw_employee e left join gw_department d on (e.dep_id=d.id)LEFT JOIN gw_identity i on (i.id=e.ident_id) where e.status = 1 and e.name like '%${keyword}%' or e.phone like '%${keyword}%'`
        const ret = await sequelize.query(sql, {
            replacements: ['active'],
            type: sequelize.QueryTypes.SELECT
        })
        const count = ret.length
        return {
            ret,
            count
        }
    }
    const offset = (page - 1) * limit;
    const sql = `select e.id, e.name, e.phone, d.department, i.identity,e.active from gw_employee e left join gw_department d on (e.dep_id=d.id)LEFT JOIN gw_identity i on (i.id=e.ident_id) where e.status = 1 limit ${offset}, ${limit}`
    const count = await Employee.count({
        where: {
            status: 1
        }
    })

    const ret = await sequelize.query(sql, {
        replacements: ['active'],
        type: sequelize.QueryTypes.SELECT
    })
    if (!ret || !count) {
        return false
    }
    return {
        ret,
        count
    }
}
// 编辑员工
const editEmp = async (parms) => {
    const findEmp = await Employee.findOne({
        where: {
            id: parms.id
        }
    })
    if (!parms.password) {
        parms.password = randomn(8)
    }
    const department = await Department.findOne({
        where: {
            department: parms.department
        }
    })
    const identity = await Identity.findOne({
        where: {
            identity: parms.author
        }
    })
    if (findEmp) {
        return sequelize.transaction(function (t) {
            // 在事务中执行操作
            return Employee.update({
                    name: parms.name,
                    phone: parms.phone,
                    ident_id: identity.dataValues.id,
                    dep_id: department.dataValues.id
                }, {
                    where: {
                        id: parms.id
                    }
                }, {
                    transaction: t
                })
                .then(function () {
                    return Account.update({
                        account: parms.account,
                        password: parms.password,
                        identity_id: identity.dataValues.id,
                    }, {
                        where: {
                            id: parms.id
                        }
                    }, {
                        transaction: t
                    })
                });
        })
    }
    return false
}
// 删除员工
const delEmp = async (id) => {
    const emp = await Employee.findOne({
        where: {
            id
        }
    })
    if (emp) {
        // const del = await Employee.update({
        //     status: "0"
        // }, {
        //     where: {
        //         id
        //     }
        // })
        // return del && del[0]
        return sequelize.transaction(function (t) {
            // 在事务中执行操作
            return Employee.update({
                    status: "0"
                }, {
                    where: {
                        id
                    }
                }, {
                    transaction: t
                })
                .then(function () {
                    return Account.update({
                        account_status: "0",
                    }, {
                        where: {
                            id
                        }
                    }, {
                        transaction: t
                    })
                });
        })
    }
}
const changeStatus = async (id) => {
    const emp = await Employee.findOne({
        where: {
            id
        }
    })
    if (emp) {
        if (emp.active === "0") {
            const change = await Employee.update({
                active: '1'
            }, {
                where: {
                    id
                }
            })
            return change && change[0]
        }
        const change = await Employee.update({
            active: '0'
        }, {
            where: {
                id
            }
        })
        return change && change[0]
    }
}

// 获取员工信息
const empInfo = async id => {
    const ret = await Employee.findOne({
        where: {
            id
        }
    })
    if (ret) {
        const ident = await Identity.findOne({
            where: {
                id: ret.dataValues.ident_id
            }
        })
        ret.dataValues.ident_id = ident.dataValues.identity
        const dep = await Department.findOne({
            where: {
                id: ret.dataValues.dep_id
            }
        })
        ret.dataValues.dep_id = dep.dataValues.department
    }
    const acount = await Account.findOne({
        where: {
            id
        }
    })
    const obj = Object.assign(ret.dataValues, acount.dataValues)
    return obj
}

//产品中心（存储[志强]）
const saveCententTitle = async (obj) => {
    // const sql1 = `insert into gw_company(comp_name, link_phone, address) values(${obj.comp_name},${obj.link_phone}, ${obj.address})`;
    // const sql2 = `insert into gw_main_concat(comp_id, page_name, page_link) values('1',${obj.page_name}, ${obj.page_link})`;
    // const sql3 = `insert into gw_friend_concat(comp_id, friend_page, friend_link) values('1',${obj.friend_page}, ${obj.friend_link})`;
    // const ret1 = await sequelize.query(sql1);
    // const ret2 = await sequelize.query(sql2);
    // const ret3 = await sequelize.query(sql3);
    // const arr =[ret1[0], ret2[0], ret3[0]];
    // return arr;
    let insert = obj;
    insert.status = 1;
    if (obj) {
        if (!(/^([\u2E80-\u9FFF]+){6}$/.test(obj.comp_name))) {
            insert.message = '公司名称最少为6个中文字'
        } else if (!(/^1[34578]\d{9}$/.test(obj.link_phone))) {
            insert.message = '联络方式有误'
        } else if (obj.address.length < 4) {
            insert.message = '联络地址最少为4个字'
        } else if (!obj.page_name) {
            insert.message = '联系我们 页面名称不能为空'
        } else if (!(/^(http|ftp|https)\:[^\u2E80-\u9FFF]{1,}$/.test(obj.page_link))) {
            insert.message = '联系我们 跳转链接格式错误'
        } else if (!obj.friend_page) {
            insert.message = '友情链接 页面名称不能为空'
        } else if (!(/^(http|ftp|https)\:[^\u2E80-\u9FFF]{1,}$/.test(obj.friend_link))) {
            insert.message = '友情链接 跳转链接格式错误'
        } else {
            insert = await Company.create({
                status: 0,
                message: '存储成功',
                comp_name: obj.comp_name,
                intro: obj.intro,
                link_phone: obj.link_phone,
                address: obj.address,
                page_name: obj.page_name,
                page_link: obj.page_link,
                friend_page: obj.friend_page,
                friend_link: obj.friend_link,
                pic_rul: 'https/www/baidu.jpg',
            })
        }
    }
    return insert
}
module.exports = {
    addDep,
    findDep,
    delDep,
    updateDep,
    findIdentity,
    insertEmployee,
    getEmployee,
    readDep,
    editEmp,
    delEmp,
    changeStatus,
    empInfo,
    saveCententTitle
}
