const {sequelize} = require('../db/db');
const {
    Department,
    Identity,
    Employee
} = require('../model/createTables')

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
    const ret = await Department.findAll({ attributes: { exclude: ['CreatedAt', 'UpdatedAt', 'deletedAt'] } })
    const arr = []
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
        where: {department: name}
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
    const findDepID = await Department.findOne({
        where: {department: obj.department}
    })
    const dep_id = findDepID.id
    const findIndetId = await Identity.findOne({
        where: {Identity: obj.author}
    })
    const ident_id = findIndetId.id
    const ret = await Employee.findOne({
        where: {
            name: obj.name
        }
    })
    if (ret) {
        const update = await Employee.update({
            name: obj.name,
            phone: obj.phone,
            ident_id,
            dep_id
        },{
            where: {name: obj.name}
        })
        return ret && ret[0]
    } else {
        const insert = await Employee.create({
            name: obj.name,
            phone: obj.phone,
            ident_id,
            dep_id
        })
        return insert && insert.dataValues
    }
}

// 获取员工
const getEmployee = async () => {
    // const ret = await Employee.findAll({attributes:{exclude: ['CreatedAt', 'UpdatedAt', 'deletedAt']}})
    // let employee = []
    // ret.forEach(item => {
    //     employee.push(item.dataValues)
    // })
    // return employee
    const sql = "select e.name, e.phone, d.department, i.identity,e.status from gw_employee e left join gw_department d on (e.dep_id=d.id)LEFT JOIN gw_identity i on (i.id=e.ident_id)"
    const ret = await sequelize.query(sql)
    return ret[0]
}
module.exports = {
    addDep,
    findDep,
    delDep,
    updateDep,
    findIdentity,
    insertEmployee,
    getEmployee
}
