const {findDep, findIdentity, readDep} = require('../controller/depControllor')

module.exports = {
    'home': async ctx => {
        await ctx.render('login')
    },
    'storeDelivery': async (ctx, next) => {
        await ctx.render('storeDelivery')
     },
     'departmentStructur': async (ctx, next) => {
         const depObj = await findDep()
         const identity = await findIdentity()
         const dep = await readDep()
         await ctx.render('departmentStructur', {depObj, identity, dep})
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