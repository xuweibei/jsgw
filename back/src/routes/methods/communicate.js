//招聘信息接口
const {getCommunicateInfo,editCommuList,delCommuList,showOrCommuList} = require('../../controller/communicate')
const {SuccessModel, ErrorModel} = require('../../config/model')
module.exports = {
    "communicate_list": async ctx => {
        const ret = await getCommunicateInfo(ctx.request.body);
        if (ret) {
            ctx.body = new SuccessModel(ret,'获取成功')
            return
        }
        ctx.body = new ErrorModel('获取失败')
    },
    "edit_communicate_list": async ctx => {
        const res = await editCommuList(ctx.request.body);
        if(res){
            ctx.body = new SuccessModel(res, '操作成功')
            return;
        }
        ctx.body = new ErrorModel('操作成功')
    },
    "del_communicate_list": async ctx => {
        const res = await delCommuList(ctx.request.body);
        if(res){
            ctx.body = new SuccessModel(res, '删除成功')
            return;
        }
        ctx.body = new ErrorModel('删除失败')
    },
    "enable_commu": async ctx => {
        const res = await showOrCommuList(ctx.request.body);
        if(res){
            ctx.body = new SuccessModel(res, '操作成功')
            return;
        }
        ctx.body = new ErrorModel('操作失败')
    }
    
    // "add_recruiter":async ctx =>{
    //     const res =  await addRecruitMen(ctx.request.body);
    //     if(res){
    //         ctx.body = new SuccessModel('添加成功')
    //         return
    //     }
    //     ctx.body = new ErrorModel('添加失败')
    // },
    // "pcat_bak":async ctx =>{
    //     const res =  await getPcatBak(ctx.request.body);
    //     if(res){
    //         ctx.body = new SuccessModel(res,'获取成功')
    //         return
    //     }
    //     ctx.body = new ErrorModel('获取失败')
    // },
    // "detelte_recreit":async ctx =>{
    //     const res =  await deleteRecruic(ctx.request.body);
    //     if(res){
    //         ctx.body = new SuccessModel(res,'删除成功')
    //         return
    //     }
    //     ctx.body = new ErrorModel('删除失败')
    // },
    // "enable_recreit":async ctx =>{
    //     console.log(ctx.request.body,'考虑程序')
    //     const res =  await enableRecreit(ctx.request.body);  
    //     // console.log(res,'2考虑到法国');
    //     if(res){
    //         ctx.body = new SuccessModel(res,'操作成功')
    //         return
    //     }
    //     ctx.body = new ErrorModel('操作失败')
    // }
}