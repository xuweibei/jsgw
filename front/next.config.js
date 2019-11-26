const withLess = require('@zeit/next-less')
module.exports = withLess({
    lessLoaderOptions: {
        javascriptEnabled: true //开启内联JavaScript
    }
})