// 
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
    console.log(add, "asljkdhaksdhjkahsd")
    if (add && add.dataValues) {
        if (add.dataValues.dep_status === '0') {
            const update = await Department.update({
                dep_status: '1'
            }, {
                where: {
                    department: dep
                }
            })
            console.log(update, "接口好圣诞节卡实打实")
            return update[0]
        }
        return false
    } else {
        const ret = await Department.findOrCreate({
            where: {
                department: dep
            }
        })
        console.log(ret, "驾驶舱电信卡接收到哈迪斯")
        return ret && ret[1]
    }

}
// 查找分组信息
const findDep = async () => {
    // const sql1 = 'SELECT d.department, d.id, num.dep_id as dep_id, IFNULL(num.count,0) as sum from gw_department d LEFT JOIN (select e.dep_id as dep_id, count(e.dep_id) as count from gw_employee as e LEFT JOIN gw_department as d on e.dep_id=d.id where d.dep_status=1 group by e.dep_id,d.department) as num on d.id=num.dep_id'
    const sql1 = 'select d.department, e.dep_id, d.id,count(dep_id) as num from gw_department as d LEFT JOIN gw_employee as e on e.dep_id=d.id where d.dep_status=1 group by dep_id,d.id, department'
    const ret = await sequelize.query(sql1)
    const sql = 'select COUNT(1) as num from gw_employee'
    const count = await sequelize.query(sql)
    // console.log(ret[0])
    const obj = {
        dep: ret[0],
        allDep: count[0]
    }
    return obj || {}
}
const readDep = async () => {
    const ret = await Department.findAll({attributes:{exclude: ['CreatedAt', 'UpdatedAt', 'deletedAt']}})
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
        return update && update[0]
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
    const sql = "select e.id, e.name, e.phone, d.department, i.identity,e.active from gw_employee e left join gw_department d on (e.dep_id=d.id)LEFT JOIN gw_identity i on (i.id=e.ident_id)"
    const ret = await sequelize.query(sql)
    console.log(ret, " 考虑是大法官")
    return ret[0]
}
// 编辑员工
const editEmp = async (parms) => {
    const findEmp = await Employee.findOne({where: {id: parms.id}})
    const department = await Department.findOne({attributes: ['id']}, {where:{department: parms.department}})
    const identity = await Identity.findOne({attributes: ['id']}, {where: {identity: parms.author}})
    if (findEmp) {
        const updateEmp = await Employee.update({
            name: parms.name,
            phone: parms.phone,
            ident_id: identity.dataValues.id,
            dep_id: department.dataValues.id
        }, {where: {id: parms.id}})
        return updateEmp && updateEmp[0]
    }
}
// 删除员工
const delEmp = async (id) => {
    const emp = await Employee.findOne({where: {id}})
    if (emp) {
        const del = await Employee.update({status: "0"}, {where: {id}})
        return del && del[0]
    }
} 
const changeStatus = async (id) => {
    const emp = await Employee.findOne({where: {id}})
    const empData = emp.dataValues;
    console.log(empData)
    if (emp) {
        if (empData.active === "0") {
            const change = await Employee.update({active: '1'}, {where: {id}})
            return change && change[0]
        }
            const change = await Employee.update({active: '1'}, {where: {id}})
            return change && change[0]
    }
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
    changeStatus
}
