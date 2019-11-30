const {SuccessModel} = require('../config/model');
const {test} = require('../controller/test')

module.exports = {
    'root': async (ctx, next) => {
        ctx.body = 'home'
    },
    'test': async (ctx, next) => {
        const data = await test();
        ctx.body = new SuccessModel(data);
      },
    'test1': async (ctx, next) => {
        ctx.body = 'test1'
    },
    'test2': async (ctx, next) => {
        ctx.body = 'test2'
    },
    'test3': async (ctx, next) => {
        ctx.body = 'test3'
    },
    'index': async (ctx, next) => {
        // ctx.render('index')
    },
    'delivery/store-delivery': async () => {//网店发货
        ctx.body = 'delivery/store-delivery'
    },
}