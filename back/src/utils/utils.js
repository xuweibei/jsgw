const fs = require('fs');
const path = require('path')
const koaMinify = require('@chuchur/koa-minify');

const less = path.join(__dirname, '../', '/assets', '/less', '/')
const css = path.join(__dirname, '../', '/assets', 'css', '/')
const assets = path.join(__dirname, '../', 'assets')
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
module.exports = {
    createCss
}