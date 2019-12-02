module.exports = {
<<<<<<< HEAD
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
=======
    "home": async ctx => {
        await ctx.render('login')
>>>>>>> a111b88a19f89c87742e2cbf6181d537a403f6cb
    }
}