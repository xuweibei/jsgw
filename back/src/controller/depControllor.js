const {
    Department
} = require('../model/createTables')

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
const findDep = async () => {
    const ret = await Department.findAll()
    const arr = []
    ret.forEach(item => {
        arr.push(item.dataValues)
    })
    return arr || []
}
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
module.exports = {
    addDep,
    findDep,
    delDep,
    updateDep
}
