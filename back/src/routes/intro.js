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
            const whritePath = path.join(__dirname, '../', '../', 'public', 'images','/') + `${Date.now()}-${readName}`;
            const readStream = fs.createReadStream(readPath);
            const writeStream = fs.createWriteStream(whritePath);
            readStream.pipe(writeStream);
            arr.push(readStream.pipe(writeStream).path)
        })
        ctx.body = new SuccessModel(arr, "存储成功")
    }
}
