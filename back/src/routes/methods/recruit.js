//招聘信息接口
const {getRecruitInfo,addRecruitMen} = require('../../controller/recruit')
const {SuccessModel, ErrorModel} = require('../../config/model')
module.exports = {
    "get_recruit": async ctx => {
        console.log(ctx.request.body,'第三方的快乐十分个')
        const ret = await getRecruitInfo(ctx.request.body);
        console.log(ret,'的快乐十分个')
        if (ret) {
            ctx.body = new SuccessModel(ret,'获取成功')
            return
        }
        ctx.body = new ErrorModel('获取失败')
    },
    "add_recruiter":async ctx =>{
        const res =  await addRecruitMen(ctx.request.body);
        console.log(res,'考虑到法国');
        if(res){
            ctx.body = new SuccessModel('添加成功')
            return
        }
        ctx.body = new ErrorModel('添加失败')
    }
    
}