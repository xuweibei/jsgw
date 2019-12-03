module.exports = {
    "home": async ctx => {
        await ctx.render('login')
    },
    'storeDelivery': async (ctx, next) => {
        await ctx.render('storeDelivery')
     },
     'departmentStructur': async (ctx, next) => {
         await ctx.render('departmentStructur')
     },
}