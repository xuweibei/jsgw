const path = require('path');
const fs = require('fs');
const {SuccessModel} = require('../config/model')
module.exports = {
    "intro": async (ctx, next) => {
        await ctx.render('intro')
    },
    "richText": async (ctx, next) => {
        await ctx.render('richText')
    },
    "get_rich": async (ctx, next) => {
        // 获取上传文件key
        const keys = Object.keys(ctx.request.files);
        let arr = [] ;
        keys.forEach(item => {
            // 获取上传路径
            const readPath = ctx.request.files[item].path;
            //获取上传文件名称
            const readName = ctx.request.files[item].name;
            // 生成写入路径
            const whritePath = path.join(__dirname,'../', 'assets', 'images','/') + `${Date.now()}-${readName}`;
            const readStream = fs.createReadStream(readPath);
            const writeStream = fs.createWriteStream(whritePath);
            readStream.pipe(writeStream);
            // console.log(readStream.pipe(writeStream).path.split('\\'));
            const red = readStream.pipe(writeStream).path.split('\\');
            const redPath = 'http://localhost:8000/'+ 'assets/' + 'images/' + red[red.length - 1];
            arr.push(redPath)
        })
        ctx.body = new SuccessModel(arr, "存储成功")
    }
}
