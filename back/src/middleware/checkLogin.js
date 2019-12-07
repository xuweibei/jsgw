// 校验是否登录
module.exports = async (ctx, next) => {
    if (ctx.session.account) {
        await next()
        return;
    }
    ctx.response.redirect('/')
}