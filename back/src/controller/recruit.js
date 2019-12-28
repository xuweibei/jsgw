

const {
    Invite,
    PcatBak
} = require('../model/createTables')

const Sequelize = require('sequelize');
const {sequelize} = require('../db/db');
// 获取招聘信息
const getRecruitInfo = async ({post_name = '',job_class='',detail_address='',start_time='',end_time=''}) => {
    let ret = {};
    if(post_name || job_class || detail_address || start_time ||  end_time){
        // console.log(data,'这里');
        // const obj = {};
        // for(let i in data){//模糊查询
        //     obj[i] = { [Op.like]: '%' + data[i] + '%'}
        // }
        // ret = await Invite.findAndCountAll({
        //     where:obj
        // });
        let date = null;
        let date2 = null;
        if(start_time){
            date = new Date(start_time).getTime();
            date2 = new Date(end_time).getTime();
        }
        let where = '';
        // console.log(data.post_name,'收到了付款',typeof data.job_class,data.detail_address)
        if(post_name!=''){
            where=`c.post_name like '%${post_name}%'`;
        }
        if(job_class != ''){
            if(!where){
                where =`c.job_class='${job_class}'`;
            }else{
                where +=` and c.job_class='${job_class}'`;
            }
        }
        if(detail_address != ''){
            if(!where){
                where =` c.detail_address '${detail_address}'`;
            }else{
                where +=` and c.detail_address '${detail_address}'`;
            }
        }
        if(start_time != ''){
            if(!where){
                where =` c.start_time<='${start_time}'`;
            }else{
                where +=` and c.start_time<='${start_time}'`;
            }
        }
        if(end_time != ''){
            if(!where){
                where =` c.end_time>= '${end_time}'`;
            }else{
                where +=` and c.end_time>= '${end_time}'`;
            }
        }
        const sql = `select * from gw_invite_info c where ${where}`;
        
        //const sql = `select * from gw_invite_info c where start_time < ${date} and end_time > ${date2} or (c.post_name like '%${post_name}%' and c.job_class='${job_class}') or c.detail_address='${detail_address}'`;
        const res = await sequelize.query(sql, {
            replacements: ['active'],
            type: sequelize.QueryTypes.SELECT
        })
        if(res && res.length > 0){
            ret.count = res.length;
            ret.rows = res
        }
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
            email:data.email,
            enable:1
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