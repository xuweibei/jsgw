const {getProducts, delProduct, showItem, newProduct } = require('../controller/product');
const {SuccessModel, ErrorModel} = require('../config/model')
const multer = require('koa-multer')

module.exports = {
    'productsCenter': async (ctx, next) => {
        await ctx.render('productsCenter')
    },
    //获取产品信息
    'get_products': async ctx => {
        const res = await getProducts();
        if (res) {
            ctx.body = new SuccessModel(res, "获取列表成功")
            return;
        }
        ctx.body = new ErrorModel('获取列表失败')
    },
    //删除产品
    'del_product': async ctx => {
        const res = await delProduct(ctx.request.body.id);
        if(res) {
            ctx.body = new SuccessModel(res, '删除成功')
            return;
        }
        ctx.body = new ErrorModel('删除失败')
    },
    //设置是否展示
    'show_item': async ctx => {
        const res = await showItem(ctx.request.body.id, ctx.request.body.status);
        if(res) {
            ctx.body = new SuccessModel('设置成功')
            return;
        }
        ctx.body = new ErrorModel('设置失败')
    },
    //新建产品
    'new_product': async ctx => {
        // const storage = multer.diskStorage({
        //     //文件保存路径
        //     destination: function (ctx.request, ctx.request.body.data.logo, cb) {
        //       cb(null, 'public/img/')
        //     },
        //     //修改文件名称
        //     // filename: function (req, file, cb) {
        //     //   var fileFormat = (file.originalname).split(".");
        //     //   cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
        //     // }
        //   })
        // const upload = multer({ storage: storage });
        const res = await newProduct(ctx.request.body.data);
        if(res) {
            ctx.body = new SuccessModel(res, '增加成功')
            return;
        }
        ctx.body = new ErrorModel('增加失败')
    }
}