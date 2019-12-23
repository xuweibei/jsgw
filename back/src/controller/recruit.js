

const {
    Invite,
    PcatBak
} = require('../model/createTables')

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// 获取招聘信息
const getRecruitInfo = async (data) => {
    let ret = '';
    if(data.post_name || data.job_class || data.detail_address || data.start_time || data.end_time){
        // console.log(data,'这里');
        const obj = {};
        for(let i in data){//模糊查询
            obj[i] = { [Op.like]: '%' + data[i] + '%'}
        }
        ret = await Invite.findAndCountAll({
            where:obj
        });
    } else {
        ret = await Invite.findAndCountAll()
    }
    return ret
}

//添加招聘信息或者编辑招聘信息
const addRecruitMen = async (data) => {
    const res = await Invite.findOrCreate({
        where: {
            post_name: data.post_name,
            job_class:data.job_class,
            province_id:data.province_id,
            city_id:data.city_id,
            county_id:data.county_id,
            address_name:data.address_name,
            detail_address:data.detail_address,
            low_salary: 1,
            top_salary: 2 ,
            work_content :data.work_content,
            post_job:data.post_job,
            require_num:10,
            start_time: 1,
            end_time:2,
            phone:data.phone,
            email:data.email
        }
    })
    return res;
}

//获取省市县地址
const getPcatBak = async (data) => {
    const res = await PcatBak.findAndCountAll({
        where:data
    })
    return res;
}

//删除招聘信息
const deleteRecruic = async(data)=>{
    const res = await Invite.destroy({
        where:{
            id : data.id
        }
    })
    return res;
}

//启用或停用
const enableRecreit = async(data)=>{
    const res = await Invite.update({
        enable:data.enable === '0' ? 1 : 0
    },{where:{id:data.id}})
    return res;
}
module.exports = {
    getRecruitInfo,
    addRecruitMen,
    getPcatBak,
    deleteRecruic,
    enableRecreit
}