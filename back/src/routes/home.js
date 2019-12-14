module.exports = {
    'home': async ctx => {
        await ctx.render('login')
    },
    'storeDelivery': async (ctx, next) => {
        await ctx.render('storeDelivery')
     },
    'helpContent': async ctx => {
        await ctx.render('helpContent')
    },
     'departmentStructur': async (ctx, next) => {
         await ctx.render('departmentStructur')
     },
     'jobClass': async (ctx, next) => {
        await ctx.render('jobClass')
    },
    'indexManage': async (ctx, next) => {
        await ctx.render('indexManage')
    },
    'companyTalk': async (ctx, next) => {
        await ctx.render('companyTalk')
    },
    'productsCenter': async (ctx, next) => {
        await ctx.render('productsCenter')
    }
}
