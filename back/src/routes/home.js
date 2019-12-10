const {findDep} = require('../controller/depControllor')

module.exports = {
    'home': async ctx => {
        await ctx.render('login')
    },
    'storeDelivery': async (ctx, next) => {
        await ctx.render('storeDelivery')
     },
     'departmentStructur': async (ctx, next) => {
         const ret = await findDep()
         console.log(ret, '新的')
         const dep = []
         ret.forEach(item => {
             if (item.dep_status === '1') {
                 dep.push(item)
             }
         })
         await ctx.render('departmentStructur', {dep})
     },
     "intro": async (ctx, next) => {
        await ctx.render('intro')
    },
    "edit": async (ctx, next) => {
        await ctx.render('richText')
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
    },
    'infoCenter': async (ctx, next) => {
        await ctx.render('infoCenter')
    },
    'turnManage': async (ctx, next) =>{
        await ctx.render('turnManage')
    }
}