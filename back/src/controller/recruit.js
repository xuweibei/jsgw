

const {
    Invite
} = require('../model/createTables')

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// 获取招聘信息
const getRecruitInfo = async (data) => {
    let ret = '';
    console.log(data,'从VB模块了')
    if(data.post_name || data.job_class || data.detail_address || data.start_time || data.end_time){
        console.log(data,'这里');
        const obj = {};
        for(let i in data){//模糊查询
            obj[i] = { [Op.like]: '%' + data[i] + '%'}
        }
        ret = await Invite.findAndCountAll({
            where:obj
        });
    } else {
        console.log('那里')
        ret = await Invite.findAndCountAll()
    }
    console.log(ret,'东方国际考虑')
    return ret
}

const addRecruitMen = async (data) => {
    console.log(data,'而维特我')
    const res = await Invite.findOrCreate({
        where: {
            post_name: data.post_name,
            city_id:data.city_id,
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
    console.log(res,'扣篮大赛');
    return res;
}

module.exports = {
    getRecruitInfo,
    addRecruitMen
}