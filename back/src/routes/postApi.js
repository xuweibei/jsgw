// 职业分类接口
const {getClassify} =  require('../controller/postController');
const {SuccessModel, ErrorModel} = require('../config/model')
module.exports = {
    'postClassify' : async ctx =>{
        await ctx.render('postClassify')
    },
    'get_classify' : async ctx =>{

        const classify = await getClassify();
        if (classify) {
            ctx.body = new SuccessModel(classify, "获取列表成功")
            return;
        }
        ctx.body = new ErrorModel('获取列表失败')
    }
}
