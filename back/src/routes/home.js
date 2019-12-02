const path = require('path')
const fs = require('fs')
const {login, uploadImg} = require('../controller/login')
const {SuccessModel, ErrorModel} = require('../config/model')
const jwt = require('jsonwebtoken')
module.exports = {
    'home': async (ctx, next) => {
        await ctx.render('index')
     },
     'storeDelivery': async (ctx, next) => {
        await ctx.render('storeDelivery')
     },
     'departmentStructur': async (ctx, next) => {
         await ctx.render('departmentStructur')
     },
    'login': async ctx => {
        const {username, password} = ctx.request.body
        const result = await login(username, password)
        if (result.username) {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: result.username
              }, 'asd12312');
            ctx.body = new SuccessModel({token}, '登录成功');
            return;
        }
        ctx.body = new ErrorModel('登录失败');
    },
    'upload': ctx => {
        const file = ctx.request.files[Object.keys(ctx.request.files)]
        const readStream = fs.createReadStream(file.path)
        const upPath = path.join(__dirname, '../', '../', 'public', 'img', `${file.name}`)
        // uploadImg(file.path)
        // 创建写入流
        const writeStream = fs.createWriteStream(upPath, {encoding: 'utf8'})
        // 写入文件
        readStream.pipe(writeStream)
        ctx.body = {
            errno: 0
        }
    }
}