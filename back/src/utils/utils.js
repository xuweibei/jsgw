const fs = require('fs');
const path = require('path');
const koaMinify = require('@chuchur/koa-minify');

const less = path.join(__dirname, '../', '/assets', '/less', '/')
const css = path.join(__dirname, '../', '/assets', 'css', '/')
const assets = path.join(__dirname, '../', 'assets', 'less')
function createCss() {
        const res = fs.readdirSync(less)
        res.forEach(item => {
        const cssName = item.split('.')[0] + '.css'
        koaMinify(assets,
            {
                entry: less + item,
                output: css + cssName
            }
        )   
    })
    // glob(less + '*.less', (err, file) => {
    //     file.forEach(item => {
    //         const sp = item.split('/')
    //         const spitem = sp[sp.length-1]
    //         const cssName = spitem.split('.')[0] + '.css'
    //         // koaMinify(assets,
    //         //         {
    //         //             entry: less + spitem,
    //         //             output: css + cssName
    //         //         }
    //         //     )   
    //     })
    // })
}

// 同步数据库
// function syncModel() {
// const modelPath = path.join(__dirname, '../','model')
// const files = fs.readdirSync(modelPath);
// const modelFiles = files.filter((f)=>{
//     return f.endsWith('.js');
// }, files);
// // console.log(modelFiles);
// // // module.exports = {};
// // for (let file of modelFiles) {
// //     const name = file.substring(0, file.length - 3);
// //     // console.log(name, '了就撒克雷登斯')
// //     // module.exports[name] = require(__dirname + '/model/' + f);
// // }
// sequelize.sync();
// }
module.exports = {
    createCss
}