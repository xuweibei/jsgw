module.exports = {
    'home': async (ctx, next) => {
        await ctx.render('home')
        // ctx.body = 'koa2 string'
     },
    'login': async ctx => {
        await ctx.render('login')
    }
}