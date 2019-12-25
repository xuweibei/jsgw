const {getCarousel, setCarouselLink, setCarouselTimer} = require('../controller/indexManage')
const {SuccessModel, ErrorModel} = require('../config/model')

module.exports = {
    'turnManage': async (ctx, next) =>{
        const carouselList = await getCarousel()
        await ctx.render('turnManage', {carouselList})
    },
    //获取轮播图列表
    'carousel_manage': async (ctx, next) => {
        const res = await getCarousel();
        if (res) {
            ctx.body = new SuccessModel(res, "获取列表成功")
            return;
        }
        ctx.body = new ErrorModel('获取列表失败')
    },
    //设置轮播图跳转链接
    'set_carousel_link': async (ctx, next) => {
        const res = await setCarouselLink(ctx.request.body.link, ctx.request.body.id)
        if (res) {
            ctx.body = new SuccessModel(res, "设置成功")
            return;
        }
        ctx.body = new ErrorModel('设置失败')
    },
    //设置轮播时间
    'set_carousel_timer': async (ctx, next) => {
        const res = await setCarouselTimer(ctx.request.body.carouselTimer)
        if (res) {
            ctx.body = new SuccessModel(res, "设置成功")
            return;
        }
        ctx.body = new ErrorModel('设置失败')
    }
}